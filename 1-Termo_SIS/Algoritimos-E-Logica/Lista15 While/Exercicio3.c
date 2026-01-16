#include <stdio.h>
#include <conio.h>

/*Escreva um algoritmo que leia seu nome e em uma segunda variável leia seu sobrenome 
e ao final exiba seu nome concatenado com seu sobrenome.*/

void main(){
	char nome[100];
	char sobrenome[100];
		printf("Informe seu nome: ");
		scanf("%s", nome);
		printf("Informe seu sobrenome: ");
		scanf("%s", sobrenome);
		printf("Nome informado: %s %s", nome, sobrenome);
	
	
}
