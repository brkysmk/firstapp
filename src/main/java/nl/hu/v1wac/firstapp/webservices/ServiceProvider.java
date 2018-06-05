package nl.hu.v1wac.firstapp.webservices;

public class ServiceProvider {
	private static WorldService worldService = new WorldService();

	public static WorldService getWorldService() {
		return worldService;
	}
}
