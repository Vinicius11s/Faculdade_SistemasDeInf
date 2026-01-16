#include <stdio.h>
#include <conio.h>

#define TF 10

//4.	Fazer um programa em "C" que lê um conjunto de 10 valores inteiros e verifica se algum dos valores é igual à média dos mesmos.
	
void main(){
	int encontrado = 0, soma, i, valor[TF];
	float media;
	printf("<<<Este algoritmo recebe 10 numeros e verifica se algum valor corresponde a média dos mesmos>>>\n");
	printf("<<<Informe somente Valores Inteiros>>>\n\n");
	
	for(i=0; i<TF; i++){
		printf("Informe o valor %d: ", i+1);
		scanf("%d", &valor[i]);
		soma += valor[i];
	}	
	media = soma / TF;
	
	for(i=0; i<TF; i++){
		if(valor[i] == media){
			encontrado = 1;
			break;	
		}
		else{
		}
	}
	if(encontrado == 1){
		printf("\n\nPelo menos um valor e igual a media dos valores: \n %0.2f", media);
	}
	else{
		printf("\n\nNenhum valor digitado e igual a media.");
	}
	
	
}
