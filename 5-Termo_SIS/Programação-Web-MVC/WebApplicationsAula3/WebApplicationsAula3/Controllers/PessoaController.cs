using Microsoft.AspNetCore.Mvc;

namespace WebApplicationsAula3.Controllers
{
    public class PessoaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
