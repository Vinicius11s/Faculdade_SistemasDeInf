(function () {
  "use strict";

  var CHAVE_URL = "biblioteca.urlBase";

  function baseUrl() {
    var raw = document.getElementById("apiBase").value.trim();
    if (raw) {
      return raw.replace(/\/+$/, "");
    }
    return "";
  }

  function setMsg(texto, erro) {
    var el = document.getElementById("msg");
    el.textContent = texto || "";
    el.className = "msg" + (erro ? " error" : texto ? " ok" : "");
  }

  function montarUrl(caminho) {
    var b = baseUrl();
    if (!b) {
      return caminho;
    }
    return b + caminho;
  }

  function idsCategorias(texto) {
    if (!texto || !String(texto).trim()) {
      return [];
    }
    return String(texto)
      .split(",")
      .map(function (s) {
        return parseInt(s.trim(), 10);
      })
      .filter(function (n) {
        return !isNaN(n);
      });
  }

  async function requisicao(metodo, caminho, corpo) {
    var opcoes = {
      method: metodo,
      headers: {},
    };
    if (corpo !== undefined) {
      opcoes.headers["Content-Type"] = "application/json";
      opcoes.body = JSON.stringify(corpo);
    }
    var res = await fetch(montarUrl(caminho), opcoes);
    var texto = await res.text();
    var dados = null;
    if (texto) {
      try {
        dados = JSON.parse(texto);
      } catch (ignorar) {
        dados = texto;
      }
    }
    if (!res.ok) {
      var msg =
        typeof dados === "object" && dados && dados.message
          ? dados.message
          : typeof dados === "string"
          ? dados
          : res.status + " " + res.statusText;
      if (typeof dados === "object" && dados && dados.campos && dados.campos.length) {
        msg +=
          "\n" +
          dados.campos
            .map(function (c) {
              return (c.campo || "?") + ": " + (c.mensagem || "");
            })
            .join("\n");
      }
      var err = new Error(msg);
      err.status = res.status;
      throw err;
    }
    return dados;
  }

  document.querySelectorAll(".tab").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var aba = btn.getAttribute("data-tab");
      document.querySelectorAll(".tab").forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });
      document.querySelectorAll(".panel").forEach(function (p) {
        p.classList.toggle("active", p.id === "panel-" + aba);
      });
    });
  });

  document.getElementById("btnSaveBase").addEventListener("click", function () {
    var v = document.getElementById("apiBase").value.trim();
    if (v) {
      localStorage.setItem(CHAVE_URL, v);
    } else {
      localStorage.removeItem(CHAVE_URL);
    }
    setMsg("Endereço gravado.", false);
  });

  (function carregarUrlSalva() {
    var salvo = localStorage.getItem(CHAVE_URL);
    if (salvo) {
      document.getElementById("apiBase").value = salvo;
    }
  })();

  function autorLimpar() {
    document.getElementById("autorId").value = "";
    document.getElementById("autorNome").value = "";
    document.getElementById("autorPais").value = "";
  }

  async function autorAtualizarLista() {
    try {
      setMsg("Carregando…", false);
      var lista = await requisicao("GET", "/api/autores");
      var ul = document.getElementById("listaAutores");
      ul.innerHTML = "";
      (lista || []).forEach(function (a) {
        var li = document.createElement("li");
        li.innerHTML =
          "<strong>#" +
          a.id +
          "</strong> " +
          escapeHtml(a.nome) +
          (a.paisOrigem ? " — " + escapeHtml(a.paisOrigem) : "") +
          '<div class="row-actions">' +
          '<button type="button" data-edit="autor" data-id="' +
          a.id +
          '">Editar</button>' +
          '<button type="button" class="btn-del" data-del="autor" data-id="' +
          a.id +
          '">Excluir</button>' +
          "</div>";
        ul.appendChild(li);
      });
      setMsg("", false);
    } catch (e) {
      setMsg(e.message || String(e), true);
    }
  }

  document.getElementById("autorNovo").addEventListener("click", autorLimpar);
  document.getElementById("autorRefresh").addEventListener("click", autorAtualizarLista);

  document.getElementById("formAutor").addEventListener("submit", async function (ev) {
    ev.preventDefault();
    var id = document.getElementById("autorId").value.trim();
    var corpo = {
      nome: document.getElementById("autorNome").value.trim(),
      paisOrigem: document.getElementById("autorPais").value.trim() || null,
    };
    try {
      if (id) {
        await requisicao("PUT", "/api/autores/" + encodeURIComponent(id), corpo);
      } else {
        await requisicao("POST", "/api/autores", corpo);
      }
      autorLimpar();
      await autorAtualizarLista();
    } catch (e) {
      setMsg(e.message || String(e), true);
    }
  });

  function categoriaLimpar() {
    document.getElementById("categoriaId").value = "";
    document.getElementById("categoriaNome").value = "";
  }

  async function categoriaAtualizarLista() {
    try {
      setMsg("Carregando…", false);
      var lista = await requisicao("GET", "/api/categorias");
      var ul = document.getElementById("listaCategorias");
      ul.innerHTML = "";
      (lista || []).forEach(function (c) {
        var li = document.createElement("li");
        li.innerHTML =
          "<strong>#" +
          c.id +
          "</strong> " +
          escapeHtml(c.nome) +
          '<div class="row-actions">' +
          '<button type="button" data-edit="categoria" data-id="' +
          c.id +
          '">Editar</button>' +
          '<button type="button" class="btn-del" data-del="categoria" data-id="' +
          c.id +
          '">Excluir</button>' +
          "</div>";
        ul.appendChild(li);
      });
      setMsg("", false);
    } catch (e) {
      setMsg(e.message || String(e), true);
    }
  }

  document.getElementById("categoriaNovo").addEventListener("click", categoriaLimpar);
  document.getElementById("categoriaRefresh").addEventListener("click", categoriaAtualizarLista);

  document.getElementById("formCategoria").addEventListener("submit", async function (ev) {
    ev.preventDefault();
    var id = document.getElementById("categoriaId").value.trim();
    var corpo = { nome: document.getElementById("categoriaNome").value.trim() };
    try {
      if (id) {
        await requisicao("PUT", "/api/categorias/" + encodeURIComponent(id), corpo);
      } else {
        await requisicao("POST", "/api/categorias", corpo);
      }
      categoriaLimpar();
      await categoriaAtualizarLista();
    } catch (e) {
      setMsg(e.message || String(e), true);
    }
  });

  function livroLimpar() {
    document.getElementById("livroId").value = "";
    document.getElementById("livroTitulo").value = "";
    document.getElementById("livroIsbn").value = "";
    document.getElementById("livroAno").value = "";
    document.getElementById("livroAutorId").value = "";
    document.getElementById("livroCatIds").value = "";
  }

  async function livroAtualizarLista() {
    try {
      setMsg("Carregando…", false);
      var lista = await requisicao("GET", "/api/livros");
      var ul = document.getElementById("listaLivros");
      ul.innerHTML = "";
      (lista || []).forEach(function (l) {
        var nomeAutor = l.autor && l.autor.nome ? l.autor.nome : "?";
        var nomesCategorias =
          l.categorias && l.categorias.length
            ? l.categorias.map(function (c) {
                return c.nome;
              }).join(", ")
            : "—";
        var li = document.createElement("li");
        li.innerHTML =
          "<strong>#" +
          l.id +
          "</strong> " +
          escapeHtml(l.titulo) +
          " — ISBN " +
          escapeHtml(l.isbn) +
          " (" +
          l.anoPublicacao +
          ")<br/>Autor: " +
          escapeHtml(nomeAutor) +
          " | Categorias: " +
          escapeHtml(nomesCategorias) +
          '<div class="row-actions">' +
          '<button type="button" data-edit="livro" data-id="' +
          l.id +
          '">Editar</button>' +
          '<button type="button" class="btn-del" data-del="livro" data-id="' +
          l.id +
          '">Excluir</button>' +
          "</div>";
        ul.appendChild(li);
      });
      setMsg("", false);
    } catch (e) {
      setMsg(e.message || String(e), true);
    }
  }

  document.getElementById("livroNovo").addEventListener("click", livroLimpar);
  document.getElementById("livroRefresh").addEventListener("click", livroAtualizarLista);

  document.getElementById("formLivro").addEventListener("submit", async function (ev) {
    ev.preventDefault();
    var id = document.getElementById("livroId").value.trim();
    var listaIds = idsCategorias(document.getElementById("livroCatIds").value);
    var corpo = {
      titulo: document.getElementById("livroTitulo").value.trim(),
      isbn: document.getElementById("livroIsbn").value.trim(),
      anoPublicacao: parseInt(document.getElementById("livroAno").value, 10),
      autorId: parseInt(document.getElementById("livroAutorId").value, 10),
      categoriaIds: listaIds.length ? listaIds : [],
    };
    try {
      if (id) {
        await requisicao("PUT", "/api/livros/" + encodeURIComponent(id), corpo);
      } else {
        await requisicao("POST", "/api/livros", corpo);
      }
      livroLimpar();
      await livroAtualizarLista();
    } catch (e) {
      setMsg(e.message || String(e), true);
    }
  });

  document.body.addEventListener("click", async function (ev) {
    var t = ev.target;
    if (!(t instanceof HTMLElement)) return;

    if (t.getAttribute("data-del") === "autor") {
      var aid = t.getAttribute("data-id");
      if (!confirm("Excluir autor #" + aid + "?")) return;
      try {
        await requisicao("DELETE", "/api/autores/" + encodeURIComponent(aid));
        await autorAtualizarLista();
      } catch (e) {
        setMsg(e.message || String(e), true);
      }
    }
    if (t.getAttribute("data-del") === "categoria") {
      var cid = t.getAttribute("data-id");
      if (!confirm("Excluir categoria #" + cid + "?")) return;
      try {
        await requisicao("DELETE", "/api/categorias/" + encodeURIComponent(cid));
        await categoriaAtualizarLista();
      } catch (e) {
        setMsg(e.message || String(e), true);
      }
    }
    if (t.getAttribute("data-del") === "livro") {
      var lid = t.getAttribute("data-id");
      if (!confirm("Excluir livro #" + lid + "?")) return;
      try {
        await requisicao("DELETE", "/api/livros/" + encodeURIComponent(lid));
        await livroAtualizarLista();
      } catch (e) {
        setMsg(e.message || String(e), true);
      }
    }

    if (t.getAttribute("data-edit") === "autor") {
      var ida = t.getAttribute("data-id");
      try {
        var a = await requisicao("GET", "/api/autores/" + encodeURIComponent(ida));
        document.getElementById("autorId").value = a.id;
        document.getElementById("autorNome").value = a.nome || "";
        document.getElementById("autorPais").value = a.paisOrigem || "";
        setMsg("", false);
      } catch (e) {
        setMsg(e.message || String(e), true);
      }
    }
    if (t.getAttribute("data-edit") === "categoria") {
      var idc = t.getAttribute("data-id");
      try {
        var c = await requisicao("GET", "/api/categorias/" + encodeURIComponent(idc));
        document.getElementById("categoriaId").value = c.id;
        document.getElementById("categoriaNome").value = c.nome || "";
        setMsg("", false);
      } catch (e) {
        setMsg(e.message || String(e), true);
      }
    }
    if (t.getAttribute("data-edit") === "livro") {
      var idl = t.getAttribute("data-id");
      try {
        var l = await requisicao("GET", "/api/livros/" + encodeURIComponent(idl));
        document.getElementById("livroId").value = l.id;
        document.getElementById("livroTitulo").value = l.titulo || "";
        document.getElementById("livroIsbn").value = l.isbn || "";
        document.getElementById("livroAno").value = l.anoPublicacao != null ? String(l.anoPublicacao) : "";
        document.getElementById("livroAutorId").value =
          l.autor && l.autor.id != null ? String(l.autor.id) : "";
        var ids =
          l.categorias && l.categorias.length
            ? l.categorias
                .map(function (x) {
                  return x.id;
                })
                .join(", ")
            : "";
        document.getElementById("livroCatIds").value = ids;
        setMsg("", false);
      } catch (e) {
        setMsg(e.message || String(e), true);
      }
    }
  });

  function escapeHtml(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  autorAtualizarLista();
  categoriaAtualizarLista();
  livroAtualizarLista();
})();
