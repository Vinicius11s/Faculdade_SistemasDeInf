package com.disciplina.biblioteca.service;

import com.disciplina.biblioteca.dto.CategoriaRequest;
import com.disciplina.biblioteca.dto.CategoriaResponse;
import com.disciplina.biblioteca.entity.Categoria;
import com.disciplina.biblioteca.exception.RecursoNaoEncontradoException;
import com.disciplina.biblioteca.exception.RegraNegocioException;
import com.disciplina.biblioteca.repository.CategoriaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    @Transactional(readOnly = true)
    public List<CategoriaResponse> listar() {
        return categoriaRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public CategoriaResponse buscarPorId(Long id) {
        return categoriaRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Categoria não encontrada com id: " + id));
    }

    @Transactional
    public CategoriaResponse criar(CategoriaRequest request) {
        categoriaRepository.findByNomeIgnoreCase(request.nome().trim())
                .ifPresent(c -> {
                    throw new RegraNegocioException("Já existe uma categoria com o nome: " + request.nome());
                });
        Categoria c = new Categoria();
        c.setNome(request.nome().trim());
        return toResponse(categoriaRepository.save(c));
    }

    @Transactional
    public CategoriaResponse atualizar(Long id, CategoriaRequest request) {
        Categoria c = categoriaRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Categoria não encontrada com id: " + id));
        categoriaRepository.findByNomeIgnoreCase(request.nome().trim())
                .filter(x -> !x.getId().equals(id))
                .ifPresent(x -> {
                    throw new RegraNegocioException("Já existe outra categoria com o nome: " + request.nome());
                });
        c.setNome(request.nome().trim());
        return toResponse(categoriaRepository.save(c));
    }

    @Transactional
    public void remover(Long id) {
        Categoria c = categoriaRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Categoria não encontrada com id: " + id));
        if (!c.getLivros().isEmpty()) {
            throw new RegraNegocioException("Não é possível excluir categoria associada a livros");
        }
        categoriaRepository.delete(c);
    }

    Set<Categoria> obterPorIds(List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return Set.of();
        }
        List<Categoria> encontradas = categoriaRepository.findAllById(ids);
        long idsDistintos = ids.stream().distinct().count();
        if (encontradas.size() != idsDistintos) {
            throw new RecursoNaoEncontradoException("Uma ou mais categorias informadas não existem");
        }
        return encontradas.stream().collect(Collectors.toSet());
    }

    private CategoriaResponse toResponse(Categoria c) {
        return new CategoriaResponse(c.getId(), c.getNome());
    }
}
