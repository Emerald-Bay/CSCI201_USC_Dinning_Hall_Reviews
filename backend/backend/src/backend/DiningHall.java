package backend;

public class DiningHall {
	
	private String diningHallName;
	private double rating; //average rating
	
	public DiningHall() {
		
	}
	
	public DiningHall(String diningHallName, double rating) {
		this.diningHallName = diningHallName;
		this.rating = rating;
	}
	
	public String getDiningHallName() {
        return diningHallName;
    }
	
	public double getRating() {
		return rating;
	}
	
	public void setDiningHallName(String diningHallName) {
        this.diningHallName = diningHallName;
    }
	
	public void setRating(double rating) {
		this.rating = rating;
	}

	
}
