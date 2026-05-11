package com.fachiano.ensino.dto;

import java.util.List;

public class ProfessorDTO {

    private Long id;
    private String nome;
    private String especialidade;
    private List<CursoDTO> cursos;

    public ProfessorDTO(Long id, String nome, String especialidade, List<CursoDTO> cursos) {
        this.id = id;
        this.nome = nome;
        this.especialidade = especialidade;
        this.cursos = cursos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }

    public List<CursoDTO> getCursos() {
        return cursos;
    }

    public void setCursos(List<CursoDTO> cursos) {
        this.cursos = cursos;
    }
}
