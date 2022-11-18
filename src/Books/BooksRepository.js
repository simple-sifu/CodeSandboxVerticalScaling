import httpGateway from "../Shared/HttpGateway";
import Observable from "../Shared/Observable";

class BooksRepository {
  programmersModel = null;
  callback = null;
  mode = "books";
  sortDirection = "";

  constructor() {
    this.programmersModel = new Observable([]);
  }

  getBooks = async (callback) => {
    this.programmersModel.subscribe(callback);
    // if (this.programmersModel.value.length === 0) {
      await this.loadApiData();
    // } else {
    //   this.refreshModelData();
    // }
  };

  compare = (a, b) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      if (this.sortDirection === "asc"){
        return 1;
      }else{
        return -1;
      }
    }
    if (nameA > nameB) {
      if (this.sortDirection === "asc"){
        return -1;
      }else {
        return 1;
      }
    }
  
    // names must be equal
    return 0;
  }

  loadApiData = async () => {
    const dto = await httpGateway.get(
      "https://api.logicroom.co/api/tommy.han.cs@gmail.com/" + this.mode
    );
    this.programmersModel.value = dto.result.sort(this.compare).map((dtoItem) => {
      return dtoItem;
    });
    this.programmersModel.notify();
  };

  refreshModelData = () => {
    this.programmersModel.value = this.programmersModel.value.map((pm) => {
      return pm;
    });
    this.programmersModel.notify();
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
