package nl.hu.v1wac.firstapp.webservices;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

@Path("/countries/{countrycode}")
public class CountryResource {
	private WorldService service = ServiceProvider.getWorldService();

	@GET
	@Produces("application/json")
	public Response getCountry(@PathParam("countrycode") String code) {
		Country country = service.getCountryByCode(code);

		if (country == null) {
			Map<String, String> messages = new HashMap<String, String>();
			messages.put("error", "Country bestaat niet!");
			return Response.status(409).entity(messages).build();
		}
		return Response.ok(country).build();
	}

	@PUT
	@RolesAllowed("user")
	@Produces("application/json")
	public Response updateCountry(@Context SecurityContext sc, @PathParam("countrycode") String code,
			@FormParam("name") String name, @FormParam("capital") String capital, @FormParam("region") String region,
			@FormParam("surface") double surface, @FormParam("population") int population) throws SQLException {
		boolean role = sc.isUserInRole("user");
		if (role) {
			Country country = service.updateCountry(code, name, capital, region, surface, population);

			if (country == null) {
				Map<String, String> messages = new HashMap<String, String>();
				messages.put("error", "Country does not exist!");
				return Response.status(409).entity(messages).build();
			}
			return Response.ok(country).build();
		}
		Map<String, String> messages = new HashMap<String, String>();
		messages.put("error", "Account mag dit niet uitvoeren!");
		return Response.status(409).entity(messages).build();
	}

	@DELETE
	@RolesAllowed("user")
	@Produces("application/json")
	public Response deleteCountry(@Context SecurityContext sc, @PathParam("countrycode") String code) {

		WorldService service = ServiceProvider.getWorldService();
		boolean role = sc.isUserInRole("user");

		if (role) {
			if (service.deleteCountry(code)) {
				return Response.ok().build();
			}
		}
		Map<String, String> messages = new HashMap<String, String>();
		messages.put("error", "Account mag dit niet uitvoeren!");
		return Response.status(409).entity(messages).build();
	}
}
