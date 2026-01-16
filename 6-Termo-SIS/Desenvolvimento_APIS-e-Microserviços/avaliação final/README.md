# API Fila de Atendimento

API desenvolvida para gerenciamento de fila de atendimento presencial.

## Instalação

```bash
pip install -r requirements.txt
```

## Execução

```bash
uvicorn main:app --reload
```

## Endpoints

- `GET /fila` - Lista todos os clientes na fila
- `GET /fila/{id}` - Obtém cliente por posição
- `POST /fila` - Adiciona novo cliente
- `PUT /fila` - Avança a fila
- `DELETE /fila/{id}` - Remove cliente da fila

