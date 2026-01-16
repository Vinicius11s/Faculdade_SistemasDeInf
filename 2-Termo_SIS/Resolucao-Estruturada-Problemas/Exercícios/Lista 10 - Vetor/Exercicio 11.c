#include <stdio.h>
#include <conio.h>


//11.	Faça um algoritmo que leia dois vetores (A e B) de 50 posições de números. O algoritmo deve, então,
//subtrair o primeiro elemento de A do último de B, acumulando o valor, subtrair o segundo elemento de A do
//penúltimo de B, acumulando o valor, e assim por diante. Mostre o resultado da soma final.

	
void main(){
	int i, soma, tamanho = 50;
	int vetorA[tamanho], vetorB[tamanho];
	
	printf("Informe 50 valores para o vetor A\n");
	for(i=0 ; i<tamanho ; i++){
		printf("Valor %d: ", i + 1);
		scanf("\n%d", &vetorA[i]);	
		
	}
	
	
	printf("Informe 50 valores para o vetor B\n");	
	for(i=0 ; i<tamanho ; i++){
		printf("Valor %d: ", i + 1);
		scanf("\n%d", &vetorB[i]);	
		
	}
	
	for(i=0 ; i<tamanho ; i++){
		soma = soma + vetorA[i] - vetorB[tamanho - 1 - i];
	}
	printf("Resultado da soma final: %d\n", soma);
}
