package com.disciplina.biblioteca.dto;

import java.util.List;

public class LivroResponse {

    private final Long id;
    private final String titulo;
    private final String isbn;
    private final Integer anoPublicacao;
    private final AutorResponse autor;
    private final List<CategoriaResponse> categorias;

    public LivroResponse(Long id, String titulo, String isbn, Integer anoPublicacao,
                         AutorResponse autor, List<CategoriaResponse> categorias) {
        this.id = id;
        this.titulo = titulo;
        this.isbn = isbn;
        this.anoPublicacao = anoPublicacao;
        this.autor = autor;
        this.categorias = categorias;
    }

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getIsbn() {
        return isbn;
    }

    public Integer getAnoPublicacao() {
        return anoPublicacao;
    }

    public AutorResponse getAutor() {
        return autor;
    }

    public List<CategoriaResponse> getCategorias() {
        return categorias;
    }
}
