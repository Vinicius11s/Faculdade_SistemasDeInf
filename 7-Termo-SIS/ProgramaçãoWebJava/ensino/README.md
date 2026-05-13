# Ensino

Projeto desenvolvido na disciplina de Programacao Web Java.

## Objetivo

Sistema simples para cadastro de alunos, professores, cursos e matriculas, utilizando Spring Boot, Spring Data JPA e MySQL.

## Principais endpoints

- `GET /curso`
- `GET /curso/{id}`
- `POST /curso/{professorId}`
- `GET /professor`
- `GET /professor/{id}`
- `POST /professor`
- `GET /aluno`
- `GET /aluno/{id}`
- `POST /aluno`
- `POST /matriculas?alunoId={id}&cursoId={id}`

## Alteracoes realizadas

- Criacao do `CursoDTO` com os campos `id`, `titulo` e `professor`.
- Alteracao do endpoint `GET /curso/{id}` para retornar `CursoDTO`.
- Criacao do `ProfessorDTO` contendo os dados do professor e a lista de cursos.
- Alteracao do endpoint `GET /professor/{id}` para retornar `ProfessorDTO`.

## Tecnologias

- Java 11
- Spring Boot 2.7.18
- Spring Data JPA
- MySQL
- Maven

## Execucao

Crie o banco de dados `ensino` no MySQL e configure a senha em `src/main/resources/application.properties`.

Para executar o projeto:

```bash
./mvnw spring-boot:run
```
