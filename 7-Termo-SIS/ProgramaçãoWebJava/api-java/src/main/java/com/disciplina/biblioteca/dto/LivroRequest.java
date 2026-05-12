package com.disciplina.biblioteca.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.util.List;

public record LivroRequest(
        @NotBlank(message = "Título é obrigatório")
        @Size(max = 200, message = "Título deve ter no máximo 200 caracteres")
        String titulo,

        @NotBlank(message = "ISBN é obrigatório")
        @Size(min = 10, max = 20, message = "ISBN deve ter entre 10 e 20 caracteres")
        String isbn,

        @NotNull(message = "Ano de publicação é obrigatório")
        @Positive(message = "Ano de publicação deve ser positivo")
        Integer anoPublicacao,

        @NotNull(message = "ID do autor é obrigatório")
        Long autorId,

        List<Long> categoriaIds
) {
}
