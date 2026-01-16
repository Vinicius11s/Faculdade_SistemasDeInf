#include <stdio.h>
#include <conio.h>

void main (){
	int num;
	printf("Informe um numero de 0 .. 10: ");
	scanf("%d", &num);
	switch (num){
		case 1:
			printf("Um");
			break;
		case 2:
			printf("Dois");
			break;		
		case 3:
			printf("Tres");
			break;		
		default:
			printf("Invalido!!!");
	}	
}
