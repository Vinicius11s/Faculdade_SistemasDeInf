#include <stdio.h>
#include<conio.h>

//2 - Escreva um procedimento que leia seu nome e após a leitura e exiba o nome lido. 
//Este procedimento deverá ser chamado através do programa principal.

void exibir_nome(){
	char nome[50];
	printf("Informe seu nome: ");
	scanf("%s",nome);
	printf("Nome Lido: %s", nome);
	
}

void main(){
	exibir_nome();
}
