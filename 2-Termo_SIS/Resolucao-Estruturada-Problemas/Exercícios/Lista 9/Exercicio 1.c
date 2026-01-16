#include <stdio.h>
#include <conio.h>

#define TF 5

//1.	Carregar um vetor X de 10 elementos com o valores de 10 em 10 e exibi-lo no final.


void carregar_vetor(int vetor[TF]){
	int i;
	printf("\n\n<<<Carrregar Vetor>>>\n\n");
	
	for (i=0; i<TF; i++){
	vetor[i] = i * 10 + 10;}
}

void exibir_vetor(int vetor[TF]){
	int i;
	printf("\n\nExibir Vetor>>>\n\n");
	
	for(i=0; i<TF; i++){
		printf("\nVetor [%d] = %d", i, vetor[i]);}
}

void main(){
	int vetor[TF];
	carregar_vetor(vetor);
	exibir_vetor(vetor);	
	
	
}
