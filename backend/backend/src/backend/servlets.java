package backend;

import java.io.IOException;

import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import java.sql.Connection; 
import java.sql.DriverManager; 
import java.sql.PreparedStatement; 
import java.sql.ResultSet; 
import java.sql.SQLException; 
import java.sql.Statement;
import org.json.JSONObject;

@WebServlet("/LoginServlet")
class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		response.setContentType("application/html");
		
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		
		String jsonFile = "";
		
		// Section for code to check mySQL database
		
		Connection conn = null;         
		PreparedStatement statement = null;         
		ResultSet resultSet = null; 
		boolean Verified = false;
		try {             
			conn = DriverManager.getConnection("[SQL SERVER URL]");             
			String sql = "SELECT Password FROM User WHERE Username = ?";             
			statement = conn.prepareStatement(sql);
			statement.setString(1, username);
			resultSet = statement.executeQuery();             
			         
			if (resultSet.next()) {                 
				String resPassword = resultSet.getString("Password");
				if(resPassword.equals(password)) {
					Verified = true;
					//Users newUser = new Users(username, password, String.valueOf(serialVersionUID));
					JSONObject jsonResponse = new JSONObject();
	                jsonResponse.put("status", "success");
	                jsonResponse.put("username", username);
	                out.print(jsonResponse.toString());
				} else {
					//Incorrect Password Error
					JSONObject jsonResponse = new JSONObject();
	                jsonResponse.put("status", "error");
	                jsonResponse.put("message", "Incorrect Password.");
	                out.print(jsonResponse.toString());
				}
            
			} else {
				// User Not Found Error
				JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "User Not Found.");
                out.print(jsonResponse.toString());
			}
		} catch (SQLException sqle) {             
			JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("status", "error");
            jsonResponse.put("message", "SQLException: " + sqle.getMessage());
            out.print(jsonResponse.toString());         
		} finally {             
			try {                 
				if (resultSet != null) {                     
					resultSet.close();                 
				}                 
				if (statement != null) {                     
					statement.close();                 
				}                 
				if (conn != null) {                     
					conn.close();                 
				}             
			} catch (SQLException sqle) {                 
				System.out.println("sqle: " + sqle.getMessage());             
			}         
		}
		
		// Section for code to send over all restaurant info if user/passwd are valid
		
		out.print(jsonFile);
		
		out.close();
	}
}


@WebServlet("/SignUpServlet")
class SignUpServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		response.setContentType("application/html");
		
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		
		String jsonFile = "";
		
		// Section for code to check mySQL database
		
		Connection conn = null;         
		PreparedStatement statement = null;         
		boolean Verified = false;
		try {             
			conn = DriverManager.getConnection("[SQL SERVER URL]");  
			
			String sql = "INSERT INTO User (Username, Password) VALUES (?, ?)";             
			statement = conn.prepareStatement(sql);
			statement.setString(1, username);
		    statement.setString(2, password);
		    
			int rowsAffected = statement.executeQuery();             
			         
			if (rowsAffected > 0) {                 
				// Success Response
				JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("status", "success");
                jsonResponse.put("username", username);
                jsonResponse.put("password", password);
                out.print(jsonResponse.toString());
			} else {
				// Error Signing Up New User
				JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "Error in user registration.");
                out.print(jsonResponse.toString());
			}
		} catch (SQLException sqle) {             
			JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("status", "error");
            jsonResponse.put("message", "SQLException: " + sqle.getMessage());
            out.print(jsonResponse.toString());		
        } finally {   
			try {                 
				if (resultSet != null) {                     
					resultSet.close();                 
				}                 
				if (statement != null) {                     
					statement.close();                 
				}                 
				if (conn != null) {                     
					conn.close();                 
				}             
			} catch (SQLException sqle) {                 
				System.out.println("sqle: " + sqle.getMessage());             
			}         
		}
		
		// Section for code to send over all restaurant info if user/passwd are valid
		
		out.print(jsonFile);
		
		out.close();
	}
}

