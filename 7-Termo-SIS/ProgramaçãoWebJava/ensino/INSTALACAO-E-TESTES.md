# Ensino — instalar e testar em casa

Guia para rodar o projeto Spring Boot **ensino** no seu computador e testar a API (navegador ou Postman).

---

## 1. O que você precisa instalar

| Ferramenta | Motivo |
|------------|--------|
| **JDK 17 ou superior** | Spring Boot 3.x **não** roda com Java 8. Baixe em [Adoptium (Temurin)](https://adoptium.net/) ou use o instalador da Oracle. |
| **MySQL Server** (porta 3306) | O projeto usa MySQL, não H2 (config atual). |
| **Git** (opcional) | Se for clonar o repositório. |

**Maven:** não é obrigatório instalar à mão; o projeto inclui o **Maven Wrapper** (`mvnw.cmd` no Windows).

### Conferir o Java

Abra um **novo** terminal após instalar o JDK:

```bash
java -version
```

Deve aparecer **17**, **21**, etc. Se aparecer **1.8**, ajuste `JAVA_HOME` e o `Path` do Windows para apontar ao JDK novo **antes** do Java 8.

---

## 2. Obter o código

Entre na pasta do projeto (onde existem `pom.xml` e `mvnw.cmd`):

```text
...\ProgramaçãoWebJava\ensino
```

Se o projeto estiver em outro caminho no seu PC, use a pasta que contém esses arquivos.

---

## 3. Banco de dados MySQL

1. Inicie o serviço **MySQL** (Workbench ou serviço do Windows).
2. Conecte com o mesmo usuário/senha que você vai colocar no `application.properties` (padrão do projeto abaixo).
3. Execute no Workbench (ou cliente SQL):

```sql
CREATE DATABASE IF NOT EXISTS ensino
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

As **tabelas** são criadas/atualizadas pelo JPA na primeira subida da aplicação (`spring.jpa.hibernate.ddl-auto=update`).

### Credenciais padrão no projeto

Arquivo: `src/main/resources/application.properties`

| Configuração | Valor padrão |
|--------------|--------------|
| URL | `jdbc:mysql://localhost:3306/ensino` |
| Usuário | `root` |
| Senha | `123456` |

Se a senha do seu `root` for outra, altere `spring.datasource.password` nesse arquivo (ou use variáveis de ambiente, se preferir).

---

## 4. Subir a aplicação

Na pasta `ensino`, no **PowerShell** ou **CMD**:

```bash
.\mvnw.cmd spring-boot:run
```

Na primeira execução o wrapper pode baixar o Maven; espere terminar.

**IDE:** abra a classe `EnsinoApplication` e use **Run** no método `main` (com o JDK do projeto em 17+).

### Porta

Não há `server.port` customizado → padrão **8080**.

- Se a porta estiver ocupada, pare o outro programa ou adicione em `application.properties`:  
  `server.port=8081`  
  e use `http://localhost:8081` nos testes abaixo.

---

## 5. Saber se subiu certo

No console deve aparecer algo como **Started EnsinoApplication** sem erro de conexão com o MySQL.

Erros comuns:

- **Access denied / Communications link failure** → MySQL desligado, senha errada ou banco `ensino` inexistente.
- **class file has wrong version** → ainda está compilando/rodando com **Java 8**; use JDK 17+.

---

## 6. Testar a API

Com a aplicação **rodando**, use navegador ou Postman.

Base: `http://localhost:8080`

| Objetivo | Método | URL |
|----------|--------|-----|
| Listar cursos | GET | `/curso` |
| Curso por ID (JSON com DTO: id, titulo, professor) | GET | `/curso/1` |
| Alunos de um curso | GET | `/curso/1/alunos` |
| Listar professores | GET | `/professor` |
| Professor por ID (JSON com DTO e lista de cursos) | GET | `/professor/1` |
| Criar professor | POST | `/professor` (corpo JSON) |
| Criar curso vinculado a professor | POST | `/curso/{professorId}` (corpo JSON do curso) |

**Observação:** no código o recurso está em **`/curso`** (singular), não `/cursos`.

Troque `1` por IDs que existam no seu banco após cadastros. Se a lista estiver vazia, cadastre dados pelo POST ou pelo Workbench conforme o modelo da aplicação.

### Postman

1. Nova requisição → método **GET**.
2. URL: `http://localhost:8080/curso/1`.
3. **Send**. A resposta deve ser JSON.

Para POST, defina **Body → raw → JSON** e o `Content-Type` costuma ser `application/json` (Postman define ao escolher JSON).

---

## 7. Checklist rápido

- [ ] `java -version` → 17 ou superior  
- [ ] MySQL rodando e banco `ensino` criado  
- [ ] `spring.datasource.password` igual à senha real do MySQL  
- [ ] `.\mvnw.cmd spring-boot:run` na pasta `ensino`  
- [ ] Testar `http://localhost:8080/curso` no navegador ou Postman  

Pronto. Se algo falhar, copie a **mensagem de erro completa** do terminal ou do Postman para comparar com os itens acima.
