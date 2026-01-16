#include <stdio.h>
#include <conio.h>

#define TF 2

//4.Foi realizada uma pesquisa entre 5 habitantes de uma certa região.
//De cada habitante foram coletados os dados: idade, sexo(1-masculino 2- feminino), salário e número de filhos.
//Crie a estrutura de dados adequada para armazenar estas informações e faça uma
//função que armazene as informações digitadas pelo usuário na estrutura de dados
//criada. Faça também uma função que calcula a média do salário dos habitantes.

struct pesquisa{
	int idade;
	int sexo;
	float salario;
	int filhas;
};

void carregar_registro(struct pesquisa reg_hab[TF]){
	int i;
	printf("<<<Leitura>>>");
	for(i=0; i<TF; i++){
		printf("\n\nRegistro Pesquisa [%d]", i);
		
		printf("\nInforme a Idade: ");
		scanf("%d", &reg_hab[i].idade);
		
		
		do{
			printf("Informe o Sexo (1-F ; 2-M): ");
			scanf("%d", &reg_hab[i].sexo);	
		}while(reg_hab[i].sexo != 1 && reg_hab[i].sexo != 2);
		
		printf("Informe o Salario: ");
		scanf("%f", &reg_hab[i].salario);
		
		printf("Informe o Numero de Filhas: ");
		scanf("%d", &reg_hab[i].filhas);
	}
}

void exibir_registro(struct pesquisa reg_hab[TF]){
	int i;
	printf("\n\n<<<Exibicao>>>");
	for(i=0; i<TF; i++){
		printf("\n\nRegistro[%d]", i);
		
		printf("\nIdade: %d", reg_hab[i].idade);
		printf("\nSexo: %d", reg_hab[i].sexo);
		printf("\nSalaraio: %0.2f", reg_hab[i].salario);
		printf("\nNumero de Filhas %d", reg_hab[i].filhas);
	}
}


void media_salario(struct pesquisa reg_hab[TF]){
	int acumulador = 0, cont = 0, i;
	float media;
	
	for(i=0; i<TF; i++){
		acumulador += reg_hab[i].salario;
		cont++;
	}	
	media = acumulador / cont;
	printf("\n\n\nMedia de Salarios: %0.2f", media);
}


void main(){
	struct pesquisa reg_hab[TF];
	carregar_registro(reg_hab);
	exibir_registro(reg_hab);
	media_salario(reg_hab);
	
}
