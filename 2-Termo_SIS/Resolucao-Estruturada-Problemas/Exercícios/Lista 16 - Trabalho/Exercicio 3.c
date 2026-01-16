#include <stdio.h>
#include <conio.h>
#include <string.h>

#define TF 7

/*3.	Criar um algoritmo que armazene os dados das participantes em um concurso de beleza conforme abaixo:
- nome
- altura
- cor preferida (1-branco, 2-vermelho, 3-amarelo, 4-Verde)
- cor dos olhos (1-castanho, 2-preto, 3-azul, 4-verde)
O algoritmo deverá ter as seguintes funcionalidades:
a.	Ler os dados de 7 participantes 
b.	Exibir todos os dadas as participantes
c.	Exibir o nome e a altura da participante mais alta
d.	Exibir o nome e a altura da participante mais baixa
e.	Exibir a média geral das participantes
f.	Exibir quantas participantes estão acima da média
g.	Exibir quantas participantes possuem olhos azul
h.	Exibir a média de altura das participantes que possuem como cor preferida o verde*/


struct dados{
	char nome[50];
	float altura;
	int cor;
	int olhos;
};

void ler_participantes(struct dados reg_part[TF]){
	int i;
	
	printf("<<<Informe os seus dados: >>>");
	
	for(i=0; i<TF; i++){
		printf("\n\nRegistro %d", i);
		fflush(stdin);
		printf("\nInforme seu Nome: ");
		gets(reg_part[i].nome);
		
		printf("Informe sua Altura: ");
		scanf("%f", &reg_part[i].altura);
		
		do{
			printf("\nInforme sua cor Preferida\n");
			printf("(1-branco, 2-vermelho, 3-amarelo, 4-Verde):\n");
			scanf("%d", &reg_part[i].cor);
		}while(reg_part[i].cor != 1 && reg_part[i].cor != 2 && reg_part[i].cor != 3 && reg_part[i].cor != 4);
		
		do{
			printf("\nInforme a cor dos seus Olhos\n");
			printf("(1-castanho, 2-preto, 3-azul, 4-verde):\n");
			scanf("%d", &reg_part[i].olhos);
		}while(reg_part[i].olhos != 1 && reg_part[i].olhos != 2 && reg_part[i].olhos != 3 && reg_part[i].olhos != 4);
	}
}

void exibir_participantes(struct dados reg_part[TF]){
	int i;
	
	printf("<<<\n\nParticipantes Cadastrados: >>>");
	
	for(i=0; i<TF; i++){
		printf("\n\n\nParticipante %d", i);
		
		printf("\nNome: %s", reg_part[i].nome);
		
		printf("\nAltura: %0.2f", reg_part[i].altura);
		
		switch (reg_part[i].cor){
			case 1:
				printf("\nCor preferida: Branco");
			break;
			
			case 2:
				printf("\nCor preferida: Vermelho");
			break;
			
			case 3:
				printf("\nCor preferida: Amarelo");
			break;
			
			case 4:
				printf("\nCor preferida: Verde");
			break;			
		}
		
		switch (reg_part[i].olhos){
			case 1:
				printf("\nCor dos Olhos: Castanho");
			break;
			
			case 2:
				printf("\nCor dos Olhos: Preto");
			break;
			
			case 3:
				printf("\nCor dos Olhos: Azul");
			break;
			
			case 4:
				printf("\nCor dos Olhos: Verde");
			break;			
		}		
	}
}

void participante_maior_altura(struct dados reg_part[TF]){
	int i;
	float altura_maior;
	char nome_altura_maior[100];
	
	for(i=0; i<TF; i++){
		if(i == 0){
			altura_maior = reg_part[i].altura;
			strcpy(nome_altura_maior, reg_part[i].nome);
		}
		else{
			if(reg_part[i].altura > altura_maior){
				altura_maior = reg_part[i].altura;
				strcpy(nome_altura_maior, reg_part[i].nome);
			}
		}
	}printf("\n\n\nA partcipante mais alta foi a %s, com altura de %0.2fm ", nome_altura_maior, altura_maior);
}

void participante_menor_altura(struct dados reg_part[TF]){
	int i;
	float altura_menor;
	char nome_altura_menor[100];
	
	for(i=0; i<TF; i++){
		if(i == 0){
			altura_menor = reg_part[i].altura;
			strcpy(nome_altura_menor, reg_part[i].nome);
		}
		else{
			if(reg_part[i].altura < altura_menor){
				altura_menor = reg_part[i].altura;
				strcpy(nome_altura_menor, reg_part[i].nome);
			}
		}
	}printf("\n\nA partcipante mais baixa foi a %s, com altura de %0.2fm", nome_altura_menor, altura_menor);
}

void media_geral_participantes(struct dados reg_part[TF]){
	int i, cont=0;
	float media_part=0, media_geral;
		
	for(i=0; i<TF; i++){
		media_part += reg_part[i].altura;
		cont++;
	}
	media_geral = media_part / cont;
	printf("\n\nA media dos participantes foi: %0.2f ", media_geral);
}

void acima_media(struct dados reg_part[TF]){
	int i, cont = 0, acima = 0;
	float media_geral, acumula = 0;
	
	for(i=0; i<TF; i++){
		acumula += reg_part[i].altura;
		cont++;
	}
	media_geral = acumula/cont;
	
	for(i=0; i<TF; i++){
		if(reg_part[i].altura > media_geral){
			acima++;
			
		}
	}	
	printf("\n\n  %d Participantes estao acima da Media de altura", acima);
}

void olho_azul(struct dados reg_part[TF]){
	int i, cont = 0, cor = 0;
	
	for(i=0; i<TF; i++){
		if(reg_part[i].cor == 4){
			cor++;
		}
	}	
	printf("\n\n  %d Participantes tem os olhos azuis", cor);
}

void gosta_verde(struct dados reg_part[TF]){
	int i, cont = 0, acumula = 0, azul = 0;
	float media_verde;
	
	for(i=0; i<TF; i++){
		if(reg_part[i].olhos == 3){
			azul++;
			acumula += reg_part[i].altura;
			cont++;
		}
	}
	media_verde = acumula/cont;
	printf("\n\nA media de altura dos Participantes que tem a cor preferida\nverde eh: %0.2f", media_verde);
}

void main(){
	struct dados reg_part[TF];
	float media_geral;
	
	ler_participantes(reg_part);
	exibir_participantes(reg_part);
	participante_maior_altura(reg_part);
	participante_menor_altura(reg_part);
	media_geral_participantes(reg_part);
	acima_media(reg_part);
	olho_azul(reg_part);
	gosta_verde(reg_part);
}
