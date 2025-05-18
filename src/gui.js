import { getProjectsList, createProject, updateProject } from "./projects";
import { createTodo, getTodosList, updateTodo } from "./todos";
import editIcon from "./resources/edit-icon.png";
const container = document.querySelector("div#container");

const sidebar = document.createElement("div");
sidebar.setAttribute("id", "sidebar");
container.appendChild(sidebar);
const logoContainer = document.createElement("div");
logoContainer.textContent = "Todo List";
logoContainer.setAttribute("id", "logo-container");
sidebar.appendChild(logoContainer);
const navBar = document.createElement("nav");
navBar.setAttribute("id", "nav-bar");
sidebar.appendChild(navBar);
const todosButton = document.createElement("p");
todosButton.classList.add("nav-headings");
todosButton.textContent = "Todos";
todosButton.addEventListener("click", () => {
  showTodosList("all");
});
navBar.appendChild(todosButton);
const projectsButton = document.createElement("p");
projectsButton.classList.add("nav-headings");
projectsButton.textContent = "Projects";
navBar.appendChild(projectsButton);

export function showProjectList() {
  if (document.querySelector("#list-of-projects")) {
    navBar.removeChild(document.querySelector("#list-of-projects"));
  }
  const listOfProjects = document.createElement("div");
  listOfProjects.setAttribute("id", "list-of-projects");
  navBar.appendChild(listOfProjects);
  const projectNodesArray = [];
  for (let i = 0; i < getProjectsList().length; i++) {
    const projectID = getProjectsList()[i].id;
    projectNodesArray[i] = document.createElement("div");
    projectNodesArray[i].classList.add("projects");
    listOfProjects.appendChild(projectNodesArray[i]);
    const projectTitle = document.createElement("span");
    projectTitle.textContent = getProjectsList()[i].title;
    projectTitle.addEventListener("click", () => {
      showTodosList(projectID);
    });
    projectNodesArray[i].appendChild(projectTitle);
    const projectEditIcon = document.createElement("img");
    projectEditIcon.classList.add("project-edit-icon");
    projectEditIcon.src = editIcon;
    projectEditIcon.addEventListener("click", () => {
      openProjectForm("update", getProjectsList()[i].id);
      document.querySelector("#project-title-input").value =
        getProjectsList()[i].title;
      document.querySelector("#project-description-input").value =
        getProjectsList()[i].description;
    });
    projectNodesArray[i].appendChild(projectEditIcon);
  }
}

const createButtonsContainer = document.createElement("div");
createButtonsContainer.setAttribute("id", "create-buttons-container");
sidebar.appendChild(createButtonsContainer);
const createTodoButton = document.createElement("button");
createTodoButton.classList.add("create-buttons");
createTodoButton.textContent = "Add To-do";
createTodoButton.addEventListener("click", (event) => {
  event.preventDefault();
  openTodoForm("create");
});
createButtonsContainer.appendChild(createTodoButton);
const createProjectButton = document.createElement("button");
createProjectButton.classList.add("create-buttons");
createProjectButton.textContent = "Add project";
createProjectButton.addEventListener("click", (event) => {
  event.preventDefault();
  openProjectForm("create");
});
createButtonsContainer.appendChild(createProjectButton);

const content = document.createElement("div");
content.setAttribute("id", "content");
container.appendChild(content);

