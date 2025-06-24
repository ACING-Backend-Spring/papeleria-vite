package es.mde.repositorios;

import jakarta.persistence.PostPersist;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import es.mde.entidades.Libro;

@Component
public class LibroListener {
	private Logger log = LoggerFactory.getLogger(LibroListener.class);
	private static LibroDAO libroDAO;

	@Autowired
	public void init(LibroDAO libroDAO) {
		this.libroDAO = libroDAO;
	}

	@PostPersist
	public void postGuardar(Libro libro) throws Exception {
		libro.setIdString(libro.getId().toString());
		libro.setTipo("Libro");
		System.err.println("Se ha creado al libro: " + libro.getNombre() + " con Id " + libro.getIdString());

	}
}