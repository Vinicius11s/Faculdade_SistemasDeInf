#include <stdio.h>
#include <conio.h>

//3.	Escreva um programa que leia o código de origem de um produto e imprima na tela a região de sua procedência conforme a tabela abaixo:
//-código 1 : Sul 			-código 5 ou 6 : Nordeste
//-código 2 : Norte 			-código 7, 8 ou 9 : Sudeste
//-código 3 : Leste 			-código 10 : Centro-Oeste
//-código 4 : Oeste 			-código 11 : Noroeste


void main(){
	int codigo;
	
	printf("<<<Algoritmo mostra a regiao de procedencia conforme seu codigo de origem: >>>");
	printf("\n\nInforme o codigo de origem: ");
	scanf("%d", &codigo);
	
	switch(codigo){
		
		case 1:{
			printf("Sua regiao de procedencia eh: Sul");			
			break;
		}
		case 2:{
			printf("Sua regiao de procedencia eh: Norte");
			break;
		}
		case 3:{
			printf("Sua regiao de procedencia eh: Leste");
			break;
		}	
		case 10:{
			printf("Sua regiao de procedencia eh: Centro-Oeste");
			break;
		}
		case 11:{
			printf("Sua regiao de procedencia eh: Noroeste");
			break;
		}
		default:{
			if(codigo == 5 || codigo == 6 ){
				printf("Sua regiao de procedencia eh: Nordeste");
			}
			else{
				if(codigo == 7 || codigo == 8 || codigo == 9 ){
					printf("Sua regiao de procedencia eh: Sudeste");		
				}
				else{
					printf("Sua regiao de procedencia nao foi encontrada!!");
				}
			}			
			break;
		}
	}
}

