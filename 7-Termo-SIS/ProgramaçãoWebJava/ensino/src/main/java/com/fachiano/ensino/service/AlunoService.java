package com.fachiano.ensino.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fachiano.ensino.model.Aluno;
import com.fachiano.ensino.model.Curso;
import com.fachiano.ensino.repository.AlunoRepository;

@Service
public class AlunoService {

private final AlunoRepository repository;
	
	public AlunoService(AlunoRepository repository) {		
		this.repository = repository;
	}
	
	public List<Aluno> listarTodos() {
		return repository.findAll();
	}
	
	public Aluno buscarPorId(Long id) {
		return repository.findById(id)
				.orElseThrow(()-> new RuntimeException("Aluno não encontrado"));
	}
	
	public List<Curso> listarCursos(Long alunoId) {
		Aluno aluno = repository.findById(alunoId)
				.orElseThrow(() -> new RuntimeException("Aluno não encontrado."));
		
		return aluno.getCursos();
	}
	
	public Aluno salvar(Aluno aluno) {
		return repository.save(aluno);
	}
	
	public Aluno atualizar(Long id, Aluno alunoAtualizado) {
		Aluno aluno = buscarPorId(id);
		aluno.setNome(alunoAtualizado.getNome());
		aluno.setEmail(alunoAtualizado.getEmail());
		return repository.save(aluno);
	}
	
	public void deletar(Long id) {
		repository.deleteById(id);
	}
	
}
