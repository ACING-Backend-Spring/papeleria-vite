package es.mde.entidades;

import es.mde.repositorios.LibroListener;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;

@Entity
@DiscriminatorValue("LIBRO")
@EntityListeners(LibroListener.class)
public class Libro extends Producto {

	private String autor;

	public Libro() {
	}

	public String getAutor() {
		return autor;
	}

	public void setAutor(String autor) {
		this.autor = autor;
	}

}