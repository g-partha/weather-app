import { recoverTodosFromLocalStorage } from "./todos";
import { recoverProjectsFromLocalStorage } from "./projects";
import { showTodosList, showProjectList } from "./gui";
import "./style.css";

recoverTodosFromLocalStorage();
recoverProjectsFromLocalStorage();
showTodosList("all");
showProjectList();
