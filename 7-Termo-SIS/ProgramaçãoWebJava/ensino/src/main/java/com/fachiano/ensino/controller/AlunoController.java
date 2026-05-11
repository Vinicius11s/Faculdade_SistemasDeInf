package com.fachiano.ensino.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fachiano.ensino.model.Aluno;
import com.fachiano.ensino.model.Curso;
import com.fachiano.ensino.service.AlunoService;

@RestController
@RequestMapping("/aluno")
public class AlunoController {

	private final AlunoService service;
	
	public AlunoController(AlunoService service) {
		this.service = service;
	}
	
	@GetMapping
	public List<Aluno> listar() {
		return service.listarTodos();
	}
	
	@GetMapping("/{id}")
	public Aluno buscarPorId(@PathVariable Long id) {
		return service.buscarPorId(id);
	}
	
	@GetMapping("/{id}/cursos")
	public List<Curso> listarCursos(@PathVariable Long id) {
		return service.listarCursos(id);
	}
	
	@PostMapping
	public Aluno salvar(@RequestBody Aluno aluno) {
		return service.salvar(aluno);
	}
	
	@PutMapping("/{id}")
	public Aluno atualizar(@PathVariable Long id,
			@RequestBody Aluno aluno) {
		return service.atualizar(id, aluno);
	}
	
	@DeleteMapping("/{id}")
	public void deletar(@PathVariable Long id) {
		service.deletar(id);
	}
	
	
	
	
	
	
}
