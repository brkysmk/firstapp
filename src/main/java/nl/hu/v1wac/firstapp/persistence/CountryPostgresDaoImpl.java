package nl.hu.v1wac.firstapp.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import nl.hu.v1wac.firstapp.webservices.Country;

public class CountryPostgresDaoImpl extends PostgresBaseDao implements CountryDao {

	private List<Country> selectCountry(String query) {
		List<Country> results = new ArrayList<Country>();

		try (Connection con = super.getConnection()) {
			Statement stmt = con.createStatement();
			ResultSet dbResultSet = stmt.executeQuery(query);

			while (dbResultSet.next()) {
				String code = dbResultSet.getString("code");
				String iso3 = dbResultSet.getString("iso3");
				String name = dbResultSet.getString("name");
				String capital = dbResultSet.getString("capital");
				String continent = dbResultSet.getString("continent");
				String region = dbResultSet.getString("region");
				double surfacearea = dbResultSet.getDouble("surfacearea");
				int population = dbResultSet.getInt("population");
				String governmentform = dbResultSet.getString("governmentform");
				double latitude = dbResultSet.getDouble("latitude");
				double longitude = dbResultSet.getDouble("longitude");

				Country newCountry = new Country(code, iso3, name, capital, continent, region, surfacearea, population, governmentform, latitude, longitude);
				results.add(newCountry);
			}
		} 
		catch (SQLException sqle) {
			sqle.printStackTrace();
		}
		return results;
	}

	@Override
	public boolean save(Country country) {
		boolean opgeslagen = false;

		String sql = "INSERT INTO COUNTRY (code, iso3, name, capital, continent, region, surfacearea" + ", population, governmentform, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

		try (Connection con = super.getConnection()) {
			PreparedStatement pstmt = con.prepareStatement(sql);
			pstmt.setString(1, country.getCode());
			pstmt.setString(2, country.getIso3());
			pstmt.setString(3, country.getName());
			pstmt.setString(4, country.getCapital());
			pstmt.setString(5, country.getContinent());
			pstmt.setString(6, country.getRegion());
			pstmt.setDouble(7, country.getSurface());
			pstmt.setInt(8, country.getPopulation());
			pstmt.setString(9, country.getGovernment());
			pstmt.setDouble(10, country.getLatitude());
			pstmt.setDouble(11, country.getLongitude());
			int result = pstmt.executeUpdate();

			if (result == 0) {
				return false;
			} 
			else {
				opgeslagen = true;
				System.out.println("Insert voltooid voor country : " + country.getName() + "\n");
			}
		} 
		catch (SQLException e) {
			e.printStackTrace();
		}
		return opgeslagen;
	}

	@Override
	public List<Country> findAll() {
		return selectCountry("SELECT code, iso3, name, capital,continent, region, surfacearea, population, governmentform, latitude, longitude FROM country");
	}

	@Override
	public Country findByCode(String code) {

		return selectCountry("SELECT code, iso3, name, capital,continent, region, surfacearea, population, governmentform, latitude, longitude FROM country WHERE code = '" + code + "'").get(0);
	}

	@Override
	public List<Country> find10LargestPopulations() {
		return selectCountry("SELECT code, iso3, name, capital,continent, region, surfacearea, population, governmentform, latitude, longitude FROM country");
	}

	@Override
	public List<Country> find10LargestSurfaces() {
		return selectCountry("SELECT code, iso3, name, capital,continent, region, surfacearea, population, governmentform, latitude, longitude FROM country");
	}

	@Override
	public boolean update(Country country) throws SQLException {
		System.out.println("test1");
		System.out.println(country.getName());
		boolean resultaat = false;

		boolean countryBestaat = findByCode(country.getCode()) != null;
		if (countryBestaat) {
			String query = "UPDATE COUNTRY SET NAME = ?, CAPITAL = ?, REGION = ?, SURFACEAREA = ?, POPULATION = ? WHERE CODE = '" + country.getCode() + "'";
			try (Connection con = super.getConnection()) {
				PreparedStatement pstmt = con.prepareStatement(query);
				System.out.println(country.getName() + " " + country.getCapital());

				pstmt.setString(1, country.getName());
				pstmt.setString(2, country.getCapital());
				pstmt.setString(3, country.getRegion());
				pstmt.setDouble(4, country.getSurface());
				pstmt.setInt(5, country.getPopulation());

				int result = pstmt.executeUpdate();
				pstmt.close();

				if (result == 0)
					return false;
				else
					resultaat = true;
			}
		}
		return resultaat;
	}

	@Override
	public boolean delete(Country country) {
		boolean result = false;
		boolean countryExist = findByCode(country.getCode()) != null;

		if (countryExist) {
			String query = "DELETE FROM country WHERE code = '" + country.getCode() + "'";

			try (Connection con = super.getConnection()) {

				Statement stmt = con.createStatement();
				if (stmt.executeUpdate(query) == 1) { // 1 row updated!
					result = true;
				}
			} 
			catch (SQLException sqle) {
				sqle.printStackTrace();
			}
		}
		return result;
	}
}