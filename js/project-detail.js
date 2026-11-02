const loadingState = document.querySelector('[data-project-loading]');
const projectContent = document.querySelector('[data-project-content]');
const errorState = document.querySelector('[data-project-error]');

const setText = (selector, value) => {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
};

const renderProject = (project, projects) => {
  document.title = `${project.title} | X-Tra`;

  const heroImage = document.querySelector('[data-project-image]');
  heroImage.src = project.heroImage;
  heroImage.alt = project.heroAlt;

  setText('[data-project-category]', project.category);
  setText('[data-project-title]', project.title);
  setText('[data-project-tagline]', project.tagline);
  setText('[data-breadcrumb-current]', project.title);
  setText('[data-project-heading]', project.title);
  setText('[data-project-description]', project.description);
  setText('[data-project-year]', project.year);
  setText('[data-project-scope]', project.scope);
  setText('[data-project-style]', project.style);
  setText('[data-project-challenge]', project.challenge);
  setText('[data-project-solution]', project.solution);

  const features = document.querySelector('[data-project-features]');
  project.features.forEach(feature => {
    const item = document.createElement('li');
    item.textContent = feature;
    features.append(item);
  });

  const gallery = document.querySelector('[data-project-gallery]');
  project.gallery.forEach(image => {
    const figure = document.createElement('figure');
    const element = document.createElement('img');
    element.src = image.src;
    element.alt = image.alt;
    element.loading = 'lazy';
    figure.append(element);
    gallery.append(figure);
  });

  const projectIndex = projects.findIndex(item => item.slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const nextLink = document.querySelector('[data-next-project]');
  nextLink.href = `project-detail.html?project=${encodeURIComponent(nextProject.slug)}`;
  nextLink.setAttribute('aria-label', `Next project: ${nextProject.title}`);

  loadingState.hidden = true;
  projectContent.hidden = false;
};

const showError = error => {
  loadingState.hidden = true;
  errorState.hidden = false;
  if (window.location.protocol === 'file:') {
    setText('[data-project-error-message]', 'Project data uses fetch, so this site needs to be opened through a local or hosted web server.');
  }
  console.error(error);
};

const loadProject = async () => {
  try {
    const response = await fetch('../data/projects.json');
    if (!response.ok) throw new Error(`Project data request failed with status ${response.status}.`);

    const projects = await response.json();
    const requestedSlug = new URLSearchParams(window.location.search).get('project') || projects[0]?.slug;
    const project = projects.find(item => item.slug === requestedSlug);
    if (!project) throw new Error(`No project found for slug: ${requestedSlug}`);

    renderProject(project, projects);
  } catch (error) {
    showError(error);
  }
};

loadProject();
