#include <stdio.h>
#include <conio.h>

//2 - Faça um algoritmo que calcule e exiba o salário reajustado de um funcionário de acordo com as seguintes regras abaixo:
//a.	Salário até 1000,00, reajuste de 12%.
//b.	Salário maior que 1000,00 reajuste de 10%


void main(){
	float num, calc, reajuste;
	printf("Informe seu salario: ");
	scanf("%f", &num);
		if (num <= 1000){
			calc = (num * 12) / 100;
			reajuste = num + calc;
			printf("Novo salario: %f", reajuste);
		}
		else{
			calc = (num * 10) / 100;
			reajuste = num + calc;
			printf("Novo salario: %f", reajuste);	
		}
}
