package nl.hu.v1wac.firstapp.webservices;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.security.RolesAllowed;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

@Path("/countries")
public class WorldResource {

	@GET
	@Produces("application/json")
	public String getCountries() {
		System.out.println("hallo1");
		WorldService service = ServiceProvider.getWorldService();
		JsonArrayBuilder jab = Json.createArrayBuilder();

		for (Country country : service.getAllCountries()) {
			JsonObjectBuilder job = Json.createObjectBuilder();
			job.add("code", country.getCode());
			job.add("iso3", country.getIso3());
			job.add("name", country.getName());
			job.add("capital", country.getCapital());
			job.add("continent", country.getContinent());
			job.add("region", country.getRegion());
			job.add("surface", country.getSurface());
			job.add("population", country.getPopulation());
			job.add("government", country.getGovernment());
			job.add("latitude", country.getLatitude());
			job.add("longitude", country.getLongitude());

			jab.add(job);
		}
		JsonArray array = jab.build();
		return array.toString();
	}

	@GET
	@Path("{id}")
	@Produces("Application/json")
	public String getCountryInfo(@PathParam("id") String id) {
		System.out.println("hallooo1");
		WorldService service = ServiceProvider.getWorldService();
		Country world = service.getCountryByCode(id);

		if (world == null) {
			throw new WebApplicationException("No such order!");
		}

		JsonArrayBuilder jab = Json.createArrayBuilder();

		JsonObjectBuilder job = Json.createObjectBuilder();
		job.add("code", world.getCode());
		job.add("iso3", world.getIso3());
		job.add("name", world.getName());
		job.add("capital", world.getCapital());
		job.add("continent", world.getContinent());
		job.add("region", world.getRegion());
		job.add("surface", world.getSurface());
		job.add("population", world.getPopulation());
		job.add("government", world.getGovernment());
		job.add("latitude", world.getLatitude());
		job.add("longitude", world.getLongitude());

		jab.add(job);

		JsonArray array = jab.build();
		return array.toString();
	}

	@GET
	@Path("/largestsurfaces")
	@Produces("Application/json")
	public String getGrootsteLanden() {
		WorldService service = ServiceProvider.getWorldService();
		JsonArrayBuilder jab = Json.createArrayBuilder();

		for (Country country : service.get10LargestSurfaces()) {
			JsonObjectBuilder job = Json.createObjectBuilder();
			job.add("code", country.getCode());
			job.add("iso3", country.getIso3());
			job.add("name", country.getName());
			job.add("capital", country.getCapital());
			job.add("continent", country.getContinent());
			job.add("region", country.getRegion());
			job.add("surface", country.getSurface());
			job.add("population", country.getPopulation());
			job.add("government", country.getGovernment());
			job.add("latitude", country.getLatitude());
			job.add("longitude", country.getLongitude());

			jab.add(job);

		}
		JsonArray array = jab.build();
		return array.toString();
	}

	@GET
	@Path("/largestpopulations")
	@Produces("Application/json")
	public String getLandenMeesteInwoners() {
		WorldService service = ServiceProvider.getWorldService();
		JsonArrayBuilder jab = Json.createArrayBuilder();

		for (Country country : service.get10LargestPopulations()) {
			JsonObjectBuilder job = Json.createObjectBuilder();
			job.add("code", country.getCode());
			job.add("iso3", country.getIso3());
			job.add("name", country.getName());
			job.add("capital", country.getCapital());
			job.add("continent", country.getContinent());
			job.add("region", country.getRegion());
			job.add("surface", country.getSurface());
			job.add("population", country.getPopulation());
			job.add("government", country.getGovernment());
			job.add("latitude", country.getLatitude());
			job.add("longitude", country.getLongitude());
			jab.add(job);
		}
		JsonArray array = jab.build();
		return array.toString();
	}

	@POST
	@RolesAllowed("user")
	@Produces("application/json")
	public Response createCountry(@Context SecurityContext sc, @FormParam("countrycode") String code,
			@FormParam("iso3") String iso3, @FormParam("name") String name, @FormParam("capital") String capital,
			@FormParam("continent") String continent, @FormParam("region") String region,
			@FormParam("surface") double surface, @FormParam("population") int population,
			@FormParam("governmentform") String gov, @FormParam("latitude") double lat,
			@FormParam("longitude") double lng) {
		WorldService service = ServiceProvider.getWorldService();
		boolean role = sc.isUserInRole("user");
		if (role) {
			Country newCountry = service.saveCountry(code, iso3, name, capital, continent, region, surface, population, gov, lat, lng);
			if (newCountry == null) {
				Map<String, String> messages = new HashMap<String, String>();
				messages.put("error", "Country does not exist!");
				return Response.status(409).entity(messages).build();

			}
			return Response.ok().build();
		}
		Map<String, String> messages = new HashMap<String, String>();
		messages.put("error", "Account mag dit niet uitvoeren!");
		return Response.status(409).entity(messages).build();
	}
}
