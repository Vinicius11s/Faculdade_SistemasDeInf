#include <stdio.h>
#include <conio.h>

//9.Escreva um algoritmo que leia 50 valores para um vetor de 50 posições.
//Mostre depois somente os positivos.

	
void main(){
	int i, cont = 0;
	float valor[50], positivos[50];
	
	printf("<<<Este algoritmo verifica os valores positivos digitados e mostra os>>>\n");
	
	printf("\nDigite 50 valores: \n");
	for(i=0 ; i<50 ; i++){
		printf("%d: ",i + 1);
		scanf("%f", &valor[i]);
		
		if(valor[i] >= 0){
			positivos[i] = valor[i];
			cont++;
		}
	}
	printf("\nValores positivos digitados: ");
	for(i=0 ; i < cont ; i++){
		printf("\n%0.2f", positivos[i]);
	}
}
