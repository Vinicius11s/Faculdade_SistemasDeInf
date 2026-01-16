#include <stdio.h>
#include <conio.h>

//4.	POR VALOR - Uma empresa deseja especificar um programa para gerar sua folha de pagamentos. Seu programa deve:

//a.	Fazer uma função que leia e retorne o salário_bruto;
//b.	Fazer uma função que leia e retorne o total de horas extras;
//c.	Fazer uma função que leia e retorne os descontos;
//d.	Fazer uma função que receba o total de horas extras e retorne os valores correspondes a essas horas sabendo que cada hora extra custa R$ 20,00;
//e.	Fazer uma função que calcule e retorne o salário bruto passando por parâmetro as informações necessárias para isso;
//f.	Fazer um procedimento que calcule e exiba o salário líquido do funcionário passando por parâmetros as informações necessárias.

//Esta empresa possui 5 funcionários, e todos precisaram ter seus salários calculados.


float verificar_salario_bruto(){
	float salario_bruto;
	printf("Informe o salario bruto: ");
	scanf("%f", &salario_bruto);
	return salario_bruto;
}

float verificar_horas_extras(){
	float horas_extras;
	printf("Informe a quantidade de horas extras: ");
	scanf("%f", &horas_extras);
	return horas_extras;
}

float verificar_descontos(){
	float descontos;
	printf("Informe a quantidade de descontos: ");
	scanf("%f", &descontos);
	return descontos;
}

float calcula_extras(float horas_extra){
	float calculo_extra;
	calculo_extra = horas_extra * 20.00;
	return calculo_extra;
}

float calculo_salario_b(float salario_bruto, float calculo_extra){
	float calculo_salario_bruto;
	calculo_salario_bruto = salario_bruto + calculo_extra;
	return calculo_salario_bruto;
	
}

void salario_liquido(float calculo_salario_bruto, float descontos){
	float salario_liq;
	salario_liq = calculo_salario_bruto - descontos;
	printf("Seu Salario Liquido sera: %0.2f", salario_liq);
}


void main(){
	float salario_bruto, horas_extras, descontos, calculo_extra, calculo_salario_bruto;
	
	salario_bruto = verificar_salario_bruto();
	
	horas_extras = verificar_horas_extras();
	
	descontos = verificar_descontos();
	
	calculo_extra = calcula_extras(horas_extras);
	
	calculo_salario_bruto = calculo_salario_b(salario_bruto, calculo_extra);
	
	salario_liquido(calculo_salario_bruto, descontos);
}