function openTodoForm(action, todoUniqueId) {
  //todoUniqueId is only required for action === "update"
  if (document.querySelector("#todo-form-container")) {
    content.removeChild(document.querySelector("#todo-form-container"));
  }
  const todoFormContainer = document.createElement("div");
  todoFormContainer.classList.add("form-containers");
  todoFormContainer.setAttribute("id", "todo-form-container");
  content.appendChild(todoFormContainer);

  const todoForm = document.createElement("form");
  todoForm.classList.add("forms");
  todoFormContainer.appendChild(todoForm);

  const titleContainer = document.createElement("div");
  titleContainer.classList.add("text-input-containers");
  todoForm.appendChild(titleContainer);
  const titleInputLabel = document.createElement("label");
  titleInputLabel.classList.add("text-input-labels");
  titleInputLabel.setAttribute("for", "title-input");
  titleInputLabel.textContent = "Title";
  titleContainer.appendChild(titleInputLabel);
  const titleInput = document.createElement("input");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("name", "title");
  titleInput.setAttribute("id", "title-input");
  titleInput.classList.add("text-inputs");
  titleContainer.appendChild(titleInput);

  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add("text-input-containers");
  todoForm.appendChild(descriptionContainer);
  const descriptionInputLabel = document.createElement("label");
  descriptionInputLabel.classList.add("text-input-labels");
  descriptionInputLabel.setAttribute("for", "description-input");
  descriptionInputLabel.textContent = "Description";
  descriptionContainer.appendChild(descriptionInputLabel);
  const descriptionInput = document.createElement("input");
  descriptionInput.setAttribute("type", "text");
  descriptionInput.setAttribute("name", "description");
  descriptionInput.setAttribute("id", "description-input");
  descriptionInput.classList.add("text-inputs");
  descriptionContainer.appendChild(descriptionInput);

  const projectContainer = document.createElement("div");
  projectContainer.setAttribute("id", "project-container");
  todoForm.appendChild(projectContainer);
  const projectSelectLabel = document.createElement("label");
  projectSelectLabel.setAttribute("for", "project-select");
  projectSelectLabel.setAttribute("id", "project-select-label");
  projectSelectLabel.textContent = "Project";
  projectContainer.appendChild(projectSelectLabel);
  const projectSelect = document.createElement("select");
  projectSelect.setAttribute("id", "project-select");
  projectSelect.setAttribute("name", "project");
  projectContainer.appendChild(projectSelect);
  const projectOptions = [];
  for (let i = 0; i < getProjectsList().length; i++) {
    projectOptions[i] = document.createElement("option");
    projectOptions[i].setAttribute("value", getProjectsList()[i].id);
    projectOptions[i].textContent = getProjectsList()[i].title;
    projectSelect.appendChild(projectOptions[i]);
  }

  const dueDateContainer = document.createElement("div");
  dueDateContainer.setAttribute("id", "due-date-container");
  todoForm.appendChild(dueDateContainer);
  const dueDateInputLabel = document.createElement("label");
  dueDateInputLabel.setAttribute("for", "due-date-input");
  dueDateInputLabel.setAttribute("id", "due-date-input-label");
  dueDateInputLabel.textContent = "Due date";
  dueDateContainer.appendChild(dueDateInputLabel);
  const dueDateInput = document.createElement("input");
  dueDateInput.setAttribute("type", "date");
  dueDateInput.setAttribute("id", "due-date-input");
  dueDateInput.setAttribute("name", "due_date");
  dueDateContainer.appendChild(dueDateInput);

  const priorityContainer = document.createElement("div");
  priorityContainer.setAttribute("id", "priority-container");
  todoForm.appendChild(priorityContainer);
  const prioritySelectLabel = document.createElement("label");
  prioritySelectLabel.setAttribute("for", "priority-select");
  prioritySelectLabel.setAttribute("id", "priority-select-label");
  prioritySelectLabel.textContent = "Priority";
  priorityContainer.appendChild(prioritySelectLabel);
  const prioritySelect = document.createElement("select");
  prioritySelect.setAttribute("id", "priority-select");
  prioritySelect.setAttribute("name", "priority");
  priorityContainer.appendChild(prioritySelect);
  const priorityOne = document.createElement("option");
  priorityOne.setAttribute("id", "priority-one");
  priorityOne.value = "P1";
  priorityOne.textContent = "P1";
  prioritySelect.appendChild(priorityOne);
  const priorityTwo = document.createElement("option");
  priorityTwo.setAttribute("id", "priority-two");
  priorityTwo.value = "P2";
  priorityTwo.textContent = "P2";
  prioritySelect.appendChild(priorityTwo);
  const priorityThree = document.createElement("option");
  priorityThree.setAttribute("id", "priority-three");
  priorityThree.value = "P3";
  priorityThree.textContent = "P3";
  prioritySelect.appendChild(priorityThree);
  const priorityFour = document.createElement("option");
  priorityFour.setAttribute("id", "priority-four");
  priorityFour.value = "P4";
  priorityFour.setAttribute("selected", "");
  priorityFour.textContent = "P4";
  prioritySelect.appendChild(priorityFour);

  const completionStatusFieldset = document.createElement("fieldset");
  completionStatusFieldset.setAttribute("id", "completion-status-fieldset");
  todoForm.appendChild(completionStatusFieldset);
  const completionStatusLegend = document.createElement("legend");
  completionStatusLegend.textContent = "Completed";
  completionStatusFieldset.appendChild(completionStatusLegend);
  const completedContainer = document.createElement("div");
  completedContainer.classList.add("radio-button-container");
  completionStatusFieldset.appendChild(completedContainer);
  const completedRadio = document.createElement("input");
  completedRadio.setAttribute("type", "radio");
  completedRadio.setAttribute("id", "completed-radio");
  completedRadio.setAttribute("name", "completion_radio");
  completedRadio.value = "Completed";
  completedContainer.appendChild(completedRadio);
  const completedLabel = document.createElement("label");
  completedLabel.classList.add("completion-radio-label");
  completedLabel.setAttribute("for", "completed-radio");
  completedLabel.textContent = "Yes";
  completedContainer.appendChild(completedLabel);
  const notCompletedContainer = document.createElement("div");
  notCompletedContainer.classList.add("radio-button-container");
  completionStatusFieldset.appendChild(notCompletedContainer);
  const notCompletedRadio = document.createElement("input");
  notCompletedRadio.setAttribute("type", "radio");
  notCompletedRadio.setAttribute("id", "not-completed-radio");
  notCompletedRadio.setAttribute("name", "completion_radio");
  notCompletedRadio.value = "Not completed";
  notCompletedRadio.setAttribute("checked", "");
  notCompletedContainer.appendChild(notCompletedRadio);
  const notCompletedLabel = document.createElement("label");
  notCompletedLabel.classList.add("completion-radio-label");
  notCompletedLabel.setAttribute("for", "not-completed-radio");
  notCompletedLabel.textContent = "No";
  notCompletedContainer.appendChild(notCompletedLabel);

  let completionStatusSelected;
  if (completedRadio.hasAttribute("checked")) {
    completionStatusSelected = "Completed";
  } else if (notCompletedRadio.hasAttribute("checked")) {
    completionStatusSelected = "Not completed";
  }

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons-container");
  todoForm.appendChild(buttonsContainer);
  const submitButton = document.createElement("button");
  submitButton.classList.add("submit-button");
  if (action === "create") {
    submitButton.textContent = "Create";
    submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      createTodo(
        titleInput.value,
        descriptionInput.value,
        projectSelect.value,
        dueDateInput.value,
        prioritySelect.value,
        completionStatusSelected,
      );
      content.removeChild(document.querySelector("#todo-form-container"));
      showTodosList("all");
    });
  } else if (action === "update") {
    submitButton.textContent = "Update";
    submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      updateTodo(
        todoUniqueId,
        titleInput.value,
        descriptionInput.value,
        projectSelect.value,
        dueDateInput.value,
        prioritySelect.value,
        completionStatusSelected,
      );
      content.removeChild(document.querySelector("#todo-form-container"));
      showTodosList("all");
    });
  }
  buttonsContainer.appendChild(submitButton);
  const cancelButton = document.createElement("button");
  cancelButton.classList.add("cancel-button");
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    content.removeChild(document.querySelector("#todo-form-container"));
  });
  buttonsContainer.appendChild(cancelButton);
}

