using Dominio.DTOs;
using FluentValidation;

namespace Ecommerce.Validation
{
    public class ClienteValidation
        : AbstractValidator<ClienteDTO>
    {
        public ClienteValidation() {
            RuleFor(p=>p.Nome)
                .MaximumLength(150)
                .WithMessage("A descrição precisa ter no" +
                " máximo 150 caracteres!");

            RuleFor(p => p.Nome)
                .NotEmpty()
                .WithMessage("A descrição não pode ser vazia!");

            RuleFor(p => p.Nome)
                .NotNull()
                .WithMessage("A descrição não pode ser vazia!");

        }
    }
}
