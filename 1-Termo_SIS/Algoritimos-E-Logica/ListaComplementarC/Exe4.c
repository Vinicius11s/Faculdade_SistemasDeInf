#include <stdio.h>
#include <conio.h>

//4 - Faça um algoritmo que receba três notas de um aluno, calcule e exiba a média aritmética entre essas três notas e uma mensagem que segue as regras abaixo:
//a.	Média < 5 - Reprovado
//b.	Média >= 5 e < 7 - Exame
//c.	Média >= 7 Aprovado



void main(){
	float n1, n2, n3, media;
	printf("Informe sua primeira nota: ");
	scanf("%f", &n1);
	printf("Informe sua segunda nota: ");
	scanf("%f", &n2);
	printf("Informe sua terceira nota: ");
	scanf("%f", &n3);
	media = (n1 + n2 + n3) / 3;
	
	if(media < 5){
		printf("Reprovado!");
	}
	else{
		if(media >= 5 || media < 7){
			printf("Exame!");
		}
		else{
			if(media > 7){
				printf("Aprovado!!");
			}
			else{
			}
		}
	}
}
