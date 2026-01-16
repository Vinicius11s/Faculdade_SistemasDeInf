#include <stdio.h>
#include <conio.h>
#include <string.h>

//2.	Escreva uma função que recebe a idade de um nadador por parâmetro e retorna a
//categoria desse nadador de acordo com a tabela abaixo:   

char *retornar_categoria(int idade){
	if(idade >= 5 && idade <= 7){
		return "Infantil A";
	}
	else
		if(idade >= 8 && idade <= 10){
			return "Infantil B";
		}
		else
			if(idade >= 11 && idade <= 13){
				return "Juvenil A";
			}
			else
				if(idade >= 14 && idade <= 17){
					return "Juvenil B";
				}
				else
					if(idade >= 18){
						return "Adulto";
					}		
}

void main(){
	int idade; 
	
	printf("Informe a Idade: ");
	scanf("%d", &idade);
	printf("\nCategoria >> %s", retornar_categoria(idade));
}
