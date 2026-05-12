const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu-principal");

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  menu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

const articlePage = document.querySelector("#article-page");
const relatedGrid = document.querySelector("#related-grid");

if (articlePage && window.artigosUEP) {
  const params = new URLSearchParams(window.location.search);
  const articleId = params.get("id") || window.artigosUEP[0].id;
  const article = window.artigosUEP.find((item) => item.id === articleId) || window.artigosUEP[0];
  const related = window.artigosUEP.filter((item) => item.id !== article.id).slice(0, 3);

  document.title = `${article.titulo} | UEP Cândido Pinto`;

  articlePage.innerHTML = `
    <div class="article-kicker">
      <span class="section-label">${article.editoria}</span>
      <time>${article.data}</time>
    </div>
    <h1>${article.titulo}</h1>
    <p class="article-summary">${article.resumo}</p>
    <img class="article-main-image" src="${article.imagem}" alt="Imagem original do artigo ${article.titulo}" />
    <div class="article-body">
      ${article.corpo.map((paragraph) => `<p>${paragraph}</p>`).join("")}
    </div>
    <a class="button button-secondary" href="index.html#posts">Voltar aos artigos</a>
  `;

  if (relatedGrid) {
    relatedGrid.innerHTML = related
      .map(
        (item) => `
          <a class="related-card" href="artigo.html?id=${item.id}">
            <img src="${item.imagem}" alt="Imagem original do artigo ${item.titulo}" />
            <span>${item.data}</span>
            <strong>${item.titulo}</strong>
          </a>
        `,
      )
      .join("");
  }
}
