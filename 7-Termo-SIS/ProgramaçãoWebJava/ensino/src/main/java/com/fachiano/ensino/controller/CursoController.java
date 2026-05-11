package com.fachiano.ensino.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fachiano.ensino.dto.CursoDTO;
import com.fachiano.ensino.model.Aluno;
import com.fachiano.ensino.model.Curso;
import com.fachiano.ensino.service.CursoService;

@RestController
@RequestMapping("/curso")
public class CursoController {

	private final CursoService cursoService;

	public CursoController(CursoService cursoService) {
		this.cursoService = cursoService;
	}

	@GetMapping
	public List<Curso> listar() {
		return cursoService.listarTodos();
	}

	@GetMapping("/{id}")
	public CursoDTO obterPorId(@PathVariable Long id) {
		return cursoService.obterPorId(id);
	}

	@GetMapping("/{id}/alunos")
	public List<Aluno> listarAlunos(@PathVariable Long id) {
		return cursoService.listarAlunos(id);
	}

	@PostMapping("/{professorId}")
	public Curso salvar(@RequestBody Curso curso, @PathVariable Long professorId) {
		return cursoService.salvar(curso, professorId);
	}

}
