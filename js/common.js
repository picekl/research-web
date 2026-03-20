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

  const projectLinkIcons = {
    website: `
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2Zm6.92 9h-3.01a15.59 15.59 0 0 0-1.3-5.02A8.03 8.03 0 0 1 18.92 11ZM12 4.04c.83 1.1 1.86 3.42 2.08 6.96H9.92C10.14 7.46 11.17 5.14 12 4.04ZM9.39 5.98A15.59 15.59 0 0 0 8.09 11H5.08a8.03 8.03 0 0 1 4.31-5.02ZM4.26 13h3.83a15.61 15.61 0 0 0 1.3 5.02A8.04 8.04 0 0 1 4.26 13Zm5.66 0h4.16c-.22 3.54-1.25 5.86-2.08 6.96-.83-1.1-1.86-3.42-2.08-6.96Zm4.69 5.02A15.61 15.61 0 0 0 15.91 13h3.83a8.04 8.04 0 0 1-5.13 5.02Z"/></svg>
    `,
    apple: `
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.67 12.37c.01 2.64 2.32 3.52 2.35 3.53-.02.06-.37 1.27-1.22 2.51-.73 1.07-1.49 2.14-2.68 2.16-1.17.02-1.55-.69-2.89-.69-1.34 0-1.76.67-2.86.71-1.14.04-2.01-1.14-2.75-2.2-1.5-2.17-2.64-6.13-1.11-8.79.76-1.32 2.12-2.16 3.59-2.18 1.12-.02 2.18.75 2.89.75.71 0 2.03-.92 3.42-.79.58.02 2.2.23 3.24 1.74-.08.05-1.94 1.13-1.93 3.25ZM13.95 5.25c.61-.74 1.02-1.77.91-2.8-.88.04-1.94.59-2.57 1.33-.57.66-1.06 1.72-.93 2.73.98.08 1.98-.5 2.59-1.26Z"/></svg>
    `,
    android: `
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.6 9.48 19.03 7a.5.5 0 1 0-.87-.5l-1.46 2.52A8.12 8.12 0 0 0 12 7.5c-1.7 0-3.28.52-4.59 1.4L5.95 6.5a.5.5 0 0 0-.87.5l1.43 2.48A6.77 6.77 0 0 0 3 15h18a6.77 6.77 0 0 0-3.4-5.52ZM8.5 12.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm7 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM7 16.5v3a1.5 1.5 0 0 0 3 0v-3H7Zm7 0v3a1.5 1.5 0 0 0 3 0v-3h-3Zm-6 0h8v4a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-4Z"/></svg>
    `,
    reference: `
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 3v1.56c1.94.26 3.34 1.45 3.68 3.23h-2.34c-.23-.88-.97-1.38-2.06-1.38-1.18 0-1.95.53-1.95 1.34 0 .75.53 1.15 2.3 1.54 2.8.62 4.39 1.53 4.39 3.98 0 2.09-1.56 3.52-4.02 3.82V21h-2.02v-1.61c-2.19-.32-3.74-1.63-4-3.72h2.37c.22 1 1.05 1.57 2.31 1.57 1.3 0 2.13-.56 2.13-1.43 0-.79-.49-1.2-2.18-1.59-3.06-.71-4.48-1.75-4.48-4.01 0-1.95 1.47-3.4 3.87-3.69V3h2.02Z"/></svg>
    `,
    github: `
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.014-1.7-2.782.605-3.369-1.344-3.369-1.344-.455-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.893 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .269.18.58.688.481A10.02 10.02 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z"/></svg>
    `
  };

  const publicationResourceIcons = {
    website: `
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2Zm6.92 9h-3.01a15.59 15.59 0 0 0-1.3-5.02A8.03 8.03 0 0 1 18.92 11ZM12 4.04c.83 1.1 1.86 3.42 2.08 6.96H9.92C10.14 7.46 11.17 5.14 12 4.04ZM9.39 5.98A15.59 15.59 0 0 0 8.09 11H5.08a8.03 8.03 0 0 1 4.31-5.02ZM4.26 13h3.83a15.61 15.61 0 0 0 1.3 5.02A8.04 8.04 0 0 1 4.26 13Zm5.66 0h4.16c-.22 3.54-1.25 5.86-2.08 6.96-.83-1.1-1.86-3.42-2.08-6.96Zm4.69 5.02A15.61 15.61 0 0 0 15.91 13h3.83a8.04 8.04 0 0 1-5.13 5.02Z"/></svg>
    `,
    github: `
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.014-1.7-2.782.605-3.369-1.344-3.369-1.344-.455-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.893 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .269.18.58.688.481A10.02 10.02 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z"/></svg>
    `,
    kaggle: `
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.37 4.5v8.48l4.08-4.15h3.88l-4.74 4.71L18 19.5h-3.87l-4.76-5.33V19.5H6.5v-15h2.87Z"/></svg>
    `,
    dataset: `
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c-4.97 0-9 1.57-9 3.5S7.03 10 12 10s9-1.57 9-3.5S16.97 3 12 3Zm-9 6v4.5C3 15.43 7.03 17 12 17s9-1.57 9-3.5V9c-1.91 1.47-5.45 2.25-9 2.25S4.91 10.47 3 9Zm0 7v1.5C3 19.43 7.03 21 12 21s9-1.57 9-3.5V16c-1.91 1.47-5.45 2.25-9 2.25S4.91 17.47 3 16Z"/></svg>
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

  function createLinkedCard(item, className) {
    const article = document.createElement("article");
    article.className = className;
    const links = item.links || (item.href ? [{ type: "website", href: item.href }] : []);
    const linksMarkup =
      links.length > 0
        ? `<div class="${className}__links">
            ${links
              .map(
                (link) => `
                  <a
                    class="${className}__icon-link"
                    href="${link.href}"
                    aria-label="${
                      link.type === "reference"
                        ? "Funding reference"
                        : link.type === "apple"
                          ? "Apple App Store"
                          : link.type === "android"
                            ? "Google Play"
                        : link.type === "kaggle"
                          ? "Kaggle dataset"
                        : link.type === "github"
                          ? "GitHub repository"
                          : "Project website"
                    }"
                    title="${
                      link.type === "reference"
                        ? "Funding reference"
                        : link.type === "apple"
                          ? "Apple App Store"
                          : link.type === "android"
                            ? "Google Play"
                        : link.type === "kaggle"
                          ? "Kaggle dataset"
                        : link.type === "github"
                          ? "GitHub repository"
                          : "Project website"
                    }"
                  >
                    ${projectLinkIcons[link.type] || projectLinkIcons.website}
                  </a>
                `
              )
              .join("")}
          </div>`
        : "";

    article.innerHTML = `
      <div class="${className}__header">
        <h3>${item.title}</h3>
        ${linksMarkup}
      </div>
      <p>${item.question}</p>
    `;

    return article;
  }

  function createProjectCard(project) {
    return createLinkedCard(project, "project-card");
  }

  function createToolCard(tool) {
    return createLinkedCard(tool, "tool-card");
  }

  function createPublicationCard(publication, options = {}) {
    const article = document.createElement("article");
    article.className = "publication-item";
    const companionLinks =
      options.showResources && Array.isArray(publication.resources) ? publication.resources : [];
    const linksMarkup =
      publication.href || companionLinks.length > 0
        ? `<div class="publication-item__links">
            ${
              publication.href
                ? `<a class="project-card__link" href="${publication.href}">Open publication</a>`
                : ""
            }
            ${
              companionLinks.length > 0
                ? `<div class="publication-item__resource-links">
                    ${companionLinks
                      .map(
                        (resource) => `
                          <a
                            class="publication-item__resource-link"
                            href="${resource.href}"
                            aria-label="${resource.label}"
                            title="${resource.label}"
                          >
                            ${publicationResourceIcons[resource.type] || publicationResourceIcons.website}
                          </a>
                        `
                      )
                      .join("")}
                  </div>`
                : ""
            }
          </div>`
        : "";
    article.innerHTML = `
      ${publication.note ? `<div class="publication-item__badge"><span class="publication-item__badge-icon" aria-hidden="true">★</span><span>${publication.note}</span></div>` : ""}
      <h3>${publication.title}</h3>
      <p class="publication-item__meta">${publication.venue}</p>
      <p class="publication-item__authors">${highlightName(publication.authors)}</p>
      ${linksMarkup}
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
    createProjectCard,
    createToolCard,
    createPublicationCard,
    highlightName,
    linkIcons,
    projectLinkIcons,
    setAttr,
    setHtml,
    setText,
    setupReveal
  };
})();
