#include <stdio.h>
#include <conio.h>

#define TF 2

//1.Criar uma estrutura chamada DadosAluno, que armazena a média e idade de um aluno.
//Na função main: criar uma variável que é uma estrutura DadosAluno; ler a média e a
//idade de um aluno e armazenar na variável criada; exibir na tela a média e a idade do aluno.

struct DadosAluno{
	float media;
	int idade;
};

void carregar_registro(struct DadosAluno reg_aluno[TF]){
	int i;
	printf("<<<Leitura>>>");
	for(i=0; i<TF; i++){
		printf("\n\nRegistro[%d]", i);
		
		printf("\nInforme a Media: ");
		scanf("%f", &reg_aluno[i].media);
		
		printf("Informe o Idade: ");
		scanf("%f", &reg_aluno[i].idade);
	}
}

void exibir_registro(struct DadosAluno reg_aluno[TF]){
	int i;
	printf("\n\n<<<Exibicao>>>");
	for(i=0; i<TF; i++){
		printf("\n\nRegistro[%d]", i);
		
		printf("\nMedia: %0.2f", reg_aluno[i].media);
		
		printf("\nIdade: %d", reg_aluno[i].idade);
	}
}


void main(){
	struct DadosAluno reg_aluno[TF];
	carregar_registro(reg_aluno);
	exibir_registro(reg_aluno);
	
}
