package es.mde.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.mde.entidades.Producto;

@Repository
public interface ProductoDAO extends JpaRepository<Producto, Long>{

}