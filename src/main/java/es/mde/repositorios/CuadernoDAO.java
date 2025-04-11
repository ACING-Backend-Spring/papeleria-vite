package es.mde.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.mde.entidades.Cuaderno;

@Repository
public interface CuadernoDAO extends JpaRepository<Cuaderno, Long> {

}