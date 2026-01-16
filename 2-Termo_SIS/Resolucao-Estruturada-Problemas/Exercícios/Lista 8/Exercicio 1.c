#include <stdio.h>
#include <conio.h>

//1.	POR VALOR - Faça um programa que:
//a.	leia os valores de A, B;
//b.	se o número A e B for pares, fazer o procedimento soma;
//c.	se o número A e B forem impares, fazer a função subtração;
//d.	se o número A for PAR e B for IMPAR, fazer a média de ambos os números;
//e.	se o número A for IMPAR e B for PAR, fazer uma função para exibir o maior número;

int exibir_maior(float a, float b){
	float maior;
	if(a > b){
		maior = a;
		return  maior;
	}
	else{
		maior = b;
		return maior;
	}
}


void calcular_media(float a, float b){
	float media;
	media = (a + b) / 2;
	printf("A media de ambos eh: %0.2f", media);
}

float calcular_sub(int a, int b){
	float sub;
	sub = a - b;
	return sub;
}

void calcular_soma(int a, int b){
	int soma;
	soma = a + b;
	printf("Resultado da Soma: %d", soma);
}

void main(){
	int a, b, sub, maior;
	printf("Informe o primeiro Valor: ");
	scanf("%d", &a);
	printf("Informe o segundo Valor: ");
	scanf("%d", &b);
	
	if(a % 2 == 0 && b % 2 == 0){
		calcular_soma(a,b);
	}	
	else{
		if(a % 2 != 0 && b % 2 != 0){
			sub = calcular_sub(a,b);
			printf("Resultado da Subtracao: %0.2f", sub);
		}
		else{
			if(a % 2 == 0 && b % 2 != 2){
				calcular_media(a,b);
			}
			else{
				if(a % 2 != 0 && b % 2 == 0){
				 exibir_maior(a,b);
				 maior = exibir_maior(a,b);
				 printf("O Maior Numero eh: %0.2f", maior);
				}
				else{
				}
			}
		}	
	}
}
