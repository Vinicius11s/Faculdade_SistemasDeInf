package com.fachiano.ensino.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fachiano.ensino.dto.ProfessorDTO;
import com.fachiano.ensino.model.Professor;
import com.fachiano.ensino.service.ProfessorService;

@RestController
@RequestMapping("/professor")
public class ProfessorController {

	private final ProfessorService professorService;

	public ProfessorController(ProfessorService professorService) {
		this.professorService = professorService;
	}

	@GetMapping
	public List<Professor> listar() {
		return professorService.listarTodos();
	}

	@GetMapping("/{id}")
	public ProfessorDTO obterPorId(@PathVariable Long id) {
		return professorService.obterPorId(id);
	}

	@PostMapping
	public Professor salvar(@RequestBody Professor professor) {
		return professorService.salvar(professor);
	}
}
