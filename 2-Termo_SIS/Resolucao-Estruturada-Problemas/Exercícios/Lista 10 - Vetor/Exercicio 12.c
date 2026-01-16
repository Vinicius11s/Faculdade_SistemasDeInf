#include <stdio.h>
#include <conio.h>

//12.	Faça um algoritmo que leia um vetor A[10]. Inverta então os valores de A.
//troque o primeiro pelo último, segundo pelo penúltimo e assim por diante.
//Mostre o vetor A após as alterações.


	
void main(){
	int i, j, A[10], A2[10];
	
	printf("Informe 10 valores para o vetor A\n");
	for(i=0, j=9; i<10 ; i++, j--){
		printf("Valor %d: ", i + 1);
		scanf("\n%d", &A[i]);	
		
		A2[j] = A[i];
	}
	printf("\nVetor apos a troca");
	for(i=0 ; i<10 ; i++){
		printf("\n%d", A2[i]);
	}
}
