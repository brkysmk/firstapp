package nl.hu.v1wac.firstapp.webservices;

import java.sql.SQLException;
import java.util.List;

import nl.hu.v1wac.firstapp.persistence.CountryDao;
import nl.hu.v1wac.firstapp.persistence.CountryPostgresDaoImpl;
import nl.hu.v1wac.firstapp.webservices.Country;

public class WorldService {
	CountryDao countryDao = new CountryPostgresDaoImpl();
	
	public List<Country> getAllCountries() {
		return countryDao.findAll();
	}
	
	public List<Country> get10LargestPopulations() {
		return countryDao.find10LargestPopulations();
	}

	public List<Country> get10LargestSurfaces() {
		return countryDao.find10LargestSurfaces();
	}
	
	public Country getCountryByCode(String code) {
		Country result = null;
		
		for (Country c : countryDao.findAll()) {
			if (c.getCode().equals(code)) {
				result = c;
				break;
			}
		}
		return result;
	}
	
	public Country updateCountry(String code, String nm, String cap, String reg, double sur, int pop) throws SQLException {
		Country c = countryDao.findByCode(code);
		c.setName(nm);
		c.setCapital(cap);
		c.setRegion(reg);
		c.setSurface(sur);
		c.setPopulation(pop);
		if(countryDao.update(c)) {
			return countryDao.findByCode(code);
		}
		return c;
	}
	
	public boolean deleteCountry(String code) {
		boolean verwijderd = false;
		Country c = countryDao.findByCode(code);
		if (c != null) {
			verwijderd = countryDao.delete(c);
		} 
		else {
			throw new IllegalArgumentException("Code bestaat niet!");
		}
		return verwijderd;	
	}
	
	public Country saveCountry(String code, String iso3, String nm, String cap, String ct, String reg, double sur, int pop, String gov, double lat, double lng) {
		Country c = new Country ( code,  iso3,  nm,  cap,  ct,  reg,  sur,  pop,  gov,  lat,  lng);
		c.setCode(code);
		c.setIso3(iso3);
		c.setName(nm);
		c.setCapital(cap);
		c.setContinent(ct);
		c.setRegion(reg);
		c.setSurface(sur);
		c.setPopulation(pop);
		c.setGovernment(gov);
		c.setLatitude(lat);
		c.setLongitude(lng);
		countryDao.save(c);
		return c;
	}
}