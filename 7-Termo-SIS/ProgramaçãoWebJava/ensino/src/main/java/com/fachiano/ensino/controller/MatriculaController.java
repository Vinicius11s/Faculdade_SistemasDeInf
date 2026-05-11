package com.fachiano.ensino.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fachiano.ensino.model.Aluno;
import com.fachiano.ensino.service.MatriculaService;

@RestController
@RequestMapping("/matriculas")
public class MatriculaController {

	private final MatriculaService service;
	
	public MatriculaController(MatriculaService service) {
		this.service = service;
	}
	
	@PostMapping
	public Aluno matricular(
			@RequestParam Long alunoId, 
			@RequestParam Long cursoId) {
		
		return service.matricular(alunoId, cursoId);
	}
}
