package com.fachiano.ensino.dto;

public class CursoDTO {

    private Long id;
    private String titulo;
    private String professor;

    public CursoDTO(Long id, String titulo, String professor) {
        this.id = id;
        this.titulo = titulo;
        this.professor = professor;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getProfessor() {
        return professor;
    }

    public void setProfessor(String professor) {
        this.professor = professor;
    }
}
