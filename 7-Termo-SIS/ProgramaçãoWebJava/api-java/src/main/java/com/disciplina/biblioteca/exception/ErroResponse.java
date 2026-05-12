package com.disciplina.biblioteca.exception;

import java.time.Instant;
import java.util.List;

public record ErroResponse(
        Instant timestamp,
        int status,
        String error,
        String message,
        String path,
        List<CampoErro> campos
) {

    public static ErroResponse of(int status, String error, String message, String path, List<CampoErro> campos) {
        return new ErroResponse(Instant.now(), status, error, message, path, campos);
    }

    public record CampoErro(String campo, String mensagem) {
    }
}
