package es.mde.repositorios;

import jakarta.persistence.PostPersist;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import es.mde.entidades.Cuaderno;

@Component
public class CuadernoListener {
	private Logger log = LoggerFactory.getLogger(CuadernoListener.class);
	private static CuadernoDAO cuadernoDAO;

	@Autowired
	public void init(CuadernoDAO cuadernoDAO) {
		this.cuadernoDAO = cuadernoDAO;
	}

	@PostPersist
	public void postGuardar(Cuaderno cuaderno) throws Exception {
		cuaderno.setIdString(cuaderno.getId().toString());
		cuaderno.setTipo("Cuaderno");
		System.err.println("Se ha creado al cuaderno: " + cuaderno.getNombre() + " con Id " + cuaderno.getIdString());

	}
}