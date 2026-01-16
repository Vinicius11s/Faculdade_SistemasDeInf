#include <stdio.h>
#include <conio.h>
#include <string.h>


//4.	Faça um programa que leia uma string do teclado e diga se ela é palíndrome.
//Uma string é palíndrome quando pode ser lida tanto de trás pra frente quanto de frente
//para trás e possui exatamente a mesma seqüência de caracteres. Ex.: ASA, SUBI NO ONIBUS.
//Desconsidere os espaços. Defina uma função chamada Palindrome que receba uma string como
//parâmetro e retorne sim ou não no seu programa. Dica: Use a função do exercício 1. 


char inverter_texto(char texto_copia[2000]){
	int i, j, fim;
	char aux;
	
	fim = strlen(texto_copia);
	
	for(i=0, j=fim - 1; i<j ; i++, j--){
		aux = texto_copia[i];
		texto_copia[i] = texto_copia[j];
		texto_copia[j] = aux;
	}
}

void main(){
	char texto_original[2000], texto_copia[2000];;
	
	printf("Informe uma frase: ");
	gets(texto_original);	
	strcpy(texto_copia, texto_original); 
	inverter_texto(texto_copia);
	
	if(strcmp(texto_original, texto_copia) == 0){
		printf("O Texto digitado eh Palindrome!");
	}
	else{
		printf("O Texto digitado nao eh Palindrome!");
	}
	
	
}
