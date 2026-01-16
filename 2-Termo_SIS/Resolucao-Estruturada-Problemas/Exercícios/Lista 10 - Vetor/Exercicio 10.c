#include <stdio.h>
#include <conio.h>

//10.	Faça um algoritmo que leia um vetor de 500 posições de números e dívida todos os seus
//elementos pelo maior valor do vetor. Mostre o vetor após os cálculos.

	
void main(){
	int i;
	float vetor[500], maior = 0;
	printf("<<<Este algoritmo que le um vetor de 500 posições e divide todos os seus elementos pelo maior valor do vetor>>>\n");
	
	printf("\nDigite 5 valores: \n");
	for(i=0 ; i<5 ; i++){
		printf("%d: ",i + 1);
		scanf("%f", &vetor[i]);
		
	  	if (vetor[i] > maior) {
	        maior = vetor[i];
	    }
	}
	
	
	for (i = 0; i < 5; i++) {
    	vetor[i] = vetor[i] / maior;
    }	
    
    
    printf("\nVetor apos a divisao por %0.2f:\n", maior);
    for (i = 0; i < 5; i++) {
        printf("%0.2f ", vetor[i]);
    }
}
