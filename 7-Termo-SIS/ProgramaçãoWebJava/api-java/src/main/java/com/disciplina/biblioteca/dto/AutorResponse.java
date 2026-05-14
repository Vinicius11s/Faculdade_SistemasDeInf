package com.disciplina.biblioteca.dto;

public class AutorResponse {

    private final Long id;
    private final String nome;
    private final String paisOrigem;

    public AutorResponse(Long id, String nome, String paisOrigem) {
        this.id = id;
        this.nome = nome;
        this.paisOrigem = paisOrigem;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getPaisOrigem() {
        return paisOrigem;
    }
}
