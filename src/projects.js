import { v4 as uuidv4 } from "uuid";
import {
  setArrayToLocalStorage,
  getArrayFromLocalStorage,
} from "./data-persistense";

class Project {
  constructor(title, description) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
  }
  setTitle(newTitle) {
    this.title = newTitle;
  }
  setDescription(newDescription) {
    this.description = newDescription;
  }
}
const projectsList = [];

// Default Project
projectsList.push({
  id: "0000",
  title: "Default",
  description: "This is the default project.",
});

export function recoverProjectsFromLocalStorage() {
  getArrayFromLocalStorage("localProjectsList", projectsList);
}

export function createProject(projectTitle, projectDescription) {
  projectsList.push(new Project(projectTitle, projectDescription));
  setArrayToLocalStorage("localProjectsList", projectsList);
}

// The findIndex() method of Array instances returns the index of the first element
// in an array that satisfies the provided testing function. If no elements satisfy
// the testing function, -1 is returned.

export function getProject(uniqueId) {
  const indexOfItem = projectsList.findIndex((item) => item.id === uniqueId);
  if (indexOfItem !== -1) {
    return projectsList[indexOfItem];
  }
}

export function deleteProject(uniqueId) {
  const indexOfItem = projectsList.findIndex((item) => item.id === uniqueId);
  if (indexOfItem !== -1) {
    projectsList.splice(indexOfItem, 1);
    setArrayToLocalStorage("localProjectsList", projectsList);
  }
}
export function updateProject(uniqueId, updatedTitle, updatedDescription) {
  const indexOfItem = projectsList.findIndex((item) => item.id === uniqueId);
  if (indexOfItem !== -1) {
    projectsList[indexOfItem].setTitle(updatedTitle);
    projectsList[indexOfItem].setDescription(updatedDescription);
    setArrayToLocalStorage("localProjectsList", projectsList);
  }
}

export function getProjectsList() {
  return projectsList;
}
