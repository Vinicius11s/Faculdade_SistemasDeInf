package com.fachiano.ensino.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fachiano.ensino.dto.CursoDTO;
import com.fachiano.ensino.dto.ProfessorDTO;
import com.fachiano.ensino.model.Professor;
import com.fachiano.ensino.repository.ProfessorRepository;

@Service
public class ProfessorService {

    private final ProfessorRepository professorRepository;

    public ProfessorService(ProfessorRepository professorRepository) {
        this.professorRepository = professorRepository;
    }

    public List<Professor> listarTodos() {
        return professorRepository.findAll();
    }

    public ProfessorDTO obterPorId(Long id) {
        Professor professor = professorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado."));
        List<CursoDTO> cursos = professor.getCursos().stream()
                .map(c -> new CursoDTO(c.getId(), c.getNome(), professor.getNome()))
                .collect(Collectors.toList());
        return new ProfessorDTO(professor.getId(), professor.getNome(), professor.getEspecialidade(), cursos);
    }

    public Professor salvar(Professor professor) {
        return professorRepository.save(professor);
    }

}