@WebServlet("/ForgotPassword")
class ForgotPassword extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		response.setContentType("application/html");
		
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		
		String jsonFile = "";
		
		// Section for code to check if username is valid
		
		//Section to update the login info on the mySQL database
		Connection conn = null;         
		PreparedStatement statement = null;         
		ResultSet resultSet = null; 
		boolean Verified = false;
		try {             
			conn = DriverManager.getConnection("[SQL SERVER URL]");             
			String sql = "SELECT COUNT(*) FROM Users WHERE username = ?";
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, username);
			resultSet = statement.executeQuery();             
			         
			if (resultSet.next() && resultSet.getInt(1) > 0) {
			    sql = "UPDATE Users SET password = ? WHERE username = ?";
			    PreparedStatement updateStatement = conn.prepareStatement(sql);
			    updateStatement.setString(1, password);
			    updateStatement.setString(2, username);

			    int rowsAffected = updatePasswordStatement.executeUpdate();
			    if (rowsAffected > 0) {
			        // Success Outcome
			    } else {
			        // Update Failed Error
			    }
			} else {
			    // User Not Found Error
			}
		} catch (SQLException sqle) {             
			System.out.println("SQLException: " + sqle.getMessage());         
		} finally {             
			try {                 
				if (resultSet != null) {                     
					resultSet.close();                 
				}                 
				if (statement != null) {                     
					statement.close();                 
				}                 
				if (conn != null) {                     
					conn.close();                 
				}             
			} catch (SQLException sqle) {                 
				System.out.println("sqle: " + sqle.getMessage());             
			}         
		}
		
		out.print(jsonFile);
		
		out.close();
	}
}

@WebServlet("/RefreshServlet")
class RefreshServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		response.setContentType("application/html");
		
		String jsonFile = "";
		
		// Section for code to check mySQL database
		
		// Section for code to send over all restaurant info
		
		out.print(jsonFile);
		
		out.close();
	}
}

@WebServlet("/ReadReviewServlet")
class WriteReviewServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		response.setContentType("application/html");
		
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String title = request.getParameter("title");
		String body = request.getParameter("body");
		String rating = request.getParameter("rating");
		String reviewID = request.getParameter("reviewID");
		
		String jsonFile = "";
		
		// Section for code to write information to mySQL database
		
		out.print(jsonFile);
		
		out.close();
	}
}

@WebServlet("/ModifyReview")
class ModifyReview extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final long ID_N = 1000000000000;
	
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		response.setContentType("application/html");
		
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String title = request.getParameter("title");
		String body = request.getParameter("body");
		String rating = request.getParameter("rating");
		long reviewID = Math.random() * ID_N;
		
		String jsonFile = "";
		
		// Section for code to update information on mySQL database
		Connection conn = null;
        PreparedStatement statement = null;

        try {
            conn = DriverManager.getConnection("[SQL SERVER URL]");
            
            do {
                String checkSql = "SELECT COUNT(*) FROM User WHERE ReviewID = ?";
                checkStmt = conn.prepareStatement(checkSql);
                checkStmt.setLong(1, reviewID);
                resultSet = checkStmt.executeQuery();

                reviewIdExists = false;
                if (resultSet.next()) {
                    int count = resultSet.getInt(1);
                    if (count > 0) {
                        reviewIdExists = true;
                        reviewID++; // Increment userId if it already exists
                    }
                }

                if (checkStmt != null) {
                    checkStmt.close();
                }
                if (resultSet != null) {
                    resultSet.close();
                }
            } while (userIdExists);

            String sql = "INSERT INTO Reviews (Title, Body, Rating, Username, ReviewID) VALUES (?, ?, ?, ?, ?)";
            statement = conn.prepareStatement(sql);

            statement.setString(1, title);
            statement.setString(2, body);
            statement.setString(3, rating);
            statement.setString(4, username);
            statement.setInt(5, String.valueOf(reviewID));

            int rowsAffected = statement.executeUpdate();

            if (rowsAffected > 0) {
                // Success Output
            	JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("status", "success");
                jsonResponse.put("ReviewID", String.valueOf(reviewID));
                jsonResponse.put("Title", title);
                out.print(jsonResponse.toString());
            } else {
                // Error Updating Review
            	JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "Error while adding review to database.");
                out.print(jsonResponse.toString());
            }
        } catch (SQLException sqle) {
        	JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("status", "error");
            jsonResponse.put("message", "SQLException: " + sqle.getMessage());
            out.print(jsonResponse.toString());
        } finally {
            try {
                if (statement != null) {
                    statement.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException sqle) {
                out.println("SQLException on close: " + sqle.getMessage());
            }
        }
		
		out.print(jsonFile);
		
		out.close();
	}
}