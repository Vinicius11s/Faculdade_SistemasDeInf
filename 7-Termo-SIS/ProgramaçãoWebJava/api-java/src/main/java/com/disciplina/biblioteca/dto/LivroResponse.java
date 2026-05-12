package com.disciplina.biblioteca.dto;

import java.util.List;

public record LivroResponse(
        Long id,
        String titulo,
        String isbn,
        Integer anoPublicacao,
        AutorResponse autor,
        List<CategoriaResponse> categorias
) {
}
