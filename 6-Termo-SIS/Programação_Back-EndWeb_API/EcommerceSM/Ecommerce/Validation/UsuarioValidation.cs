using Dominio.DTOs;
using FluentValidation;

namespace Ecommerce.Validation
{
    public class UsuarioValidation
        : AbstractValidator<UsuarioDTO>
    {
        public UsuarioValidation() {
            RuleFor(p=>p.Login)
                .MaximumLength(150)
                .WithMessage("A descrição precisa ter no" +
                " máximo 150 caracteres!");

            RuleFor(p => p.Login)
                .NotEmpty()
                .WithMessage("A descrição não pode ser vazia!");

            RuleFor(p => p.Login)
                .NotNull()
                .WithMessage("A descrição não pode ser vazia!");

        }
    }
}
