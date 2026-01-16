#include <stdio.h>
#include <conio.h>

#define TL 3 
#define TC 6

//9.	Faça programa que leia uma matriz 3 x 6 com valores reais.
//(a) Imprima a soma de todos os elementos das colunas ímpares.
//(b) Imprima a média aritmética dos elementos da segunda e quarta colunas.
//(c) Substitua os valores da sexta coluna pela soma dos valores das colunas 1 e 2.
//(d) Imprima a matriz modificada.

	
void ler_matriz(int mat[TL][TC]){
	int l,c;
	printf("\n<<< Matriz >>>\n");
	for(l=0; l<TL; l++){
		for(c=0; c<TC; c++){
			printf("Informe Valores da posicao [%d] [%d]: ", l,c);
			scanf("%d", &mat[l][c]);
		}
	}
}

void exibir_matriz(int mat[TL][TC]){
	int l, c;
	printf("\n");	

	for(l=0;l<TL;l++){
		for(c=0;c<TC;c++){
			printf("%d | ", mat[l][c]);
		}
		printf("\n");	
	}		
}

void soma_impares(int mat[TL][TC]){
	int l,c, soma_i;
	for(l=0; l<TL; l++){
		for(c=0; c<TC; c++){
			if(mat[l][c] % 2 != 0){
				soma_i += mat[l][c];
			}
		}
	}
	printf("\nSoma dos valores impares %d", soma_i);
}

void media_2_4(int mat[TL][TC]){
	int l,c, acumulador_2, cont = 0, media;
	for(l=0; l<TL; l++){
		for(c=0; c<TC; c++){
			if(c == 1){
				acumulador_2 += mat[l][c];
				cont++;
			}
			else{
			}
			if(c == 3){
				acumulador_2 += mat[l][c];
				cont++;
			}
			else{
			}
		}
	}
	media = acumulador_2 / cont;
	printf("\nMedia aritmetica dos elementos da segunda e quarta colunas: %d", media);	
}


substitui_valores(int mat[TL][TC]){
	int l, c;      
    for(l=0;l<TL;l++){
		for(c=0;c<TC;c++){
			mat[l][5] = mat[l][1] + mat[l][2];
		}
	}
	printf("\nMatriz modificada, elentos das colunas 1 e 2 somados e inseridor na 6.\n\n");
	for(l=0;l<TL;l++){
		for(c=0;c<TC;c++){
			printf("%d | ", mat[l][c]);
		}
		printf("\n");	
	}
}		

void main(){
	int mat[TL][TC];
	printf("<<<Este algortimo>>>\n\n");
	
	ler_matriz(mat);
	exibir_matriz(mat);
	soma_impares(mat);
	media_2_4(mat);
	substitui_valores(mat);

}
