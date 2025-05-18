export function setArrayToLocalStorage(localName, arraytName) {
  localStorage.setItem(localName, JSON.stringify(arraytName));
}

export function getArrayFromLocalStorage(localName, arrayName) {
  const arrayData = localStorage.getItem(localName);
  // If localStorage get value is null, JSON.parse will throw an error.
  if (arrayData) {
    const recoveredData = JSON.parse(arrayData);
    recoveredData.forEach((item) => {
      arrayName.push(item);
    });
  }
}
