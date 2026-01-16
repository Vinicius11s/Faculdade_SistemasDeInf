#include <stdio.h>
#include <conio.h>

#define TF 5

//3.	Preencher um vetor B de 5 elementos com 1 se o numero informado pelo usuário ímpar e com 0 se for par. Escrever o vetor B após o seu total preenchimento.

void carregar_vetor(int vetor[TF]){
	int i, num;
	printf("\n\n<<<Carrregar Vetor>>>\n\n");
	for (i=0; i<TF; i++){
		printf("Informe Vetor[%d]: ", i);
		scanf("%d", &num);
		if(num %2 == 1){
			vetor[i] = 1;
		}
		else{
			vetor[i] = 0;
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
