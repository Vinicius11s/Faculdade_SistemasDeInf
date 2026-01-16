#include <stdio.h>
#include <conio.h>

#define TF 10

void recebe_numeros(){
	int contador;
	float valor, maior = -999999, menor = 99999;
	printf("<<<Este algoritmo revela o maior e o menor numero digitado>>>");
	
	for(contador = 0 ; contador < TF; contador++){
		printf("\nInforme o valor %d: ", contador);	
		scanf("%f", &valor);	
		
		if(valor > maior ){
			maior = valor;
		}
		else{
		}
		if(valor < menor){
		menor = valor;
		}
		else{
		}
	}
	printf("\nO maior valor digitado foi: %0.2f", maior);
	printf("\nO menor valor digitado foi: %0.2f", menor);

}
void main(){
	recebe_numeros();
}
