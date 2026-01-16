#include <stdio.h>
#include <conio.h>
#include <string.h>

//3.	Faça um procedimento que receba uma string e a retorne escrita de trás pra frente.  

char inverter_texto(char nome[2000]){
	int i, j, fim;
	char aux;
	
	fim = strlen(nome);
	
	for(i=0, j=fim - 1; i<j ; i++, j--){
		aux = nome[i];
		nome[i] = nome[j];
		nome[j] = aux;
	}
}

void main(){
	char nome[2000];
	printf("Informe seu nome: ");
	gets(nome);	
	inverter_texto(nome);
		
	printf("Texto Invertido >> %s", nome);
}
