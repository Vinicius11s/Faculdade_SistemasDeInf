# Como testar o projeto biblioteca-api em casa

Guia rápido para subir a API, conferir o banco e chamar os endpoints.

## 1. O que você precisa instalado

| Ferramenta | Observação |
|------------|------------|
| **JDK 17** (ou superior compatível com Spring Boot 4) | `java -version` no terminal |
| **Maven** | `mvn -version` no terminal |
| **MySQL** rodando (ex.: porta **3306**) | Serviço ativo antes de iniciar a aplicação |

Se o `mvn` ou o `java` não forem reconhecidos, configure o **PATH** do sistema ou use o JDK/Maven que a IDE (IntelliJ, Eclipse, VS Code) já aponta.

## 2. Banco de dados

1. Inicie o serviço do **MySQL**.
2. Abra `src/main/resources/application.properties` e confira:
   - **URL** — padrão: `localhost:3306`, banco `biblioteca_db` (pode ser criado automaticamente se a URL tiver `createDatabaseIfNotExist=true`).
   - **Usuário e senha** — por padrão está `root` com senha vazia; **ajuste** se o seu MySQL for diferente.

Na primeira execução, o Hibernate com `ddl-auto=update` cria/atualiza as tabelas (`autores`, `categorias`, `livros`, `livro_categoria`).

## 3. Subir a aplicação

No diretório do projeto (`api-java`):

```bash
mvn clean spring-boot:run
```

Aguarde a mensagem indicando que o Spring Boot subiu (geralmente na porta **8080**).

- Para parar: `Ctrl+C` no terminal.

## 4. Testar sem Postman (terminal)

Substitua a URL se você mudar host/porta. Exemplos com **curl** (Git Bash, WSL ou terminal com curl no Windows).

### 4.1 Health implícito — listar (deve retornar `[]` se estiver vazio)

```bash
curl -s http://localhost:8080/api/categorias
curl -s http://localhost:8080/api/autores
curl -s http://localhost:8080/api/livros
```

### 4.2 Criar uma categoria

**curl** (Git Bash, WSL ou CMD em uma linha):

```bash
curl -s -X POST http://localhost:8080/api/categorias -H "Content-Type: application/json" -d "{\"nome\":\"Tecnologia\"}"
```

No **PowerShell**:

```powershell
Invoke-RestMethod -Method Post -Uri "http://localhost:8080/api/categorias" -ContentType "application/json" -Body '{"nome":"Tecnologia"}'
```

Anote o **`id`** retornado no JSON (ex.: `1`).

### 4.3 Criar um autor

```bash
curl -s -X POST http://localhost:8080/api/autores -H "Content-Type: application/json" -d "{\"nome\":\"Robert C. Martin\",\"paisOrigem\":\"EUA\"}"
```

### 4.4 Criar um livro

Use o **`id` do autor** e, se quiser, uma lista de **`id`s de categorias** (troque `1` pelos ids que você criou):

```bash
curl -s -X POST http://localhost:8080/api/livros -H "Content-Type: application/json" -d "{\"titulo\":\"Clean Code\",\"isbn\":\"9780132350884\",\"anoPublicacao\":2008,\"autorId\":1,\"categoriaIds\":[1]}"
```

### 4.5 Buscar por id

```bash
curl -s http://localhost:8080/api/livros/1
```

### 4.6 Atualizar (PUT)

```bash
curl -s -X PUT http://localhost:8080/api/livros/1 -H "Content-Type: application/json" -d "{\"titulo\":\"Clean Code (atualizado)\",\"isbn\":\"9780132350884\",\"anoPublicacao\":2008,\"autorId\":1,\"categoriaIds\":[1]}"
```

### 4.7 Remover (DELETE)

```bash
curl -s -X DELETE http://localhost:8080/api/livros/1 -w "\nHTTP %{http_code}\n"
```

Esperado: código **204** sem corpo.

## 5. O que esperar quando der erro (API tratada)

| Situação | HTTP aproximado | Exemplo de causa |
|----------|-----------------|------------------|
| Id inexistente | **404** | `GET /api/livros/9999` |
| ISBN duplicado ou regra de negócio | **409** | Dois livros com o mesmo ISBN |
| JSON inválido ou validação (`@Valid`) | **400** | Título vazio, ISBN fora do tamanho, etc. |

O corpo costuma vir no formato **`ErroResponse`** (timestamp, status, mensagem, path, lista de erros por campo quando for validação).

## 6. Testes automatizados (Maven)

Os testes usam **H2 em memória** (`src/test/resources/application.properties`), **sem precisar do MySQL**:

```bash
mvn test
```

## 7. Checklist rápido se não subir

1. MySQL **ligado** e usuário/senha corretos no `application.properties`.
2. **JDK 17+** (Spring Boot 4 não usa Java 8).
3. Porta **8080** livre (ou altere com `server.port=9090` no `application.properties`).
4. Veja o **stack trace** no terminal: erro de conexão JDBC quase sempre é URL, usuário ou senha.

## 8. Endpoints resumidos

| Método | Caminho | Ação |
|--------|---------|------|
| GET | `/api/autores` | Lista autores |
| GET | `/api/autores/{id}` | Busca autor |
| POST | `/api/autores` | Cria autor |
| PUT | `/api/autores/{id}` | Atualiza autor |
| DELETE | `/api/autores/{id}` | Remove autor (sem livros vinculados) |
| GET/POST/PUT/DELETE | `/api/categorias` e `/api/categorias/{id}` | Idem para categorias |
| GET/POST/PUT/DELETE | `/api/livros` e `/api/livros/{id}` | Idem para livros |

Bons testes.
