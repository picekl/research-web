const profile = {
  ...window.profileBase,
  news: window.newsData,
  publications: window.publicationsData
};

const { createNewsItem, createProjectCard, createPublicationCard } = window.siteUtils;

let activePublicationTopics = new Set();
let activePublicationYear = "all";
let activePublicationType = "all";

function getNewsYear(dateText) {
  const match = String(dateText || "").match(/(\d{4})/);
  return match ? match[1] : "";
}

function getNewsSortValue(dateText) {
  const text = String(dateText || "").trim();
  const yearMatch = text.match(/(\d{4})/);
  const year = yearMatch ? Number(yearMatch[1]) : 0;
  const monthMap = {
    jan: 1,
    january: 1,
    feb: 2,
    february: 2,
    mar: 3,
    march: 3,
    apr: 4,
    april: 4,
    may: 5,
    jun: 6,
    june: 6,
    jul: 7,
    july: 7,
    aug: 8,
    august: 8,
    sep: 9,
    sept: 9,
    september: 9,
    oct: 10,
    october: 10,
    nov: 11,
    november: 11,
    dec: 12,
    december: 12
  };
  const monthMatch = text.toLowerCase().match(/([a-z.]+)/);
  const monthKey = monthMatch ? monthMatch[1].replace(".", "") : "";
  const month = monthMap[monthKey] || 0;
  return year * 100 + month;
}

function getSortedNews(items) {
  return [...(items || [])].sort((left, right) => getNewsSortValue(right.date) - getNewsSortValue(left.date));
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
  const navName = document.getElementById("nav-name");
  const navRole = document.getElementById("nav-role");
  const navLocation = document.getElementById("nav-location");
  const container = document.getElementById("archive-list");
  const page = window.location.pathname.split("/").pop();
  if (!container) return;

  if (navName) navName.textContent = profile.name;
  if (navRole) navRole.textContent = profile.role;
  if (navLocation) navLocation.textContent = "Cambridge, MA, USA";

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
    let currentYear = "";
    getSortedNews(profile.news).forEach((item) => {
      const year = getNewsYear(item.date);
      if (year && year !== currentYear) {
        const divider = document.createElement("div");
        divider.className = "timeline-year-divider";
        divider.textContent = year;
        container.appendChild(divider);
        currentYear = year;
      }

      const article = createNewsItem(item, { compact: true });
      container.appendChild(article);
    });
  }
}

renderArchive();
