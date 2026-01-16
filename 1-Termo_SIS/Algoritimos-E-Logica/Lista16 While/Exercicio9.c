#include <stdio.h>
#include <conio.h>

//9 - Escreva um programa onde os números lidos serão somados até que a soma destes números seja igual ou maior do que 100.

void main(){
	float num, soma = 0;
	while (soma <=100){
	printf("Escreva um numero: ");
	scanf ("%f", &num);
	soma = num + num;
	}
	printf("Sua soma atingiu 100");
}
