#include <stdio.h>
#include <conio.h>

//4.	Carregar uma matriz 3x3 com número inteiros,
//gerar uma nova matriz com os número da matriz carregada, multiplicados por 2.


#define TC 3
#define TL 3 

void carregar_matriz(int mat_a[TL][TC]){
	int l, c;
	for(l=0;l<TL;l++){
		for(c=0;c<TC;c++){ 
			printf("Informe Matriz: ");
			scanf("%d", &mat_a[l][c]);
		}	
	}	
}

void multiplica(int mat_a[TL][TC], int mat_b[TL][TC]){
	int l, c;
	for(l=0; l<TL; l++){
		for(c=0; c<TC; c++){
		mat_b[l][c] = mat_a[l][c] *2;
		}
	}

void exibir_matriz(int mat_b[TL][TC]){
	int l, c;
	for(l=0;l<TL;l++){ 
		for(c=0;c<TC;c++){
			printf("\nMatriz Multiplicada: %d", mat_b[l][c]);
		}	
	}		
}

void main(){
	int mat_a[TL][TC], mat_b[TL][TC];
	carregar_matriz(mat_a);
	multiplica(mat_a, mat_b);
	exibir_matriz(mat_b);
	
}
