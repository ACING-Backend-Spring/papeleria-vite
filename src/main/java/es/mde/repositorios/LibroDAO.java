package es.mde.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.mde.entidades.Libro;

@Repository
public interface LibroDAO extends JpaRepository<Libro, Long> {

}