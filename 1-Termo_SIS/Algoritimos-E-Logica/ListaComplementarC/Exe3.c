#include <stdio.h>
#include <conio.h>

//3 - Faça um algoritmo que receba a altura e sexo de uma pessoa, calcule e exiba o seu peso ideal, utilizando as seguintes formulas:
//a.	Homens = (72.7 * altura) - 58
//b.	Mulheres = (62.1 * altura) - 44.7


void main(){
	float alt, calc ;
	char sexo ;
	
	printf ("Informe sua altura: ");
	scanf ("%f", &alt);
	printf ("Informe seu sexo: ");
	scanf ("%s", sexo);
	
	if(sexo = "masculino" || sexo = "Masculino"){
		calc = (72.7 * alt) - 58;
		printf ("Seu peso ideal é: %f", calc);
	}
	else{
		calc =  (62.1 * alt) - 44.7;
		printf ("Seu peso ideal é: %f", calc);
	}


}
