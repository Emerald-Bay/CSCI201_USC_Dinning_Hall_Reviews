package backend;

public class Reviews {
	//username, password, title, body, rating
	
	private String username;
    private String password;
    private String title;
    private String body;
    private double rating;
    
    public Reviews() {
    	
    }
    
    public Reviews(String username, String password, String title, String body, double rating) {
    	this.username = username;
    	this.password = password;
    	this.title = title;
    	this.body = body;
    	this.rating = rating;
    }
    
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
    
    public String getTitle() {
    	return title;
    }
    
    public String getBody() {
    	return body;
    }
    
    public double getRating() {
    	return rating;
    }

    // Setters
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    public void setTitle(String title) {
    	this.title = title;
    }
    
    public void setBody(String body) {
    	this.body = body;
    }
    
    public void setRating(double rating) {
    	this.rating = rating;
    }
    

}
