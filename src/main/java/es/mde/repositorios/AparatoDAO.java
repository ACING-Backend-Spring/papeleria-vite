package es.mde.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.mde.entidades.AparatoConId;

@Repository
public interface AparatoDAO extends JpaRepository<AparatoConId, Long> {

}