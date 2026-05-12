package com.disciplina.biblioteca.repository;

import com.disciplina.biblioteca.entity.Livro;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LivroRepository extends JpaRepository<Livro, Long> {

    @EntityGraph(attributePaths = {"autor", "categorias"})
    @Override
    List<Livro> findAll();

    @EntityGraph(attributePaths = {"autor", "categorias"})
    @Override
    Optional<Livro> findById(Long id);

    Optional<Livro> findByIsbn(String isbn);

    boolean existsByIsbn(String isbn);

    boolean existsByIsbnAndIdNot(String isbn, Long id);
}