function openProjectForm(action, projectUniqueId) {
  //projectUniqueId is only required for action === "update"
  if (document.querySelector("#project-form-container")) {
    content.removeChild(document.querySelector("#project-form-container"));
  }
  const projectFormContainer = document.createElement("div");
  projectFormContainer.classList.add("form-containers");
  projectFormContainer.setAttribute("id", "project-form-container");
  content.appendChild(projectFormContainer);

  const projectForm = document.createElement("form");
  projectForm.classList.add("forms");
  projectFormContainer.appendChild(projectForm);

  const titleContainer = document.createElement("div");
  titleContainer.classList.add("text-input-containers");
  projectForm.appendChild(titleContainer);
  const titleInputLabel = document.createElement("label");
  titleInputLabel.classList.add("text-input-labels");
  titleInputLabel.setAttribute("for", "project-title-input");
  titleInputLabel.textContent = "Title";
  titleContainer.appendChild(titleInputLabel);
  const titleInput = document.createElement("input");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("name", "title");
  titleInput.setAttribute("id", "project-title-input");
  titleInput.classList.add("text-inputs");
  titleContainer.appendChild(titleInput);

  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add("text-input-containers");
  projectForm.appendChild(descriptionContainer);
  const descriptionInputLabel = document.createElement("label");
  descriptionInputLabel.classList.add("text-input-labels");
  descriptionInputLabel.setAttribute("for", "project-description-input");
  descriptionInputLabel.textContent = "Description";
  descriptionContainer.appendChild(descriptionInputLabel);
  const descriptionInput = document.createElement("input");
  descriptionInput.setAttribute("type", "text");
  descriptionInput.setAttribute("name", "description");
  descriptionInput.setAttribute("id", "project-description-input");
  descriptionInput.classList.add("text-inputs");
  descriptionContainer.appendChild(descriptionInput);

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons-container");
  projectForm.appendChild(buttonsContainer);
  const submitButton = document.createElement("button");
  submitButton.classList.add("submit-button");
  if (action === "create") {
    submitButton.textContent = "Create";
    submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      createProject(titleInput.value, descriptionInput.value);
      content.removeChild(document.querySelector("#project-form-container"));
      showProjectList();
    });
  } else if (action === "update") {
    submitButton.textContent = "Update";
    submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      updateProject(projectUniqueId, titleInput.value, descriptionInput.value);
      content.removeChild(document.querySelector("#project-form-container"));
      showProjectList();
    });
  }
  buttonsContainer.appendChild(submitButton);
  const cancelButton = document.createElement("button");
  cancelButton.classList.add("cancel-button");
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    content.removeChild(document.querySelector("#project-form-container"));
  });
  buttonsContainer.appendChild(cancelButton);
}

