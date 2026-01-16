using Microsoft.AspNetCore.Mvc;

namespace OlaMundo.Controllers
{
    public class PessoaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Salvar()
        {
            return View();
        }

        public IActionResult Buscar()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Salvar1(string nome, string email)
        {
            return View();
        }

        public IActionResult Salvar2()
        {
            return View();
        }
        //rota/Controller/Index
        //IActionResult pode retornar varios tipos de Action
        
        //? na rota significa ínico de passagem de parametro por Get
        //?nome=Vinicius&email=vinihortasantana@gmail.com
    }
}
