package es.mde.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import es.mde.entidades.Libro;

@RepositoryRestResource(path = "libros", itemResourceRel = "libro", collectionResourceRel = "libros")
public interface LibroDAO extends JpaRepository<Libro, Long> {

}