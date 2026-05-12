package com.disciplina.biblioteca.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AutorRequest(
        @NotBlank(message = "Nome é obrigatório")
        @Size(max = 120, message = "Nome deve ter no máximo 120 caracteres")
        String nome,

        @Size(max = 80, message = "País deve ter no máximo 80 caracteres")
        String paisOrigem
) {
}
