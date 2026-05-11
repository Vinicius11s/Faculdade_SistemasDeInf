package com.fachiano.ensino.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fachiano.ensino.model.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {

}
