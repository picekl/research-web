const profile = {
  ...window.profileBase,
  publications: window.publicationsData,
  selectedPublications: window.selectedPublicationTitles
};

const { createProjectCard, createPublicationCard, createToolCard, linkIcons, setAttr, setHtml, setText, setupReveal } = window.siteUtils;

function renderLinks() {
  const container = document.getElementById("hero-links");
  if (!container) return;

  profile.links.forEach((link) => {
    const anchor = document.createElement("a");
    anchor.className = "profile-link";
    anchor.href = link.href;
    anchor.setAttribute("aria-label", link.label);
    anchor.setAttribute("title", link.label);
    anchor.innerHTML = linkIcons[link.label] || `<span>${link.label}</span>`;
    container.appendChild(anchor);
  });
}

function renderInterests() {
  const container = document.getElementById("interests-list");
  if (!container) return;

  profile.interests.forEach((item) => {
    const article = document.createElement("article");
    article.className = "interest-card";
    article.setAttribute("data-reveal", "");
    article.innerHTML = `<h3>${item.title}</h3><p>${item.body}</p>`;
    container.appendChild(article);
  });
}

function renderProjects() {
  const container = document.getElementById("projects-list");
  if (!container) return;

  profile.projects.slice(0, 4).forEach((project) => {
    const article = createProjectCard(project);
    article.setAttribute("data-reveal", "");
    container.appendChild(article);
  });
}

function renderTools() {
  const container = document.getElementById("tools-list");
  if (!container) return;

  (profile.tools || []).forEach((tool) => {
    const article = createToolCard(tool);
    article.setAttribute("data-reveal", "");
    container.appendChild(article);
  });
}

function renderPublications() {
  const container = document.getElementById("publications-list");
  if (!container) return;

  const selectedTitles = new Set(profile.selectedPublications || []);
  const selectedPublications =
    selectedTitles.size > 0
      ? profile.publications.filter((publication) => selectedTitles.has(publication.title))
      : profile.publications.slice(0, 4);

  selectedPublications.forEach((publication) => {
    const article = createPublicationCard(publication, { showResources: true });
    article.setAttribute("data-reveal", "");
    container.appendChild(article);
  });
}

function init() {
  setText("nav-name", profile.name);
  setText("nav-role", profile.role);
  setText("hero-kicker", profile.kicker);
  setText("hero-name", profile.name);
  setText("hero-summary", profile.summary);
  setText("fact-focus", profile.focus);
  setText("fact-location", profile.location);
  setText("fact-collab", profile.collaboration);
  setHtml("bio-paragraph-1", profile.bio[0]);
  setText("contact-copy", profile.contactCopy);
  setText("contact-email", profile.email);
  setAttr("contact-email", "href", `mailto:${profile.email}`);
  setAttr("profile-image", "src", profile.image);
  setAttr("profile-image", "alt", `Portrait of ${profile.name}`);

  renderLinks();
  renderInterests();
  renderProjects();
  renderTools();
  renderPublications();
  setupReveal();
}

init();
