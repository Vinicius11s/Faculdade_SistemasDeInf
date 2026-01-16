using InfraEstrutura.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

public class ContextoEmpresaFactory : IDesignTimeDbContextFactory<EmpresaContexto>
{
    public EmpresaContexto CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<EmpresaContexto>();
        //server pc-vinicius : localhost\SQLEXPRESS
        //server pc-laboratório : LAB09-10
        //server pc-raioX: DESKTOP-GHVAV6T\SQLEXPRESS
        optionsBuilder.UseSqlServer(@"Server=DESKTOP-GHVAV6T\SQLEXPRESS;Database=dbProjetoReact;Integrated Security=True;TrustServerCertificate=True;");

        return new EmpresaContexto(optionsBuilder.Options);
    }
}
