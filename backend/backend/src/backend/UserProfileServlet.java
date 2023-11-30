@WebServlet("/UserProfileServlet")
public class UserProfileServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        try {
            Connection connection = JDBC.getConnection();
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM Users WHERE username = ?");
            ps.setString(1, username);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                User user = new User(rs.getString("username"), rs.getString("password"));
                Gson gson = new Gson();
                String userJson = gson.toJson(user);
                out.print(userJson);
            } else {
                out.print("{}"); // Empty JSON object if user not found
            }
        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"error\":\"Database error\"}");
        } finally {
            out.close();
        }
    }
}
