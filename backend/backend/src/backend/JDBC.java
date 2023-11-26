package backend;

import java.sql.*;
//import com.google.gson.JsonArray;
//import com.google.gson.JsonObject;
//import com.google.gson.Gson;
//import com.google.gson.GsonBuilder;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

public class JDBC {
	
	public static Connection getConnection() throws SQLException {
	    try {
	        Class.forName("com.mysql.cj.jdbc.Driver");
	        String url = "jdbc:mysql://localhost/201Group?user=root&password=Divergent1";
	        return DriverManager.getConnection(url);
	    } catch (ClassNotFoundException e) {
	        throw new SQLException("Database driver not found", e);
	    }
	}
	
	public int insertNewUser(String username, String password) throws ClassNotFoundException {
	    try (Connection connection = getConnection();
	         PreparedStatement checkUsernameStatement = connection.prepareStatement("SELECT * FROM Users WHERE username = ?");
	         PreparedStatement insertUserStatement = connection.prepareStatement("INSERT INTO Users (username, password) VALUES (?, ?)", Statement.RETURN_GENERATED_KEYS)) {
	        checkUsernameStatement.setString(1, username);

	        ResultSet usernameResultSet = checkUsernameStatement.executeQuery();
	        if (usernameResultSet.next()) {
	            //username already exists
	            return -1; 
	        }

	        insertUserStatement.setString(1, username);
	        insertUserStatement.setString(2, password);

	        int affectedRows = insertUserStatement.executeUpdate();

	        if (affectedRows == 0) {
	            //failed insertion 
	            return -3;
	        }

	        try (ResultSet generatedKeys = insertUserStatement.getGeneratedKeys()) {
	            if (generatedKeys.next()) {
	                int userId = generatedKeys.getInt(1);
	                System.out.println("User " + username + " registered successfully with ID: " + userId);
	                return userId;
	            } else {
	                //failed to get the user ID
	                return -4;
	            }
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        return -5;
	    }
	}
	
	
	//testing for registering new user
	public static void main(String[] args) {
        JDBC jdbcConnector = new JDBC();

        // Example usage:
        try {
            jdbcConnector.insertNewUser("Example", "Example");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

	
	public boolean returningUser(String username, String password) throws ClassNotFoundException{
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            connection = getConnection();

            //search for the user in the Users table
            String query = "SELECT * FROM Users WHERE username = ? AND password = ?";
            preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, username);
            preparedStatement.setString(2, password);
            resultSet = preparedStatement.executeQuery();

            //if a matching user was found
            if (resultSet.next()) {
                System.out.println("Welcome back, " + username + "!");
                return true;
            } else {
                System.out.println("User with the provided username and password does not exist.");
                return false;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        } finally {
            try {
                if (resultSet != null) {
                    resultSet.close();
                }
                if (preparedStatement != null) {
                    preparedStatement.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
               
    }
   
	/**
	 //main function to test returning users
    public static void main(String[] args) {
    	JDBC jdbcConnector = new JDBC();

        // Example usage for returning user
        try {
            jdbcConnector.returningUser("201Group", "Group");
            
            //now for when user does not exist
            //jdbcConnector.returningUser("nonexistent_user", "invalid_password");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
  	**/
	
	//reviews JDBC: username, password, title, body, rating
	public int insertReview(String username, String password, String title, String body, double rating) {
	    try (Connection connection = getConnection();
	         PreparedStatement checkUserStatement = connection.prepareStatement("SELECT * FROM Users WHERE username = ? AND password = ?");
	         PreparedStatement insertReviewStatement = connection.prepareStatement("INSERT INTO Reviews (username, password, title, body, rating) VALUES (?, ?, ?, ?, ?)")) {

	        checkUserStatement.setString(1, username);
	        checkUserStatement.setString(2, password);

	        ResultSet userResultSet = checkUserStatement.executeQuery();
	        if (!userResultSet.next()) {
	            //user not found/failed authentication
	            return -1; 
	        }

	        insertReviewStatement.setString(1, username);
	        insertReviewStatement.setString(2, password);
	        insertReviewStatement.setString(3, title);
	        insertReviewStatement.setString(4, body);
	        insertReviewStatement.setDouble(5, rating);

	        int affectedRows = insertReviewStatement.executeUpdate();

	        if (affectedRows == 0) {
	            //failed insertion
	            return -2;
	        }
	        //success
	        return 1;
	    } catch (SQLException e) {
	        e.printStackTrace();
	        return -3;
	    }
	}

	/**
	//testing to insert a new review
	public static void main(String[] args) {
	    JDBC jdbcConnector = new JDBC();

	    String username = "201Group";
	    String password = "Group"; //
	    String title = "Great!";
	    String body = "Highly recommended this dining hall!";
	    double rating = 5.0; 

	    int result = jdbcConnector.insertReview(username, password, title, body, rating);

	    if (result > 0) {
	        System.out.println("Review inserted successfully");
	    } else {
	        System.out.println("Failed to insert review");
	    }
	}
	**/
	
	//modify a review 
	public int updateReview(int reviewID, String title, String body, Double rating) {
	    try (Connection connection = getConnection()) {
	        StringBuilder queryBuilder = new StringBuilder("UPDATE Reviews SET ");
	        List<Object> params = new ArrayList<>();

	        if (title != null) {
	            queryBuilder.append("title = ?, ");
	            params.add(title);
	        }
	        if (body != null) {
	            queryBuilder.append("body = ?, ");
	            params.add(body);
	        }
	        if (rating != null) {
	            queryBuilder.append("rating = ?, ");
	            params.add(rating);
	        }

	        //Remove the trailing comma and space - ChatGPT 
	        queryBuilder.delete(queryBuilder.length() - 2, queryBuilder.length());
	        queryBuilder.append(" WHERE idReviews = ?");
	        params.add(reviewID);

	        String query = queryBuilder.toString();

	        try (PreparedStatement updateReviewStatement = connection.prepareStatement(query)) {
	            for (int i = 0; i < params.size(); i++) {
	                updateReviewStatement.setObject(i + 1, params.get(i));
	            }

	            int affectedRows = updateReviewStatement.executeUpdate();

	            if (affectedRows > 0) {
	                System.out.println("Review updated successfully");
	                return 1;
	            } else {
	                System.out.println("No review found with the provided ID");
	                return -1; 
	            }
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	        return -2; //error
	    }
	}

	/**
	public static void main(String[] args) {
	    JDBC jdbcConnector = new JDBC();

	    //have the review ID and updated review information
	    int reviewIDToUpdate = 1; // Replace with the actual review ID to be updated
	    String updatedTitle = "Hello";
	    String updatedBody = null; //body unchanged
	    Double updatedRating = 5.0; // Updated rating
     
	    int result = jdbcConnector.updateReview(reviewIDToUpdate, updatedTitle, updatedBody, updatedRating);

	    if (result > 0) {
	        System.out.println("Review updated successfully");
	    } else if (result == -1) {
	        System.out.println("No review found with the provided ID");
	    } else {
	        System.out.println("Failed to update review");
	    }
	}
	**/

	
	
	
}
