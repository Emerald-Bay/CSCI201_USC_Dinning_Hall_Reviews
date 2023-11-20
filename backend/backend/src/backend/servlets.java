package backend;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

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
		
		// Section for code to update information on mySQL database
		
		out.print(jsonFile);
		
		out.close();
	}
}