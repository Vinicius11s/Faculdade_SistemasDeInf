#include <stdio.h>
#include <conio.h>
#include <string.h>

#define TF 5

//1	Desenvolva um programa que leia e exiba um vetor registro conforme o modelo abaixo:
//nome
//salário
//cpf
//idade
//sexo (1-Masculino; 2-Feminino)
//m base no modelo acima crie um programa que contenha um vetor de registros com 5 posições e faça:
//	Criar um procedimento que leia os registros. 
//	Criar um procedimento que exiba todos os registros. 
//	Criar uma função que calcule a média salarial.
//	Criar uma função que retorne o maior salário.
//	Criar uma função que retorne à quantidade de pessoas do sexo feminino

struct registro{
	char nome[50];
	float salario;
	char cpf[50];
	int idade;
	int sexo;
};

void carregar_registro(struct registro reg_pessoas[TF]){
	int i;
	printf("<<<Informe os seus dados: >>>");
	for(i=0; i<TF; i++){
		printf("\n\nRegistro %d", i);
		fflush(stdin);
		printf("\nInforme seu nome: ");
		gets(reg_pessoas[i].nome);
		
		printf("Informe seu salario: ");
		scanf("%f", &reg_pessoas[i].salario);
		
		fflush(stdin);
		printf("Informe seu CPF: ");
		gets(reg_pessoas[i].cpf);
		
		printf("Informe sua Idade: ");
		scanf("%d", &reg_pessoas[i].idade);
		
		do{
			printf("Informe seu sexo (1-M ; 2-F): ");
			scanf("%d", &reg_pessoas[i].sexo);
		}while(reg_pessoas[i].sexo != 1 && reg_pessoas[i].sexo != 2);
	}
}

void exibir_registro(struct registro reg_pessoas[TF]){
	int i;
	printf("<<<\n\nDados Cadastrados: >>>");
	for(i=0; i<TF; i++){
		printf("\n\n\nCadastro %d", i);
		
		printf("\nNome: %s", reg_pessoas[i].nome);
		
		printf("\nSalario: %0.2f ", reg_pessoas[i].salario);
		
		printf("\nCPF: %d", reg_pessoas[i].cpf);
		
		printf("\nIdade: %d", reg_pessoas[i].idade);
		
		if(reg_pessoas[i].sexo == 1){
				printf("\nSexo: Masculino");
		}
		else{
			printf("\nSexo: Feminino");
		}
	}
}

int media_salarial(struct registro reg_pessoas[TF]){
	int i, cont = 0;
	float acumula, media;

	for(i=0; i<TF; i++){
		acumula += reg_pessoas[i].salario;
		cont++;
		media = acumula / cont;
	}
	printf("\n\nMedia salarial dos Cadastrados: %0.2f ", media);
}

float maior_salario(struct registro reg_pessoas[TF]){
	int i;
	float salario_maior;
	
	for(i=0; i<TF; i++){
		if(i == 0){
			salario_maior = reg_pessoas[i].salario; 
		}
		else
		if(reg_pessoas[i].salario > salario_maior){
			salario_maior = reg_pessoas[i].salario;
		}
	}return salario_maior;
}

int quantidade_fem(struct registro reg_pessoas[TF]){
	int i;
	float qtd_fem = 0;
	
	for(i=0; i<TF; i++){
		if(reg_pessoas[i].sexo == 2){
			qtd_fem++;
		}
	}return qtd_fem;
}


void main(){
	struct registro reg_pessoas[TF];
	float salario_maior;
	int qtd_fem;
	
	carregar_registro(reg_pessoas);
	exibir_registro(reg_pessoas);
	media_salarial(reg_pessoas);
	salario_maior = maior_salario(reg_pessoas);
	printf("\n\nO maior salario entre os candidatos eh de: %0.2f", salario_maior);
	qtd_fem = quantidade_fem(reg_pessoas);
	printf("\n\nQuantidade de pessoas do sexo feminino: %d", qtd_fem);
	
	
}
