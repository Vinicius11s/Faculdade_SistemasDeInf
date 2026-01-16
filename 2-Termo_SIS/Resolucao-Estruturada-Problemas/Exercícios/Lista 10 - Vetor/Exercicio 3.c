#include <stdio.h>
#include <conio.h>

//3.Fazer uma rotina que recebe um array do tipo float e o número de valores que devem ser solicitados 
//ao usuário e devolve o array preenchido com os valores digitados.

preencher_array(float valor[], int tamanho){
	int i;
	for(i=0; i<tamanho; i++){
		printf("Digite o valor %d: ", i + 1);
		scanf("%f", &valor[i]);
	}
	
}
	
void main(){
	int i,tamanho;
	float valores[tamanho];
	
	printf("Informe o numero de valores a serem digitados: ");
	scanf("%d", &tamanho);
	
	preencher_array(valores,tamanho);
	
	printf("\nValores Digitados:\n");
	for(i = 0; i < tamanho; i++){
		printf("%0.2f\n", valores[i]);
		
	}
}
