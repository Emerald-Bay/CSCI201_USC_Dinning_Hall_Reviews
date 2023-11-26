import java.util.Date;

public class Menu{
	private String diningHallName;
	private String menuItem;
	private Date date;
	
	public Menu() {
		
	}
	
	public Menu(String diningHallName, String menuItem, Date date) {
		this.diningHallName = diningHallName;
		this.menuItem = menuItem;
		this.date = date;
	}
	
	public String getDiningHallName() {
        return diningHallName;
    }
	
	public String getMenuItem() {
        return menuItem;
    }
	
	public Date getDate() {
        return date;
    }
	
	public void setDiningHallName(String diningHallName) {
        this.diningHallName = diningHallName;
    }
	
	public void setgetMenuItem(String menuItem) {
        this.menuItem = menuItem;
    }
	
	public void setDate(Date date) {
		this.date = date;
	}
}
