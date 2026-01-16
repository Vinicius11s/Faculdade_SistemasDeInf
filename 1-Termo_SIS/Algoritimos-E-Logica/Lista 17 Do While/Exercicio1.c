#include <stdio.h>
#include <conio.h>

//1 - Escreva um programa para ler 2 notas de um aluno, calcular e imprimir a média final. Logo após escrever a mensagem 
//"Calcular a média de outro aluno [1]Sim [0]Não?" e solicitar um resposta. Se a resposta for "1", o programa deve ser 
//executado novamente, caso contrário deve ser encerrado imprimindo a quantidade de alunos aprovados.

void main(){
	float nota1, nota2, media;
	int resp = 0, qtde_aprov = 0;
	
	do{
		printf("Informe a 1. Nota: ");
		scanf("%f", &nota1);
		printf("Informe a 2. Nota: ");
		scanf("%f", &nota2);
		media = (nota1 + nota2) /2;
		printf("Media: %0.2f", media);
		if(media >= 7){
			qtde_aprov++;
		}
		printf("\nDeseja Continuar? (1-S;2-N)");
		scanf("%d", &resp);		
	} while( resp == 1);
	printf("\nQtde de Aprovados: %d", qtde_aprov);
}

