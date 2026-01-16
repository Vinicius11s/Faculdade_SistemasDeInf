#include <stdio.h>
#include <conio.h>

#define TL 4 
#define TC 4

//4.	Leia duas matrizes 4 x 4 e escreva uma terceira com os maiores valores de cada posição das matrizes lidas.
	
void ler_matriz_A(int mat_a[TL][TC]){
	int l,c;
	printf("\n<<< Matriz A>>>\n");
	for(l=0; l<TL; l++){
		for(c=0; c<TC; c++){
			printf("Informe Valores: ");
			scanf("%d", &mat_a[l][c]);
		}
	}
}

void ler_matriz_B(int mat_b[TL][TC]){
	int l,c;
	printf("\n<<< Matriz B>>>\n");

	for(l=0; l<TL; l++){
		for(c=0; c<TC; c++){
			printf("Informe Valores: ");
			scanf("%d", &mat_b[l][c]);
		}
	}
}

imprime_matriz_C(int mat_a[TL][TC],int  mat_b[TL][TC]){
	int l,c, mat_c[TL][TC];
	for(l=0; l<TL; l++){
		for(c=0; c<TC; c++){
			if(mat_a[l][c] > mat_b[l][c]){
				mat_c[l][c] = mat_a[l][c]; 
			}
			else{
				mat_c[l][c] = mat_b[l][c];
			}
		}
	}
	printf("\n\n");
	for(l=0; l<TL; l++){
		for(c=0; c<TC; c++){
		printf("%d | ", mat_c[l][c]);
		}
	}
}	

void main(){
	int mat_a[TL][TC], mat_b[TL][TC];
	printf("<<<Este algortimo le duas matrizes 4x4 e imprime uma terceira somente com os maiores valores >>>\n\n");
	
	ler_matriz_A(mat_a);
	ler_matriz_B(mat_b);
	imprime_matriz_C(mat_a, mat_b);
}
