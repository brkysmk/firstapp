package nl.hu.v1wac.firstapp.persistence;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class UserDao extends PostgresBaseDao {
	
	public String findRoleForUser(String username, String password) {
		String query = ("select role from useraccount where username= '" + username + "'and password = '" + password+ "'");
		String rol = null;
		try (Connection con = super.getConnection()) {
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(query);
			while (rs.next()) {
				String role = rs.getString("ROLE");
				rol = role;
			}
		} 
		catch (SQLException e) {
			e.printStackTrace();
		}
		System.out.println(rol);
		return rol;
	}
}