export function showTodosList(projectCheckID) {
  content.textContent = "";
  const todosListContainer = document.createElement("div");
  todosListContainer.classList.add("lists-view-containers");
  content.appendChild(todosListContainer);

  const todosListView = document.createElement("div");
  todosListView.classList.add("lists-view");
  todosListContainer.appendChild(todosListView);

  const todoArray = [];
  const todoNodesArray = [];

  if (projectCheckID === "all") {
    for (let i = 0; i < getTodosList().length; i++) {
      todoArray.push(getTodosList()[i]);
    }
  } else {
    const filteredTodosByProject = getTodosList().filter((item) => {
      return item.projectID === projectCheckID;
    });
    for (let i = 0; i < filteredTodosByProject.length; i++) {
      todoArray.push(filteredTodosByProject[i]);
    }
  }

  for (let i = 0; i < todoArray.length; i++) {
    const currentTodoId = todoArray[i].id;
    todoNodesArray[i] = document.createElement("div");
    todoNodesArray[i].classList.add("todos");
    todosListView.appendChild(todoNodesArray[i]);
    const todoTitleDisplay = document.createElement("div");
    todoTitleDisplay.classList.add("todos-title");
    todoTitleDisplay.textContent = todoArray[i].title;
    todoNodesArray[i].appendChild(todoTitleDisplay);
    todoNodesArray[i].addEventListener("click", () => {
      openTodoForm("update", currentTodoId);
      document.querySelector("#title-input").value = todoArray[i].title;
      document.querySelector("#description-input").value =
        todoArray[i].description;
      document.querySelector("#project-select").value = todoArray[i].project;
      document.querySelector("#due-date-input").value =
        todoArray[i].dueDateLocale;
      if (todoArray[i].priority === "P1") {
        document.querySelector("#priority-four").removeAttribute("selected");
        document.querySelector("#priority-one").setAttribute("selected", "");
      } else if (todoArray[i].priority === "P2") {
        document.querySelector("#priority-four").removeAttribute("selected");
        document.querySelector("#priority-two").setAttribute("selected", "");
      } else if (todoArray[i].priority === "P3") {
        document.querySelector("#priority-four").removeAttribute("selected");
        document.querySelector("#priority-three").setAttribute("selected", "");
      }
      if (todoArray[i].completionStatus === "Completed") {
        document
          .querySelector("#not-completed-radio")
          .removeAttribute("checked");
        document.querySelector("#completed-radio").setAttribute("checked", "");
      }
    });
  }
}
