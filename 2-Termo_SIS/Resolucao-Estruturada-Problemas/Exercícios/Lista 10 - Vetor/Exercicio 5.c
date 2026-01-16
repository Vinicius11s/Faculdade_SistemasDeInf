#include <stdio.h>
#include <conio.h>

#define TF 30

//5.Elaborar um algoritmo que lê um conjunto de 30 valores e os colocar em 2 vetores conforme estes valores forem pares ou ímpares.
//O tamanho do vetor é de 5 posições.
//Se algum vetor estiver cheio, escrevê-lo. Terminada a leitura escrever o conteúdo dos dois vetores. 
	
void main(){
	int i,valores[TF], vetorPares[5], vetorImpares[5], contPares = 0, contImpares = 0;
	
	printf("Digite 30 Valores: \n");
	for(i = 0; i < TF; i++){
		scanf("%d", &valores[i]);		
		
		if(valores[i] % 2 == 0){
			if(contPares < 5){
				vetorPares[contPares] = valores[i];
				contPares++;
			}
			else{
				printf("\nO Vetor de Valores Pares esta cheio!");
			}
		}
		else{
			if(contImpares < 5){
				vetorImpares[contImpares] = valores[i];
				contImpares++;
			}
			else{
				printf("\nO Vetor de Valores Impares esta cheio!");
			}
		}
	}
	printf("\n Valores no vetor Pares: ");
	for(i=0; i<contPares; i++){
		printf("\n%d", vetorPares[i]);
	}
	
	printf("\n Valores no vetor Impares: ");
	for(i=0; i<contImpares; i++){
		printf("\n%d", vetorImpares[i]);
	}
}
