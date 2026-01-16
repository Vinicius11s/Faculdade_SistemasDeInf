#include <stdio.h>
#include <conio.h>

#define TF 10

//7.	Escreva um algoritmo que leia dois vetores de 10 posições e faça a
//multiplicação dos elementos de mesmo índice, colocando o resultado em um terceiro vetor.
//Mostre o vetor resultante.

	
void main(){
	float vetor_um[TF], vetor_dois[TF],resultado[TF];
	int i;
	printf("<<<Este algoritmo multipliica somente elementos de mesmo indice>>>\nDigite somente numeros inteiros\n\n");
	
	printf("Informe os elementos do Vetor Um\n");
	for(i=0;i<TF;i++){
		printf("Valor %d: ", i + 1);	
		scanf("%f", &vetor_um[i]);
	}
	
	
	printf("\n\nInforme os elementos do vetor Dois\n");
	for(i=0;i<TF;i++){
		printf("Valor %d: ", i + 1);
		scanf("%f", &vetor_dois[i]);
	}
	
	
	for (i = 0; i<TF; i++) {
        resultado[i] = vetor_um[i] * vetor_dois[i];
    }
    
    printf("\nVetor resultado da multiplicacao: ");
    for(i=0; i<TF; i++){
    	printf(" \n%0.2f ", resultado[i]);
	}		
}
	
