package com.disciplina.biblioteca.exception;

import java.time.Instant;
import java.util.Collections;
import java.util.List;

public class ErroResponse {

    private final Instant timestamp;
    private final int status;
    private final String error;
    private final String message;
    private final String path;
    private final List<CampoErro> campos;

    public ErroResponse(Instant timestamp, int status, String error, String message, String path, List<CampoErro> campos) {
        this.timestamp = timestamp;
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
        this.campos = campos;
    }

    public static ErroResponse of(int status, String error, String message, String path, List<CampoErro> campos) {
        return new ErroResponse(Instant.now(), status, error, message, path, campos);
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public int getStatus() {
        return status;
    }

    public String getError() {
        return error;
    }

    public String getMessage() {
        return message;
    }

    public String getPath() {
        return path;
    }

    public List<CampoErro> getCampos() {
        return campos;
    }

    public static class CampoErro {

        private final String campo;
        private final String mensagem;

        public CampoErro(String campo, String mensagem) {
            this.campo = campo;
            this.mensagem = mensagem;
        }

        public String getCampo() {
            return campo;
        }

        public String getMensagem() {
            return mensagem;
        }
    }
}
