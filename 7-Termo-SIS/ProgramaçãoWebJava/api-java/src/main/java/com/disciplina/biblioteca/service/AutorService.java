package com.disciplina.biblioteca.service;

import com.disciplina.biblioteca.dto.AutorRequest;
import com.disciplina.biblioteca.dto.AutorResponse;
import com.disciplina.biblioteca.entity.Autor;
import com.disciplina.biblioteca.exception.RecursoNaoEncontradoException;
import com.disciplina.biblioteca.exception.RegraNegocioException;
import com.disciplina.biblioteca.repository.AutorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AutorService {

    private final AutorRepository autorRepository;

    public AutorService(AutorRepository autorRepository) {
        this.autorRepository = autorRepository;
    }

    @Transactional(readOnly = true)
    public List<AutorResponse> listar() {
        return autorRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AutorResponse buscarPorId(Long id) {
        return autorRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Autor não encontrado com id: " + id));
    }

    @Transactional
    public AutorResponse criar(AutorRequest request) {
        autorRepository.findByNomeIgnoreCase(request.getNome().trim())
                .ifPresent(a -> {
                    throw new RegraNegocioException("Já existe um autor com o nome: " + request.getNome());
                });
        Autor autor = new Autor();
        autor.setNome(request.getNome().trim());
        autor.setPaisOrigem(trimToNull(request.getPaisOrigem()));
        return toResponse(autorRepository.save(autor));
    }

    @Transactional
    public AutorResponse atualizar(Long id, AutorRequest request) {
        Autor autor = autorRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Autor não encontrado com id: " + id));
        autorRepository.findByNomeIgnoreCase(request.getNome().trim())
                .filter(a -> !a.getId().equals(id))
                .ifPresent(a -> {
                    throw new RegraNegocioException("Já existe outro autor com o nome: " + request.getNome());
                });
        autor.setNome(request.getNome().trim());
        autor.setPaisOrigem(trimToNull(request.getPaisOrigem()));
        return toResponse(autorRepository.save(autor));
    }

    @Transactional
    public void remover(Long id) {
        Autor autor = autorRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Autor não encontrado com id: " + id));
        if (!autor.getLivros().isEmpty()) {
            throw new RegraNegocioException("Não é possível excluir autor com livros cadastrados");
        }
        autorRepository.delete(autor);
    }

    Autor obterEntidade(Long id) {
        return autorRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Autor não encontrado com id: " + id));
    }

    private AutorResponse toResponse(Autor a) {
        return new AutorResponse(a.getId(), a.getNome(), a.getPaisOrigem());
    }

    private static String trimToNull(String s) {
        if (s == null) {
            return null;
        }
        String t = s.trim();
        return t.isEmpty() ? null : t;
    }
}
