window.siteUtils = (() => {
  const linkIcons = {
    GitHub: `
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.014-1.7-2.782.605-3.369-1.344-3.369-1.344-.455-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.893 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .269.18.58.688.481A10.02 10.02 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z"/></svg>
    `,
    LinkedIn: `
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.38a1.56 1.56 0 0 1 0 3.12ZM8.5 18.5H5.38V9.75H8.5v8.75ZM18.62 18.5H15.5v-4.26c0-1.02-.02-2.33-1.42-2.33-1.42 0-1.64 1.11-1.64 2.26v4.33H9.31V9.75h3v1.19h.04c.42-.79 1.44-1.62 2.97-1.62 3.17 0 3.75 2.09 3.75 4.8v4.38Z"/></svg>
    `,
    "Google Scholar": `
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3Zm-6.98 9.18V16c0 2.76 3.13 5 6.98 5S19 18.76 19 16v-3.82l-7 3.82-6.98-3.82Z"/></svg>
    `,
    Kaggle: `
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.37 4.5v8.48l4.08-4.15h3.88l-4.74 4.71L18 19.5h-3.87l-4.76-5.33V19.5H6.5v-15h2.87Z"/></svg>
    `
  };

  function setText(id, value) {
    const node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  function setHtml(id, value) {
    const node = document.getElementById(id);
    if (node) node.innerHTML = value;
  }

  function setAttr(id, attr, value) {
    const node = document.getElementById(id);
    if (node) node.setAttribute(attr, value);
  }

  function highlightName(text) {
    if (!text) return "";
    return text.replaceAll("Lukas Picek", "<strong>Lukas Picek</strong>");
  }

  function createPublicationCard(publication) {
    const article = document.createElement("article");
    article.className = "publication-item";
    article.innerHTML = `
      ${publication.note ? `<div class="publication-item__badge"><span class="publication-item__badge-icon" aria-hidden="true">★</span><span>${publication.note}</span></div>` : ""}
      <h3>${publication.title}</h3>
      <p class="publication-item__meta">${publication.venue}</p>
      <p class="publication-item__authors">${highlightName(publication.authors)}</p>
      ${publication.href ? `<a class="project-card__link" href="${publication.href}">Open publication</a>` : ""}
    `;
    return article;
  }

  function setupReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
  }

  return {
    createPublicationCard,
    highlightName,
    linkIcons,
    setAttr,
    setHtml,
    setText,
    setupReveal
  };
})();
