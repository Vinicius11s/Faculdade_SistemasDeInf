#include <stdio.h>
#include<conio.h>

//.	POR VALOR - Faça um programa que:

//a.	leia os valores de A, B e C;
//b.	chamar um procedimento com passagem de parâmetros para efetuar os cálculos e exibir o resultado da adição;
//c.	chamar um procedimento com passagem de parâmetros para efetuar os cálculos e exibir o resultado da média;
//d.	chamar um procedimento com passagem de parâmetros para verificar e exibir o maior número;
//e.	chamar um procedimento com passagem de parâmetros para verificar e exibir o menor número;

void calcular_adicao(float a, float b, float c){
	float adicao;
	adicao = a + b + c;
	printf("\nAdicao dos Valores: %0.2f", adicao);	
}

void calcular_media(float a, float b, float c){
	float media;
	media = (a + b + c) / 3;
	printf("\nMedia dos Valores: %0.2f", media);
}

void maior_numero(float a, float b, float c){
	float maior;
	if( a > b && a > c){
		maior = a;
	}	
	else{
		if(b > a && b > c){
			maior = b;
		}
		else{
			if(c > a && c > b){
				maior = c;
			}
			else{
			}
			
		}
	}
	printf("\nMaior Numero entre os Valores eh: %0.2f", maior);
}

void menor_numero(float a, float b, float c){
	float menor;
	if( a < b && a < c){
		menor = a;
	}	
	else{
		if(b < a && b < c){
			menor = b;
		}
		else{
			if(c < a && c < b){
				menor = c;
			}
			else{
			}
		}
	}
	printf("\nMenor Numero entre os Valores eh: %0.2f", menor);
}

void main(){
	float a, b, c;
	printf("<<<Procedimentos para numeros recebidos>>>\n");
	printf("\nInforme o Primeiro Valor: ");
	scanf("%f", &a);
	printf("Informe o Segundo Valor: ");
	scanf("%f", &b);
	printf("Informe o Terceiro Valor: ");
	scanf("%f", &c);
	
	calcular_adicao(a,b,c);
	calcular_media(a,b,c);
	maior_numero(a,b,c);
	menor_numero(a,b,c);
}
