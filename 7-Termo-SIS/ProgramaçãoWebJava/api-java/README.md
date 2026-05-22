# Biblioteca API

## Nome do projeto

**Biblioteca API** — Web API REST em Java/Spring Boot para cadastro e manutenção de autores, categorias e livros de uma biblioteca.

---

## Descrição do sistema

A API permite **cadastrar, listar, consultar, atualizar e excluir** autores, categorias e livros. Cada livro está vinculado a **um autor** e pode estar em **várias categorias**. O relacionamento livro–categoria é **muitos-para-muitos**, com tabela de junção `livro_categoria`. Os dados de entrada e saída passam por **DTOs**; há **validação** com Bean Validation e **respostas de erro padronizadas** quando algo falha.

---

## Tecnologias utilizadas

| Tecnologia | Uso |
|------------|-----|
| Java 11 | Linguagem |
| Spring Boot 2.7.18 | Aplicação e configuração |
| Spring Web (`spring-boot-starter-web`) | REST / MVC |
| Spring Data JPA | Repositórios e persistência |
| Hibernate | Implementação JPA (via starter Data JPA) |
| MySQL | Banco de dados |
| Bean Validation (`spring-boot-starter-validation`) | Validação de DTOs (`@Valid`, anotações nos campos) |
| Maven | Build (com **Maven Wrapper**: `mvnw.cmd` / `mvnw`) |
| HTML + CSS + JS (estático, opcional) | Página em `src/main/resources/static/` |

---

## Como executar o projeto

### Pré-requisitos

- JDK **11**
- **MySQL** em execução (ex.: porta `3306`)
- Não é obrigatório ter Maven no `PATH`: use o **wrapper** na raiz do projeto

### Banco de dados

1. Ajuste usuário, senha e URL em `src/main/resources/application.properties`.
2. O banco `biblioteca_db` pode ser criado na primeira conexão se a URL tiver `createDatabaseIfNotExist=true`.
3. Com `spring.jpa.hibernate.ddl-auto=update`, o Hibernate cria ou atualiza as tabelas ao subir a aplicação.

### Subir a aplicação

Na pasta do projeto (`api-java`):

**Windows (PowerShell ou CMD):**

```powershell
.\mvnw.cmd spring-boot:run
```

**Git Bash / Linux / macOS:**

```bash
./mvnw spring-boot:run
```

Na primeira vez o wrapper pode baixar o Maven (internet). Alternativa: `mvn spring-boot:run` se o Maven estiver instalado globalmente, ou rodar a classe `BibliotecaApiApplication` pela IDE com JDK 11.

Serviço padrão: **http://localhost:8080**

### Página no navegador (opcional)

Com a API no ar: **http://localhost:8080/** — cadastro por abas. Deixe o campo **URL base** vazio se abrir pelo próprio Spring Boot.

---

## Endpoints disponíveis

Base: `http://localhost:8080`

| Recurso | Métodos HTTP | Caminhos |
|---------|----------------|----------|
| Autores | GET, POST, PUT, DELETE | `/api/autores` e `/api/autores/{id}` |
| Categorias | GET, POST, PUT, DELETE | `/api/categorias` e `/api/categorias/{id}` |
| Livros | GET, POST, PUT, DELETE | `/api/livros` e `/api/livros/{id}` |

- **POST** bem-sucedido: **201 Created** com o recurso no corpo.
- **DELETE** bem-sucedido: **204 No Content**.

---

## Exemplos de requisições

Use **Postman**, **Insomnia** ou **curl**. Envie `Content-Type: application/json` nos POST e PUT.

### Criar categoria

`POST http://localhost:8080/api/categorias`

```json
{
  "nome": "Tecnologia"
}
```

### Criar autor

`POST http://localhost:8080/api/autores`

```json
{
  "nome": "Robert C. Martin",
  "paisOrigem": "EUA"
}
```

### Criar livro

`POST http://localhost:8080/api/livros` — use os **ids** reais retornados nos POSTs anteriores:

```json
{
  "titulo": "Clean Code",
  "isbn": "9780132350884",
  "anoPublicacao": 2008,
  "autorId": 1,
  "categoriaIds": [1]
}
```

### Listar livros

`GET http://localhost:8080/api/livros`

### Atualizar livro

`PUT http://localhost:8080/api/livros/1` — mesmo JSON do POST, com os dados atualizados.

### Remover livro

`DELETE http://localhost:8080/api/livros/1`

Mais exemplos em linha de comando: `COMO_TESTAR.md` na raiz do projeto.

---

## Informações complementares

### Organização em camadas (enunciado)

| Camada | Pacote |
|--------|--------|
| Controller | `com.disciplina.biblioteca.controller` |
| Service | `com.disciplina.biblioteca.service` |
| Repository | `com.disciplina.biblioteca.repository` |
| Model (entidades JPA) | `com.disciplina.biblioteca.entity` |

DTOs: `dto`. Exceções globais: `exception`.

### Validações (Bean Validation)

Nos DTOs de entrada: `@NotBlank`, `@NotNull`, `@Size`, `@Positive` (ex.: ano do livro). Em falha de validação a API responde **400** com lista de campos e mensagens.

### Tratamento de exceções

Classe `GlobalExceptionHandler` (`@RestControllerAdvice`) com corpo JSON (`ErroResponse`): **404** recurso não encontrado, **409** regra de negócio ou integridade, **400** JSON inválido ou validação, **500** erro interno genérico.

### Relacionamentos entre entidades

- **Autor – Livro:** um autor, muitos livros.
- **Livro – Categoria:** muitos-para-muitos, tabela `livro_categoria`. Em coleções com `mappedBy` há `@JsonIgnore` para evitar ciclo na serialização JSON.

### Link do repositório

https://github.com/Vinicius11s/api-java

### Apresentação em sala (roteiro)

1. Tema: biblioteca (autores, categorias, livros).  
2. Entidades: `Autor`, `Categoria`, `Livro`.  
3. Relacionamentos: um-para-muitos (autor–livro); muitos-para-muitos (livro–categoria).  
4. Camadas: controller → service → repository → entity; DTOs na borda.  
5. Endpoints: tabela acima; fluxo categoria → autor → livro → GET lista.  
6. Validação: POST com campo inválido → 400.  
7. Exceções: GET id inexistente → 404; ISBN duplicado → 409.  
8. Demo: Postman ou `http://localhost:8080/`.
