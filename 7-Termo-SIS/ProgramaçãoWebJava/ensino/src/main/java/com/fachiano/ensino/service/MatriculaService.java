package com.fachiano.ensino.service;

import org.springframework.stereotype.Service;

import com.fachiano.ensino.model.Aluno;
import com.fachiano.ensino.model.Curso;
import com.fachiano.ensino.repository.AlunoRepository;
import com.fachiano.ensino.repository.CursoRepository;

@Service
public class MatriculaService {

	private final AlunoRepository alunoRepository;
	private final CursoRepository cursoRepository;
	
	public MatriculaService(AlunoRepository alunoRepository, CursoRepository cursoRepository) {
		this.alunoRepository = alunoRepository;
		this.cursoRepository = cursoRepository;
	}
	
	public Aluno matricular(Long alunoId, Long cursoId) {
		Aluno aluno = alunoRepository.findById(alunoId)
				.orElseThrow(() -> new RuntimeException("Aluno não encontrado."));
		
		Curso curso = cursoRepository.findById(cursoId)
				.orElseThrow(() -> new RuntimeException("Curso não encontrado."));
		
		aluno.getCursos().add(curso);
		
		return alunoRepository.save(aluno);
	}
}
