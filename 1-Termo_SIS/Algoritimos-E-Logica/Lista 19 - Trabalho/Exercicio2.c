#include <stdio.h>
#include <conio.h>
//2.	Escreva um algoritmo que:
//- leia 7 fichas, onde cada ficha contém o número de matrícula e a nota de cada aluno de um determinado curso;
//- determine e imprima as duas maiores notas, juntamente com o número de matrícula do aluno que obteve cada uma delas;
//- Suponha que não exista dois ou mais alunos com a mesma nota.

void main(){
	int  i = 0, matricula, matricula_primeira_maior, matricula_segunda_maior;
	float nota, nota_primeira_maior = 0, nota_segunda_maior = 0;
	
	
	do{
		printf("\nInforme a Matricula: ");
		scanf("%d", &matricula);
		printf("Informe a nota: ");
		scanf("%f", &nota);	
		i++;
		
		if(nota > nota_primeira_maior){
			nota_segunda_maior = nota_primeira_maior;
			matricula_segunda_maior = matricula_primeira_maior;
			nota_primeira_maior = nota;
			matricula_primeira_maior = matricula;
		}
		else{
			if(nota > nota_segunda_maior){
				nota_segunda_maior = nota;
				matricula_segunda_maior = matricula;
			}
		}	
	} while (i < 7);
	
	printf("\nMaior Nota: %0.2f\n", nota_primeira_maior);
	printf("Numero de matricula: %d\n", matricula_primeira_maior);
	printf("\nA Segunda Maior Nota Foi: %0.2f\n", nota_segunda_maior);
	printf("Numero de matricula: %d\n", matricula_segunda_maior);
	
}

