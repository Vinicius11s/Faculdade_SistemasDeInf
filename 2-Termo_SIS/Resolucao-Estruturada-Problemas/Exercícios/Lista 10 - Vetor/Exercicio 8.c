#include <stdio.h>
#include <conio.h>

//8.	Faça um algoritmo que leia um vetor K[30]. Troque a seguir, todos os elementos de
//ordem ímpar do vetor com os elementos de ordem par imediatamente posterior.

	
void main(){
	int i, K[30], aux;
	printf("<<<Este algoritmo troca todos os elementos de ordem impar do vetor com os elementos\n de ordem par imediatamente posterior>>>\n\n");
	printf("Digite os elementos do vetor K.\n");
	
	for(i=0 ; i<30 ; i++){
		printf("Valor %d: ",i + 1);
		scanf("\n%d", &K[i]);
	}
	
	for (i=0 ; i<29 ; i+=2) {
    	aux = K[i];
    	K[i] = K[i + 1];
    	K[i + 1] = aux;
    }	
    
    printf("\nVetor K apos a troca:\n");
    for (i =0 ; i<30; i++) {
        printf("\n%d ", K[i]);
    }
}
