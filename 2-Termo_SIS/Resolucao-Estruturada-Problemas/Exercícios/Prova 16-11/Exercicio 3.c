#include <stdio.h>
#include <conio.h>
#include <string.h>

#define TL 2
#define TC 2



/* Leia duas matrizes 2 x 2 e escreva uma terceira matriz com a
média dos valores de cada posição das matrizes lidas. Exibir a matriz resultante

*/

void ler_matriz1(float mat1[TL][TC]){
	int l,c;
	printf("\n<<< Matriz 1 >>>\n");
	for(l=0; l<TL; l++){
		for(c=0; c<TC; c++){
			printf("Informe Valores da posicao [%d] [%d]: ", l,c);
			scanf("%f", &mat1[l][c]);
		}
	}
}

void ler_matriz2(float mat2[TL][TC]){
	int l,c;
	printf("\n<<< Matriz 2 >>>\n");
	for(l=0; l<TL; l++){
		for(c=0; c<TC; c++){
			printf("Informe Valores da posicao [%d] [%d]: ", l,c);
			scanf("%f", &mat2[l][c]);
		}
	}
}

void media(float mat1[TL][TC],float mat2[TL][TC], float mat3[TL][TC]){
	int l,c;
	printf("\n<<< Matriz 2 >>>\n");
	for(l=0; l<TL; l++){
		for(c=0; c<TC; c++){
			mat3[l][c] = (mat1[l][c] + mat2[l][c]) / 2;
		}
	}
	printf("\n<<< Matriz Modificada>>>\n");
	for(l=0; l<TL; l++){
		for(c=0; c<TC; c++){
			printf("| %0.2f | ", mat3[l][c]);
		}
		printf("\n");
	}
}


void main(){
	float mat1[TL][TC], mat2[TL][TC], mat3[TL][TC];
	
	ler_matriz1(mat1);
	ler_matriz2(mat2);
	media(mat1, mat2, mat3);
	
}
