#include <stdio.h>
#include <conio.h>

#define TF 10

//4.	Ler um vetor C de 10 elementos inteiros, trocar todos os valores negativos do vetor C por 0. Escrever o vetor C modificado.

void carregar_vetor(int vetor[TF]){
	int i, num;
	printf("\n\n<<<Carrregar Vetor>>>\n\n");
	for (i=0; i<TF; i++){
		printf("Informe Vetor[%d]: ", i);
		scanf("%d", &num);
		if(num < 0){
			vetor[i] = 0;
		}
		else{
			vetor[i] = num;
		}
	}
}

void exibir_vetor(int vetor[TF]){
	int i;
	printf("\n\nExibir Vetor>>>\n\n");
	for(i=0; i<TF; i++){
		printf("\nVetor [%d] = %d", i, vetor[i]);
	}
}

void main(){
	int vetor[TF];
	carregar_vetor(vetor);
	exibir_vetor(vetor);		
}
