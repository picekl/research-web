const profile = {
  ...window.profileBase,
  publications: window.publicationsData
};

const { createPublicationCard } = window.siteUtils;

let activePublicationTopics = new Set();
let activePublicationYear = "all";
let activePublicationType = "all";

function createProjectCard(project) {
  const article = document.createElement("article");
  article.className = "project-card";
  article.innerHTML = `
    <div class="project-card__meta">${project.meta}</div>
    <h3>${project.title}</h3>
    <p>${project.question}</p>
    <a class="project-card__link" href="${project.href}">Learn more</a>
  `;
  return article;
}

function createNewsItem(item) {
  const article = document.createElement("article");
  article.className = "timeline-item";
  article.innerHTML = `
    <time datetime="${item.date}">${item.date}</time>
    <div class="timeline-item__body">
      <p>${item.text}</p>
      ${item.href ? `<a class="project-card__link" href="${item.href}">Read more</a>` : ""}
    </div>
  `;
  return article;
}

function groupPublicationsByYear(publications) {
  return publications.reduce((accumulator, publication) => {
    const items = accumulator.get(publication.year) || [];
    items.push(publication);
    accumulator.set(publication.year, items);
    return accumulator;
  }, new Map());
}

function renderPublicationsByYear(container, publications) {
  container.innerHTML = "";
  const grouped = groupPublicationsByYear(publications);

  Array.from(grouped.entries())
    .sort((left, right) => Number(right[0]) - Number(left[0]))
    .forEach(([year, items]) => {
      const section = document.createElement("section");
      section.className = "publication-year-group";

      const header = document.createElement("div");
      header.className = "publication-year-group__header";

      const heading = document.createElement("h2");
      heading.className = "publication-year-group__year";
      heading.textContent = String(year);

      header.appendChild(heading);
      section.appendChild(header);

      const list = document.createElement("div");
      list.className = "stack-list";
      items.forEach((item) => list.appendChild(createPublicationCard(item)));
      section.appendChild(list);
      container.appendChild(section);
    });

  if (publications.length === 0) {
    const emptyState = document.createElement("p");
    emptyState.className = "publication-empty-state";
    emptyState.textContent = "No publications match the selected filters.";
    container.appendChild(emptyState);
  }
}

function getFilteredPublications() {
  return profile.publications.filter((publication) => {
    const yearMatches =
      activePublicationYear === "all" || String(publication.year) === String(activePublicationYear);
    const publicationType = publication.publicationType || "Conference";
    const typeMatches =
      activePublicationType === "all" || publicationType === activePublicationType;
    const topicMatches =
      activePublicationTopics.size === 0 ||
      window.publicationFilterGroups.some(
        (group) =>
          activePublicationTopics.has(group.label) &&
          (publication.topics || []).some((topic) => group.matches.includes(topic))
      );

    return yearMatches && typeMatches && topicMatches;
  });
}

function renderPublicationFilters(container, listContainer) {
  if (!container) return;
  container.innerHTML = "";

  const allButton = document.createElement("button");
  allButton.type = "button";
  allButton.className = "publication-filter";
  if (activePublicationTopics.size === 0) allButton.classList.add("is-active");
  allButton.textContent = "All";
  allButton.addEventListener("click", () => {
    activePublicationTopics = new Set();
    renderPublicationFilters(container, listContainer);
    renderPublicationsByYear(listContainer, getFilteredPublications());
  });
  container.appendChild(allButton);

  window.publicationFilterGroups.forEach((group) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "publication-filter";
    if (activePublicationTopics.has(group.label)) button.classList.add("is-active");
    button.textContent = group.label;
    button.addEventListener("click", () => {
      if (activePublicationTopics.has(group.label)) {
        activePublicationTopics.delete(group.label);
      } else {
        activePublicationTopics.add(group.label);
      }

      renderPublicationFilters(container, listContainer);
      renderPublicationsByYear(listContainer, getFilteredPublications());
    });
    container.appendChild(button);
  });
}

function renderSelectFilter({ container, id, labelText, value, options, onChange }) {
  if (!container) return;
  container.innerHTML = "";

  const label = document.createElement("label");
  label.className = "publication-year-filter__label";
  label.setAttribute("for", id);
  label.textContent = labelText;

  const select = document.createElement("select");
  select.id = id;
  select.className = "publication-year-filter__select";

  options.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.value;
    option.textContent = item.label;
    select.appendChild(option);
  });

  select.value = value;
  select.addEventListener("change", (event) => onChange(event.target.value));

  container.appendChild(label);
  container.appendChild(select);
}

function renderArchive() {
  const container = document.getElementById("archive-list");
  const page = window.location.pathname.split("/").pop();
  if (!container) return;

  if (page === "projects.html") {
    profile.projects.forEach((item) => container.appendChild(createProjectCard(item)));
    return;
  }

  if (page === "publications.html") {
    renderSelectFilter({
      container: document.getElementById("publication-year-filter"),
      id: "publication-year-select",
      labelText: "Year",
      value: activePublicationYear,
      options: [
        { value: "all", label: "All years" },
        ...[...new Set(profile.publications.map((publication) => publication.year))]
          .sort((left, right) => Number(right) - Number(left))
          .map((year) => ({ value: String(year), label: String(year) }))
      ],
      onChange: (nextValue) => {
        activePublicationYear = nextValue;
        renderPublicationsByYear(container, getFilteredPublications());
      }
    });

    renderSelectFilter({
      container: document.getElementById("publication-type-filter"),
      id: "publication-type-select",
      labelText: "Type",
      value: activePublicationType,
      options: [
        { value: "all", label: "All types" },
        { value: "Journal", label: "Journal" },
        { value: "Conference", label: "Conference" }
      ],
      onChange: (nextValue) => {
        activePublicationType = nextValue;
        renderPublicationsByYear(container, getFilteredPublications());
      }
    });

    renderPublicationFilters(document.getElementById("publication-filters"), container);
    renderPublicationsByYear(container, getFilteredPublications());
    return;
  }

  if (page === "news.html") {
    profile.news.forEach((item) => container.appendChild(createNewsItem(item)));
  }
}

renderArchive();
