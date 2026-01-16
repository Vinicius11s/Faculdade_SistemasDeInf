#include <stdio.h>
#include <conio.h>

//5 - Elaborar um programa que apresente no final o somatório dos valores pares existentes na faixa de 1 até 20.

void main(){
	int i = 1, soma = 0;
	while (i <= 20){
		if(i %2 == 0){
			soma = soma + i;
		}
		i++;
	}
	printf("Soma Pares: %d", soma);
}
