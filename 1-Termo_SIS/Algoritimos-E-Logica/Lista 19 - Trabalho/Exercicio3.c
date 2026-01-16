
#include <stdio.h>
#include <conio.h>

//3.O sistema de avaliação de uma determinada disciplina obedece aos seguintes critérios:
//"	Durante o semestre são dadas três notas;
//"	A nota final é obtida pela média aritmética das notas dadas durante o curso;
//"	É considerando aprovado o aluno que obtiver a nota final superior ou igual a 6,0 e que tiver comparecido a um mínimo de 40 aulas.

//Fazer um algoritmo que:
//a)	Leia um conjunto de dados contendo o número de matrícula, as três notas e a frequência de 10 alunos;

//b)	Calcule e exiba:
//"	A nota final de cada aluno;
//"	A maior e menor nota da turma;
//"	A nota média da turma;
//"	O total de alunos reprovados;
//"	A porcentagem de alunos reprovados por faltas.


void main(){
	float reprov = 0, alunos = 1, matricula, frequencia, reprov_falta = 0, qtd, porcentagem, porc, nota1, nota2, nota3, nota_final, nota_turma, nota_maior = 0, nota_menor = 99999, media_turma;
	
	do{
		printf("Informe seu numero de matricula: ");
		scanf("%f", &matricula);
		printf("Informe a 1. Nota: ");
		scanf("%f", &nota1);
		printf("Informe a 2. Nota: ");
		scanf("%f", &nota2);
		printf("Informe a 3. Nota: ");
		scanf("%f", &nota3);
		printf("Informe a Frequencia: ");
		scanf("%f", &frequencia);		
		alunos++;
		
		nota_final = (nota1 + nota2 + nota3) / 3;
		nota_turma = nota_turma + nota_final;
		media_turma = nota_turma / alunos;
		
		printf("Nota Final: %0.2f", nota_final);
		printf("\n\n");
		
		if(nota_final > nota_maior){
			nota_maior = nota_final;			
		}
		else{}
			if(nota_final < nota_menor){
				nota_menor = nota_final;
			}
			else{
			}
		
		
		if(nota_final < 6.0 || frequencia <= 40 ){
			reprov++;
		}
		else{
		}
		
		if(nota_final > 6.0 && frequencia < 40){
			reprov_falta++;
		}
		else{
		}
	qtd++;	
	} while( alunos <= 10);
	
	porcentagem = reprov_falta * 100;
	porc = porcentagem / qtd;
	
	printf("\nA Maior Nota da Turma foi: %0.2f", nota_maior);
	printf("\nA Menor Nota da Turma foi: %0.2f", nota_menor);
	printf("\nA Media da Turma Foi: %0.2f", media_turma);
	printf("\nForam Reprovados: %0.2f Alunos", reprov);
	printf("\nA porcentagem de alunos reprovados por falta foi: %0.2f ", porc);
	
}		
