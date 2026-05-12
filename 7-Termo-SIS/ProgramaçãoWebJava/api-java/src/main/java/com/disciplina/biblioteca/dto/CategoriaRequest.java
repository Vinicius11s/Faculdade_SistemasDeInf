package com.disciplina.biblioteca.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CategoriaRequest(
        @NotBlank(message = "Nome da categoria é obrigatório")
        @Size(max = 80, message = "Nome deve ter no máximo 80 caracteres")
        String nome
) {
}
