#include <stdio.h>
#include <conio.h>
#include <string.h>

//1.	Escreva uma função que retorne a mensagem "olá mundo!". Está função deverá ser chamado através
// programa principal. Exibir conteúdo retornado.

char *funcao_ola_mundo(){
	return "OLA MUNDO";
	
}

void main(){
	printf("\nRetorno >> %s", funcao_ola_mundo());
}
