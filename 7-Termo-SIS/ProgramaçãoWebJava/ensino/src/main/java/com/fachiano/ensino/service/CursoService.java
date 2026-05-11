package com.fachiano.ensino.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fachiano.ensino.dto.CursoDTO;
import com.fachiano.ensino.model.Aluno;
import com.fachiano.ensino.model.Curso;
import com.fachiano.ensino.model.Professor;
import com.fachiano.ensino.repository.CursoRepository;
import com.fachiano.ensino.repository.ProfessorRepository;

@Service
public class CursoService {

	private final CursoRepository cursoRepository;
	private final ProfessorRepository professorRepository;

	public CursoService(CursoRepository cursoRepository, ProfessorRepository professorRepository) {
		this.cursoRepository = cursoRepository;
		this.professorRepository = professorRepository;
	}

	public List<Curso> listarTodos() {
		return cursoRepository.findAll();
	}

	public CursoDTO obterPorId(Long id) {
		Curso curso = cursoRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Curso não encontrado."));
		String nomeProfessor = curso.getProfessor() != null ? curso.getProfessor().getNome() : null;
		return new CursoDTO(curso.getId(), curso.getNome(), nomeProfessor);
	}

	public List<Aluno> listarAlunos(Long cursoId) {
		Curso curso = cursoRepository.findById(cursoId)
				.orElseThrow(() -> new RuntimeException("Curso não encontrado."));
		return curso.getAlunos();
	}

	public Curso salvar(Curso curso, Long professorId) {
		Professor professor = professorRepository.findById(professorId)
				.orElseThrow(() -> new RuntimeException("Professor não encontrado."));
		curso.setProfessor(professor);
		return cursoRepository.save(curso);
	}

}
