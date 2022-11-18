import BooksPresenter from "./Books/BooksPresenter";
import httpGateway from "./Shared/HttpGateway";
import Observable from "./Shared/Observable";
import bookRepository from "./Books/BooksRepository";

let viewModel;
let bookStub;
let allBooksStub;
let booksPresenter;
let setUp;

const apiUrl = "https://api.logicroom.co/api/tommy.han.cs@gmail.com/";

beforeEach(() => {
  viewModel = null;
  booksPresenter = new BooksPresenter();
  bookRepository.programmersModel = new Observable([]);
  bookStub = {
    success: true,
    result: [
      {
        bookId: 20841,
        name: "Wind in the willows",
        ownerId: "tommy.han.cs@gmail.com",
        author: "Kenneth Graeme"
      },
      {
        bookId: 20851,
        name: "I, Robot",
        ownerId: "tommy.han.cs@gmail.com",
        author: "Isaac Asimov"
      },
      {
        bookId: 20861,
        name: "The Hobbit",
        ownerId: "tommy.han.cs@gmail.com",
        author: "Jrr Tolkein"
      }
    ]
  };

  allBooksStub = {
    success: true,
    result: [
      {
        bookId: 31,
        name: "Moby Dick",
        ownerId: null,
        author: "Herman Melville"
      },
      {
        bookId: 41,
        name: "The Art of War",
        ownerId: null,
        author: "Sun Tzu"
      },
      {
        bookId: 22621,
        name: "Wind in the willows",
        ownerId: "tommy.han.cs@gmail.com",
        author: "Kenneth Graeme"
      },
      {
        bookId: 22631,
        name: "I, Robot",
        ownerId: "tommy.han.cs@gmail.com",
        author: "Isaac Asimov"
      },
      {
        bookId: 22641,
        name: "The Hobbit",
        ownerId: "tommy.han.cs@gmail.com",
        author: "Jrr Tolkein"
      }
    ]
  };

  httpGateway.get = jest.fn().mockImplementation((path) => {
    if (path === apiUrl + "books") {
      return bookStub;
    } else {
      if (path === apiUrl + "allbooks") return allBooksStub;
    }
  });

  setUp = async (modeArgs) => {
    booksPresenter.setMode(modeArgs);
    await booksPresenter.load((result) => {
      viewModel = result;
    });
  };
});

it("should load private books if mode not provided", async () => {
  await setUp(null);
  expect(viewModel.length).toBe(3);
  expect(viewModel[0].name).toBe("Wind in the willows");
  expect(viewModel[0].author).toBe("Kenneth Graeme");
  expect(viewModel[2].name).toBe("The Hobbit");
  expect(viewModel[2].author).toBe("Jrr Tolkein");
});

it("should load private books", async () => {
  await setUp("private");
  expect(viewModel.length).toBe(3);
  expect(viewModel[0].name).toBe("Wind in the willows");
  expect(viewModel[0].author).toBe("Kenneth Graeme");
  expect(viewModel[2].name).toBe("The Hobbit");
  expect(viewModel[2].author).toBe("Jrr Tolkein");
});

it("should load public books", async () => {
  await setUp("public");
  expect(viewModel.length).toBe(5);
  expect(viewModel[0].name).toBe("Moby Dick");
  expect(viewModel[0].author).toBe("Herman Melville");
  expect(viewModel[2].name).toBe("Wind in the willows");
  expect(viewModel[2].author).toBe("Kenneth Graeme");
});
