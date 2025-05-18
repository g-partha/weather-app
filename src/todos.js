import { v4 as uuidv4 } from "uuid";
import {
  setArrayToLocalStorage,
  getArrayFromLocalStorage,
} from "./data-persistense";
import { getProject } from "./projects";

class Todo {
  constructor(
    title = "",
    description = "",
    projectID = "0000",
    dueDate = null,
    priority,
    completionStatus,
  ) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.projectID = projectID;
    this.dueDateTimeStamp = Date.parse(dueDate);
    this.priority = priority;
    this.completionStatus = completionStatus;
  }
  get dueDateLocale() {
    if (this.dueDateTimeStamp) {
      const dateObject = new Date(this.dueDateTimeStamp);
      return dateObject.toLocaleDateString();
    } else {
      return "";
    }
  }
  get projectTitle() {
    return getProject(this.projectID).title;
  }
  setTitle(newTitle) {
    this.title = newTitle;
  }
  setDescription(newDescription) {
    this.description = newDescription;
  }
  setProjectID(newProjectID) {
    this.projectID = newProjectID;
  }
  setDueDate(newDueDate) {
    this.dueDateTimeStamp = Date.parse(newDueDate);
  }
  setPriority(newPriority) {
    this.priority = newPriority;
  }
  setCompletionStatus(newCompletionStatus) {
    this.completionStatus = newCompletionStatus;
  }
}

const todosList = [];
export function recoverTodosFromLocalStorage() {
  getArrayFromLocalStorage("localTodosList", todosList);
}
export function createTodo(
  todoTitle,
  todoDescription,
  todoProject,
  todoDueDate,
  todoPriority,
  todoCompletionStatus,
) {
  todosList.push(
    new Todo(
      todoTitle,
      todoDescription,
      todoProject,
      todoDueDate,
      todoPriority,
      todoCompletionStatus,
    ),
  );
  setArrayToLocalStorage("localTodosList", todosList);
}

// The findIndex() method of Array instances returns the index of the first element
// in an array that satisfies the provided testing function. If no elements satisfy
// the testing function, -1 is returned.

export function getTodo(uniqueId) {
  const indexOfItem = todosList.findIndex((item) => item.id === uniqueId);
  if (indexOfItem !== -1) {
    return todosList[indexOfItem];
  }
}

export function getTodosByProject(projectUniqueID) {
  return todosList.filter((item) => item.projectID === projectUniqueID);
}

export function deleteTodo(uniqueId) {
  const indexOfItem = todosList.findIndex((item) => item.id === uniqueId);
  if (indexOfItem !== -1) {
    todosList.splice(indexOfItem, 1);
    setArrayToLocalStorage("localTodosList", todosList);
  }
}
export function updateTodo(
  uniqueId,
  updatedTitle,
  updatedDescription,
  updatedProjectID,
  updatedDueDate,
  updatedPriority,
  updatedCompletionStatus,
) {
  const indexOfItem = todosList.findIndex((item) => item.id === uniqueId);
  if (indexOfItem !== -1) {
    todosList[indexOfItem].setTitle(updatedTitle);
    todosList[indexOfItem].setDescription(updatedDescription);
    todosList[indexOfItem].setProjectID(updatedProjectID);
    todosList[indexOfItem].setDueDate(updatedDueDate);
    todosList[indexOfItem].setPriority(updatedPriority);
    todosList[indexOfItem].setCompletionStatus(updatedCompletionStatus);
    setArrayToLocalStorage("localTodosList", todosList);
  }
}
export function getTodosList() {
  return todosList;
}
