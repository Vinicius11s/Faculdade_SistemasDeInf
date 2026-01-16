from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, field_validator
from typing import List, Optional
from datetime import datetime
from enum import Enum

app = FastAPI()

class TipoAtendimento(str, Enum):
    NORMAL = "N"
    PRIORITARIO = "P"

class ClienteRequest(BaseModel):
    nome: str = Field(..., max_length=20)
    tipo_atendimento: TipoAtendimento
    
    @field_validator('nome')
    @classmethod
    def validar_nome(cls, v):
        if not v or not v.strip():
            raise ValueError("Informe um nome de até 20 caracteres")
        if len(v.strip()) > 20:
            raise ValueError("Informe um nome de até 20 caracteres")
        return v.strip()

class ClienteResponse(BaseModel):
    posicao: int
    nome: str
    data_chegada: datetime
    atendido: bool

class FilaService:
    def __init__(self):
        self.clientes: List[dict] = []
        self.contador_id = 1

    def adicionar_cliente(self, nome: str, tipo: str) -> dict:
        cliente = {
            "id": self.contador_id,
            "nome": nome,
            "tipo_atendimento": tipo,
            "data_chegada": datetime.now(),
            "atendido": False
        }
        
        self.clientes.append(cliente)
        
        nao_atendidos = [c for c in self.clientes if not c["atendido"]]
        prioritarios = [c for c in nao_atendidos if c["tipo_atendimento"] == "P"]
        normais = [c for c in nao_atendidos if c["tipo_atendimento"] == "N"]
        
        atendidos = [c for c in self.clientes if c["atendido"]]
        self.clientes = prioritarios + normais + atendidos
        
        self.contador_id += 1
        self._reorganizar_posicoes()
        return cliente

    def _reorganizar_posicoes(self):
        nao_atendidos = [c for c in self.clientes if not c["atendido"]]
        for idx, cliente in enumerate(nao_atendidos, start=1):
            cliente["posicao"] = idx

    def obter_fila(self) -> List[dict]:
        nao_atendidos = [c for c in self.clientes if not c["atendido"]]
        self._reorganizar_posicoes()
        return nao_atendidos

    def obter_cliente_por_posicao(self, posicao: int) -> Optional[dict]:
        nao_atendidos = [c for c in self.clientes if not c["atendido"]]
        self._reorganizar_posicoes()
        for cliente in nao_atendidos:
            if cliente["posicao"] == posicao:
                return cliente
        return None

    def avancar_fila(self):
        nao_atendidos = [c for c in self.clientes if not c["atendido"]]
        if not nao_atendidos:
            return None
        
        primeiro = nao_atendidos[0]
        cliente_atendido = {
            "nome": primeiro["nome"],
            "posicao_anterior": primeiro["posicao"]
        }
        
        if primeiro["posicao"] == 1:
            primeiro["atendido"] = True
            primeiro["posicao"] = 0
        
        self._reorganizar_posicoes()
        return cliente_atendido

    def remover_cliente(self, posicao: int) -> bool:
        nao_atendidos = [c for c in self.clientes if not c["atendido"]]
        self._reorganizar_posicoes()
        
        cliente_remover = None
        for cliente in nao_atendidos:
            if cliente["posicao"] == posicao:
                cliente_remover = cliente
                break
        
        if cliente_remover:
            self.clientes.remove(cliente_remover)
            self._reorganizar_posicoes()
            return True
        return False

fila_service = FilaService()

@app.get("/fila", response_model=List[ClienteResponse])
def obter_fila():
    fila = fila_service.obter_fila()
    return fila if fila else []

@app.get("/fila/{id}", response_model=ClienteResponse)
def obter_cliente_por_posicao(id: int):
    cliente = fila_service.obter_cliente_por_posicao(id)
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente não encontrado na posição especificada")
    return cliente

@app.post("/fila", response_model=ClienteResponse, status_code=201)
def adicionar_cliente(cliente: ClienteRequest):
    novo_cliente = fila_service.adicionar_cliente(cliente.nome, cliente.tipo_atendimento.value)
    return novo_cliente

@app.put("/fila")
def avancar_fila():
    resultado = fila_service.avancar_fila()
    if resultado is None:
        return {"message": "Fila vazia", "cliente_atendido": None, "fila_atual": []}
    
    fila_atual = fila_service.obter_fila()
    return {
        "message": "Fila avançada",
        "cliente_atendido": resultado["nome"],
        "posicao_anterior": resultado["posicao_anterior"],
        "fila_atual": fila_atual
    }

@app.delete("/fila/{id}")
def remover_cliente(id: int):
    removido = fila_service.remover_cliente(id)
    if not removido:
        raise HTTPException(status_code=404, detail="Cliente não encontrado na posição especificada")
    return {"message": "Cliente removido da fila"}

