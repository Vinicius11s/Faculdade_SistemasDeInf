#include <stdio.h>
#include <conio.h>
#include <string.h>

#define TF 5

//2.	Criar um algoritmo que que armazene os dados dos alunos de uma determinada turma conforme abaixo:
//- nome
//- número de faltas
//- nota1
//- nota2
//- média (a média deverá ser calcula pelo programa)
//O algoritmo deverá ter as seguintes funcionalidades:
//a.	Ler uma turma de 5 alunos
//b.	Exibir todos os dados dos alunos lidos
//c.	Exibir o nome e a nota do aluno com maior média
//d.	Exibir o nome e a nota do aluno com menor média
//e.	Exibir a média geral da turma
//f.	Exibir quantos alunos possuem média >= 7
//g.	Exibir quantos alunos estão abaixo da média 7
//h.	Exibir quantos alunos possuem mais que 20 faltas


struct dados{
	char nome[50];
	int faltas;
	float nota1;
	float nota2;
	float media;
};

void ler_alunos(struct dados reg_alunos[TF]){
	int i;
	printf("<<<Informe os seus dados: >>>");
	for(i=0; i<TF; i++){
		printf("\n\nRegistro %d", i);
		fflush(stdin);
		printf("\nInforme seu Nome: ");
		gets(reg_alunos[i].nome);
		
		printf("Informe suas Faltas: ");
		scanf("%d", &reg_alunos[i].faltas);
		
		printf("Informe sua primeira Nota: ");
		scanf("%f", &reg_alunos[i].nota1);
		
		printf("Informe sua segunda Nota: ");
		scanf("%f", &reg_alunos[i].nota2);
		
		reg_alunos[i].media = (reg_alunos[i].nota1 + reg_alunos[i].nota2) / 2;
	}
}

void exibir_alunos(struct dados reg_alunos[TF]){
	int i;
	printf("<<<\n\nAlunos Cadastrados: >>>");
	for(i=0; i<TF; i++){
		printf("\n\n\nAluno %d", i);
		
		printf("\nNome: %s", reg_alunos[i].nome);
		
		printf("\nFaltas: %d", reg_alunos[i].faltas);
		
		printf("\nNota 1: %0.2f", reg_alunos[i].nota1);
		
		printf("\nNota 2: %0.2f", reg_alunos[i].nota2);
		
		printf("\nMedia das Notas: %0.2f", reg_alunos[i].media);
	}
}

void aluno_maior_media(struct dados reg_alunos[TF]){
	int i;
	float media_maior;
	char nome_media_maior[100];
	
	for(i=0; i<TF; i++){
		if(i == 0){
			media_maior = reg_alunos[i].media;
			strcpy(nome_media_maior, reg_alunos[i].nome);
		}
		else{
			if(reg_alunos[i].media > media_maior){
				media_maior = reg_alunos[i].media;
				strcpy(nome_media_maior, reg_alunos[i].nome);
			}
		}
	}printf("\n\n\nO aluno com maior media foi o %s, com media de %0.2f ", nome_media_maior, media_maior);
}

void aluno_menor_media(struct dados reg_alunos[TF]){
	int i;
	float media_menor;
	char nome_media_menor[100];
	
	for(i=0; i<TF; i++){
		if(i == 0){
			media_menor = reg_alunos[i].media;
			strcpy(nome_media_menor, reg_alunos[i].nome);
		}
		else{
			if(reg_alunos[i].media < media_menor){
				media_menor = reg_alunos[i].media;
				strcpy(nome_media_menor, reg_alunos[i].nome);
			}
		}
	}printf("\n\nO aluno com Menor media foi o %s, com media de %0.2f ", nome_media_menor, media_menor);
}

void media_geral_turma(struct dados reg_alunos[TF]){
	int i, cont=0;
	float media_turma=0, media_geral;
		
	for(i=0; i<TF; i++){
		media_turma += reg_alunos[i].media;
		cont++;
	}
	media_geral = media_turma / cont;
	printf("\n\nA media da turma foi: %0.2f ", media_geral);
}

void maior_igual_media7(struct dados reg_alunos[TF]){
	int i, cont=0;
		
	for(i=0; i<TF; i++){
		if(reg_alunos[i].media >= 7){
		cont++;
		}
	}printf("\n\n %d Alunos possuem a media maior ou igual a 7", cont);
}

void abaixo_media_7(struct dados reg_alunos[TF]){
	int i, cont=0;
		
	for(i=0; i<TF; i++){
		if(reg_alunos[i].media < 7){
		cont++;
		}
	}printf("\n\n %d Alunos possuem a media abaixo de 7", cont);
}

void maior_20_faltas(struct dados reg_alunos[TF]){
	int i, cont=0;
		
	for(i=0; i<TF; i++){
		if(reg_alunos[i].faltas > 20){
		cont++;
		}
	}printf("\n\n %d Alunos possuem um numero maior que 20 faltas", cont);
}


void main(){
	struct dados reg_alunos[TF];
	
	ler_alunos(reg_alunos);
	exibir_alunos(reg_alunos);
	aluno_maior_media(reg_alunos);
	aluno_menor_media(reg_alunos);
	media_geral_turma(reg_alunos);
	maior_igual_media7(reg_alunos);
	abaixo_media_7(reg_alunos);
	maior_20_faltas(reg_alunos);
	
}
