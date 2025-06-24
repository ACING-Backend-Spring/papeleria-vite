package es.mde.entidades;

import es.mde.repositorios.CuadernoListener;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;

@Entity
@DiscriminatorValue("CUADERNO")
@EntityListeners(CuadernoListener.class)
public class Cuaderno extends Producto {

	private int hojas;

	public Cuaderno() {
	}

	public int getHojas() {
		return hojas;
	}

	public void setHojas(int hojas) {
		this.hojas = hojas;
	}

}