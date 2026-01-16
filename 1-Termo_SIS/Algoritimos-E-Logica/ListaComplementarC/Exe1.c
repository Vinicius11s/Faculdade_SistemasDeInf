#include <stdio.h>
#include <conio.h>

//1 - Faça um algoritmo que receba um número e diga se este número está no intervalo entre 100 e 200, se não, exibir "número fora do intervalo".

void main(){
	int num;
	printf("Informe um numero: ");	
	scanf("%d", &num);
	if(num > 100 || num <200 ){
		printf("Este numero esta no intervalo entre 100 e 200");
		}
	else{
		printf("Numero fora do intervalo");
	}
}
