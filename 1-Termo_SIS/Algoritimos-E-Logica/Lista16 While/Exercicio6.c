#include <stdio.h>
#include <conio.h>

//6 - Criar um Calculador de Tabuadas. O usuário deverá digitar o número desejado e o programa 
//deverá fazer a tabuada desse número de zero a 10.////

void main(){
	int i = 0, num, tab;
	printf("Informe o numero desejado: ");
	scanf("%d", &num);
	while (i <= 10){
		tab = num * i;
		printf("%d x %d = %d \n",num, i, tab );
		i++;
	}
	
}
