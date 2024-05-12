function Book(name, author, pages, read = false) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.name} by ${this.author}, ${this.pages} pages`;
};

let library = [
  new Book("math", "euler", 200),
  new Book("chinese", "gift", 300),
  new Book("physic", "newton", 400),
  new Book("rust", "primeagen", 800),
];

function showBookCard() {
  const cardList = document.querySelector(".card-list");
  cardList.innerHTML = "";
  library.forEach((book) => {
    const card = `
      <div class="card">
        <span>${book.info()}</span>
        <label>
          <input type="checkbox" ${
            book.read && "checked"
          } onclick="changeIsRead('${book.name}','${
      book.author
    }', '${!book.read}')" />
          ${book.read ? "read" : "not read"}
        </label>
        <button onclick="deleteBook('${book.name}','${
      book.author
    }')">delete</button>
      </div>`;
    cardList.innerHTML += card;
  });
}

function deleteBook(name, author) {
  library = library.filter(
    (book) => book.name != name && book.author != author
  );
  showBookCard();
}

function changeIsRead(name, author, read) {
  read = read == "true";
  library.forEach((book) => {
    if (book.name == name && book.author == author) {
      book.read = read;
    }
  });
  showBookCard();
}

function addBook(e) {
  e.preventDefault();

  console.log(e)

  const name = document.querySelector("#name-input").value;
  const author = document.querySelector("#author-input").value;
  const pages = document.querySelector("#pages-input").value;
  const error = document.querySelector(".error");

  if (!name || !author || !pages || pages < 1) {
    return (error.style.display = "block");
  } else {
    error.style.display = "none";
  }

  const book = new Book(name, author, pages);
  library.push(book);
  showBookCard();
}

const form = document.querySelector('form');
form.addEventListener('submit', addBook);

showBookCard();
