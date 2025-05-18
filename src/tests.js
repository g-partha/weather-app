import {
  createTodo,
  getTodo,
  getTodosByProject,
  deleteTodo,
  getTodosList,
  updateTodo,
} from "./todos";
import {
  createProject,
  getProject,
  deleteProject,
  getProjectsList,
  updateProject,
} from "./projects";

function consoleLogTodosAndProjects() {
  console.log(
    "%c Projects List:",
    "color: white; background-color:rgb(15, 85, 31); padding: 2px 6px; border-radius: 4px; font-weight: bold;",
    JSON.parse(JSON.stringify(getProjectsList())),
  );
  console.log(
    "%c Todos List",
    "color: white; background-color:rgb(126, 50, 15); padding: 2px 6px; border-radius: 4px; font-weight: bold;",
    JSON.parse(JSON.stringify(getTodosList())),
  );
}

function consoleLogTestName(testName) {
  console.log("");
  console.log(
    `%c ${testName}`,
    "font-weight: bold; font-size: 18px; background-color: navy;",
  );
}

let projectIdIncrement = 100; // This is to override uuid for projects
let todoIdIncrement = 9000; // This is to override uuid for todos

function createTestProject(testTitle, testDescription) {
  createProject(testTitle, testDescription);
  const projectListArray = getProjectsList();
  projectListArray.at(-1).id = projectIdIncrement.toString(); //Array[] does not support negative index
  projectIdIncrement++;
}

function createTestTodo(
  testTitle,
  testDescription,
  testDueDate,
  testPriority,
  testCompletionStatus,
) {
  createTodo(
    testTitle,
    testDescription,
    testDueDate,
    testPriority,
    testCompletionStatus,
  );
  const todoListArray = getTodosList();
  todoListArray.at(-1).id = todoIdIncrement.toString();
  todoIdIncrement++;
}

function testProjectFunctions() {
  consoleLogTestName("Test createProject with uuid overridden");
  createTestProject("Maths", "this is a maths project");
  createTestProject("Physics", "this is a physics project");
  createTestProject("Biology", "this is a biology project");
  consoleLogTodosAndProjects();

  consoleLogTestName("Test deleteProject");
  deleteProject("101");
  consoleLogTodosAndProjects();

  consoleLogTestName("Test getProject");
  console.log(getProject("102"));

  consoleLogTestName("Test updateProject");
  updateProject(
    "100",
    "updated title",
    "this is the updated project description",
  );
  consoleLogTodosAndProjects();
}

function testTodoFunctions() {
  consoleLogTestName("Create todo with uuid overridden");
  createTestTodo(
    "Do homework",
    "I'm doing homework",
    "0000",
    "08-08-1997",
    "low priority",
    "completed",
  );
  createTestTodo(
    "Buy potato",
    "I have to buy round potatoes",
    "0000",
    "08-08-1997",
    "high priority",
    "not completed",
  );
  createTestTodo(
    "Boil the milk",
    "It is in the jug",
    "0000",
    "08-08-1997",
    "medium priority",
    "completed",
  );
  consoleLogTodosAndProjects();

  consoleLogTestName("Test deleteTodo");
  deleteTodo("9001");
  consoleLogTodosAndProjects();

  consoleLogTestName("Test getTodo");
  console.log(getTodo("9000"));

  consoleLogTestName("Test updateTodo");
  updateTodo(
    "9002",
    "nt",
    "this is the updated todo description",
    "0000",
    "07-01-1997",
    "P1",
    "Completed",
  );
  consoleLogTodosAndProjects();

  consoleLogTestName("Test getTodosByProject");
  console.log(getTodosByProject("100"));
}

testProjectFunctions();

testTodoFunctions();

localStorage.clear(); //Added to override recoverTodosFromLocalStorage & recoverProjectsFromLocalStorage.
