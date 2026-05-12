package com.disciplina.biblioteca.service;

import com.disciplina.biblioteca.dto.AutorResponse;
import com.disciplina.biblioteca.dto.CategoriaResponse;
import com.disciplina.biblioteca.dto.LivroRequest;
import com.disciplina.biblioteca.dto.LivroResponse;
import com.disciplina.biblioteca.entity.Autor;
import com.disciplina.biblioteca.entity.Categoria;
import com.disciplina.biblioteca.entity.Livro;
import com.disciplina.biblioteca.exception.RecursoNaoEncontradoException;
import com.disciplina.biblioteca.exception.RegraNegocioException;
import com.disciplina.biblioteca.repository.LivroRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class LivroService {

    private final LivroRepository livroRepository;
    private final AutorService autorService;
    private final CategoriaService categoriaService;

    public LivroService(LivroRepository livroRepository, AutorService autorService, CategoriaService categoriaService) {
        this.livroRepository = livroRepository;
        this.autorService = autorService;
        this.categoriaService = categoriaService;
    }

    @Transactional(readOnly = true)
    public List<LivroResponse> listar() {
        return livroRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public LivroResponse buscarPorId(Long id) {
        return livroRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Livro não encontrado com id: " + id));
    }

    @Transactional
    public LivroResponse criar(LivroRequest request) {
        String isbn = normalizarIsbn(request.isbn());
        if (livroRepository.existsByIsbn(isbn)) {
            throw new RegraNegocioException("Já existe um livro com o ISBN: " + isbn);
        }
        Autor autor = autorService.obterEntidade(request.autorId());
        Set<Categoria> categorias = categoriaService.obterPorIds(
                request.categoriaIds() == null ? List.of() : request.categoriaIds());

        Livro livro = new Livro();
        livro.setTitulo(request.titulo().trim());
        livro.setIsbn(isbn);
        livro.setAnoPublicacao(request.anoPublicacao());
        livro.setAutor(autor);
        livro.setCategorias(new HashSet<>(categorias));
        return toResponse(livroRepository.save(livro));
    }

    @Transactional
    public LivroResponse atualizar(Long id, LivroRequest request) {
        Livro livro = livroRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Livro não encontrado com id: " + id));
        String isbn = normalizarIsbn(request.isbn());
        if (livroRepository.existsByIsbnAndIdNot(isbn, id)) {
            throw new RegraNegocioException("Já existe outro livro com o ISBN: " + isbn);
        }
        Autor autor = autorService.obterEntidade(request.autorId());
        Set<Categoria> categorias = categoriaService.obterPorIds(
                request.categoriaIds() == null ? List.of() : request.categoriaIds());

        livro.setTitulo(request.titulo().trim());
        livro.setIsbn(isbn);
        livro.setAnoPublicacao(request.anoPublicacao());
        livro.setAutor(autor);
        livro.getCategorias().clear();
        livro.getCategorias().addAll(categorias);
        return toResponse(livroRepository.save(livro));
    }

    @Transactional
    public void remover(Long id) {
        Livro livro = livroRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Livro não encontrado com id: " + id));
        livroRepository.delete(livro);
    }

    private LivroResponse toResponse(Livro l) {
        AutorResponse ar = new AutorResponse(
                l.getAutor().getId(),
                l.getAutor().getNome(),
                l.getAutor().getPaisOrigem());
        List<CategoriaResponse> cats = l.getCategorias().stream()
                .map(c -> new CategoriaResponse(c.getId(), c.getNome()))
                .collect(Collectors.toList());
        return new LivroResponse(l.getId(), l.getTitulo(), l.getIsbn(), l.getAnoPublicacao(), ar, cats);
    }

    private static String normalizarIsbn(String isbn) {
        return isbn == null ? "" : isbn.replace("-", "").trim();
    }
}
