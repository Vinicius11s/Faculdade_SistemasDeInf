#include <stdio.h>
#include <conio.h>

//12 - Faça um programa que leia um número indeterminado de idades. A última idade lida, que não entrará nos cálculos,
//deverá ser igual a zero. Ao final programa deverá escrever quantas idades foram lidas, calcular e escrever a média
//de idade desse grupo de idades. 

void main(){
	float media;
	int qtde, idade = 1;
	while(idade != 0){
		if (idade != 0){
			printf("Informe sua idade: ");
			scanf("%d", &idade);
			qtde++;
		}		
	}
	qtde--;
	media = idade / qtde;
	printf("\nForam lidas: %d idades", qtde);
	printf("\nA media de idades e %0.2f", media);
}
