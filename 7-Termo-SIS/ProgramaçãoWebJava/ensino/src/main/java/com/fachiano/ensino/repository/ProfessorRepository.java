package com.fachiano.ensino.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fachiano.ensino.model.Professor;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {

}
