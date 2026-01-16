#include <stdio.h>
#include <conio.h>

#define TF 5

//3.Fazer um programa que cria uma estrutura livro, que contém os elementos título,
//ano de edição, número de páginas e preço. Criar uma variável desta estrutura que é
//um vetor de 5 elementos. Ler os valores para a estrutura e imprimir a média do número de páginas dos livros.

struct livro{
	char titulo[20];
	int ano;
	int paginas;
	float preco;
};

void carregar_registro(struct livro reg_livro[TF]){
	int i;
	printf("<<<Leitura>>>");
	for(i=0; i<TF; i++){
		printf("\n\nRegistro Livro [%d]", i);
		
		printf("\nInforme o Titulo: ");
		fflush(stdin);
		gets(reg_livro[i].titulo);
		
		printf("Informe o Ano de Edicao: ");
		scanf("%d", &reg_livro[i].ano);
		
		printf("Informe o numero de Paginas: ");
		scanf("%d", &reg_livro[i].paginas);
		
		printf("Informe o Preco: ");
		scanf("%f", &reg_livro[i].preco);
	}
}

void exibir_registro(struct livro reg_livro[TF]){
	int i;
	printf("\n\n<<<Exibicao>>>");
	for(i=0; i<TF; i++){
		printf("\n\nRegistro[%d]", i);
		
		printf("\nTitulo: %s", reg_livro[i].titulo);
		printf("\nAno de Edicao:: %d", reg_livro[i].ano);
		printf("\nNumero de Paginas: %d", reg_livro[i].paginas);
		printf("\nPreco: %0.2f", reg_livro[i].preco);

	}
}


void media_paginas(struct livro reg_livro[TF]){
	int acumulador = 0, cont = 0, i;
	float media;
	
	for(i=0; i<TF; i++){
		acumulador += reg_livro[i].paginas;
		cont++;
	}	
	media = acumulador / cont;
	printf("\nMedia de Paginas dos Livros: %0.2f", media);
}


void main(){
	struct livro reg_livro[TF];
	carregar_registro(reg_livro);
	exibir_registro(reg_livro);
	media_paginas(reg_livro);
	
}
