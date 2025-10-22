document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav a");
  const sections = document.querySelectorAll("section");

  // Função para alternar seções
  function showSection(id) {
    sections.forEach(sec => sec.classList.add("hidden"));
    const target = document.querySelector(id);
    if (target) {
      target.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" }); // força a rolagem ao topo
    }
  }

  // Detecta cliques no menu
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const id = link.getAttribute("href");
      showSection(id);
    });
  });

  // Força a página inicial ao carregar
  showSection("#home");
});
