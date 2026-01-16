import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-toledo-primary text-white mt-5">
      <div className="container py-5">
        <div className="row">
          {/* Logo e Descrição */}
          <div className="col-md-4 mb-4">
            <div className="d-flex align-items-center mb-3">
              <i className="fas fa-store fa-2x me-3"></i>
              <div>
                <h4 className="mb-0 fw-bold">Toledo Shop</h4>
                <p className="mb-0 small opacity-75">Supermercado Online</p>
              </div>
            </div>
            <p className="opacity-75">
              Seu supermercado de confiança com os melhores produtos frescos 
              e os preços mais competitivos da região.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-whatsapp fa-lg"></i>
              </a>
            </div>
          </div>

          {/* Links Úteis */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold mb-3">Links Úteis</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#sobre" className="text-white-50 text-decoration-none">
                  Sobre Nós
                </a>
              </li>
              <li className="mb-2">
                <a href="#contato" className="text-white-50 text-decoration-none">
                  Contato
                </a>
              </li>
              <li className="mb-2">
                <a href="#politica" className="text-white-50 text-decoration-none">
                  Política de Privacidade
                </a>
              </li>
              <li className="mb-2">
                <a href="#termos" className="text-white-50 text-decoration-none">
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>

          {/* Atendimento */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Atendimento</h6>
            <div className="mb-3">
              <div className="d-flex align-items-center mb-2">
                <i className="fas fa-phone me-2"></i>
                <span className="small">(11) 99999-9999</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <i className="fas fa-envelope me-2"></i>
                <span className="small">contato@toledoshop.com</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <i className="fas fa-clock me-2"></i>
                <span className="small">Seg-Sex: 8h às 18h</span>
              </div>
            </div>
          </div>

          {/* Formas de Pagamento */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Formas de Pagamento</h6>
            <div className="d-flex flex-wrap gap-2 mb-3">
              <i className="fab fa-cc-visa fa-2x"></i>
              <i className="fab fa-cc-mastercard fa-2x"></i>
              <i className="fab fa-cc-paypal fa-2x"></i>
              <i className="fas fa-credit-card fa-2x"></i>
            </div>
            <p className="small opacity-75 mb-0">
              Aceitamos todos os cartões e PIX
            </p>
          </div>
        </div>

        {/* Linha Divisória */}
        <hr className="my-4 border-white border-opacity-25" />

        {/* Copyright */}
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0 small opacity-75">
              © 2024 Toledo Shop. Todos os direitos reservados.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0 small opacity-75">
              Desenvolvido com <i className="fas fa-heart text-danger"></i> para você
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;




