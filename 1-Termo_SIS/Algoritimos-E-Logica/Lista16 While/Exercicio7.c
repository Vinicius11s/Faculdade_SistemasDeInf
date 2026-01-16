#include <stdio.h>
#include <conio.h>

//7 - Desenvolva um programa que apresente todos os números divisíveis por 4 na faixa de 20 a 60.

void main(){
	int i = 20;
	while (i <= 60){
	if(i % 4 == 0){
		printf("Eh Divisivel por 4 : %d \n" , i);
		}
		i++;
	}
}
