#include <stdio.h>
#include <conio.h>

#define TL 5 
#define TC 5 

//Declare uma matriz 5 x 5. Preencha com 1 a diagonal principal e com 0 os demais
//elementos. Escreva ao final a matriz obtida.

void atribuir_valores(int mat[TL][TC]){
	int l,c;
	
	for(l=0; l<TL; l++){
		for(c=0; c<TC; c++){
			if(l == c && c == l){
				mat[l][c] = 1;
			}
			else{ 
			mat[l][c] =  0;
			}
		}
	}
}	


void exibir_matriz(int mat[TL][TC]){
	int l, c;
	for(l=0;l<TL;l++){
		for(c=0;c<TC;c++){
			printf("%d | ", mat[l][c]);
		}
		printf("\n");	
	}		
}

void main(){
	int mat[TL][TC];
	atribuir_valores(mat);
	exibir_matriz(mat);
}
