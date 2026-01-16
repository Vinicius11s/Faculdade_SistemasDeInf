#include <stdio.h>
#include <conio.h>

//4.	[FOR] Escreva um algoritmo em que leia 20 números e imprima a soma dos positivos e o total de números negativos. 

void main(){
	float n1, positivo;
	int i, cont_neg = 0;
	
	printf("<<<Este algoritmo recebe numeros, mostra a soma dos positivos e mostra a quantidade de numeros negativos digitados.>>>");
	
	for (i = 1; i <= 4; i++){
		printf("\nInforme um numero: ");
		scanf("%f", &n1);
		
		if(n1 > 0){
		positivo += n1;
		}
		else{
			cont_neg++;
		}
	}
	printf("\nA soma dos numeros positivos eh: %0.2f", positivo);
	printf("\n\nVoce digitou: %d numeros negativos", cont_neg);
}
