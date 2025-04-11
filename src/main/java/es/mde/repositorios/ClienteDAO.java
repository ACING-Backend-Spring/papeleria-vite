package es.mde.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.mde.entidades.Cliente;

@Repository
public interface ClienteDAO extends JpaRepository<Cliente, Long> {

}