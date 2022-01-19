let myLibrary = [];

const booksDiv = document.querySelector("[data-books]");
const addBookButton = document.querySelector("[data-button-add]");
const popUpForm = document.getElementById("popUp");
const closePopUp = popUpForm.getElementsByTagName("span")[0];
const form = document.getElementById("form");

function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  let i = 0;
  booksDiv.textContent = "";
  myLibrary.forEach((book) => {
    const bookDiv = document.createElement("div");
    const title = document.createElement("div");
    const author = document.createElement("div");
    const pages = document.createElement("div");
    const read = document.createElement("div");
    const remove = document.createElement("div");

    bookDiv.classList.add("book");
    title.classList.add("title");
    author.classList.add("author");
    pages.classList.add("pages");
    read.classList.add("read");
    remove.classList.add("remove");

    bookDiv.setAttribute("data-book", `${i}`);
    i++;

    title.textContent = `${book.title}`;
    author.textContent = `By ${book.author}`;
    pages.textContent = `${book.pages} Pages`;
    read.textContent = `${book.read ? "Read" : "Not Read"}`;
    remove.textContent = `Remove`;

    remove.addEventListener("click", (e) => {
      const target = e.target.parentNode.getAttribute("data-book");
      myLibrary.splice(target, 1);
      displayBooks();
    });

    read.addEventListener("click", (e) => {
      const target = e.target.parentNode.getAttribute("data-book");
      
      if (myLibrary[target].read) {
        myLibrary[target].read = false;
      } else {
        myLibrary[target].read = true;
      }
      displayBooks();
    });
    bookDiv.appendChild(title);
    bookDiv.appendChild(author);
    bookDiv.appendChild(pages);
    bookDiv.appendChild(read);
    bookDiv.appendChild(remove);

    booksDiv.appendChild(bookDiv);
  });
}

addBookButton.addEventListener("click", () => {
  popUpForm.style.display = "block";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = form.elements["title"].value;
  let author = form.elements["author"].value;
  let pages = form.elements["pages"].value;
  let read = form.elements["read"].checked;

  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  popUpForm.style.display = "none";
  displayBooks();
});

const locario = new Book("bad boy game", "Mr Locario", 20, false);
const mackin = new Book("art of mackin", "Tariq Nasheed", 25, true);

addBookToLibrary(locario);
addBookToLibrary(mackin);

displayBooks();
