let arr = [];
let clone;
let id = 0;
let submit = document.getElementById("submit");
document.getElementById("clear").addEventListener("click", () => {
  clearPage();
});
function clearPage() {
  window.location.reload();
}
let obj = {
  ID: "",
  Name: "",
  Image: "",
  Price: "",
  Description: "",
};
// Getting Array of Objects From Database
function getARR() {
  let a = JSON.parse(localStorage.getItem("ProductData"));
  if (!a) {
    arr = [];
  } else {
    arr = JSON.parse(localStorage.getItem("ProductData"));
  }
  return arr;
}

function products() {
  arr = getARR();
  if (document.getElementById("submit").value == "Save Changes") {
    if (validation() !== 1) {
      for (let i = 0; i < arr.length; i++) {
        if (document.getElementById("pID").value == arr[i].ID) {
          arr[i].Name = document.getElementById("pName").value;
          arr[i].Image = document.getElementById("pImage").value;
          arr[i].Price = document.getElementById("pPrice").value;
          arr[i].Description = document.getElementById("pDesc").value;
          localStorage.setItem("ProductData", JSON.stringify(arr));
        }
      }
      alert("Product Updated Successfully");
      clearPage();
    }
  } else {
    if (validation() !== 1) {
      arr == "" ? (id = 1) : (id = arr[arr.length - 1].ID + 1);
      obj.ID = id;
      obj.Name = document.getElementById("pName").value;
      obj.Image = document.getElementById("pImage").value;
      obj.Price = document.getElementById("pPrice").value;
      obj.Description = document.getElementById("pDesc").value;
      arr.push(obj);
      localStorage.setItem("ProductData", JSON.stringify(arr));
      alert("Product Added Successfully");
    }
  }
}
function validation() {
  let name1 = document.getElementById("pName").value;
  let name2 = document.getElementById("pPrice").value;
  let name3 = document.getElementById("pDesc").value;
  let name4 = document.getElementById("pImage").value;
  if (name1 == "") {
    alert("Enter Name");
    return 1;
  }
  if (name2 == "") {
    alert("Enter Price");
    return 1;
  }
  if (name3 == "") {
    alert("Enter Description");
    return 1;
  }
  if (name4 == "") {
    alert("Enter Image");
    return 1;
  }
}

submit.addEventListener("click", (e) => {
  products();
  // e.preventDefault();
});

function store() {
  let printValue = document.getElementById("printValue");
  let printID = document.getElementById("printID");
  let printPName = document.getElementById("printPName");
  let printPPrice = document.getElementById("printPPrice");
  let printPDesc = document.getElementById("printPDesc");
  let printPImg = document.getElementById("printPImg");
}

function searchByID() {
  arr = getARR();
  let flag = 0;
  store();
  let tempID = document.getElementById("readID").value;
  for (let i = 0; i < arr.length; i++) {
    if (tempID > arr.length || tempID < 0) {
      clearPage();
      break;
    }
    if (arr[i].ID == tempID) {
      document.getElementById("printValue").style.display = "block";
      printID.innerHTML = arr[i].ID;
      printPName.innerHTML = arr[i].Name;
      printPPrice.innerHTML = arr[i].Price;
      printPDesc.innerHTML = arr[i].Description;
      printPImg.innerHTML = `<img src="${arr[i].Image}" alt="">`;
      flag++;
    }
    if (arr[i].Name.toLowerCase() == tempID.toLowerCase()) {
      document.getElementById("printValue").style.display = "block";
      printID.innerHTML = arr[i].ID;
      printPName.innerHTML = arr[i].Name;
      printPPrice.innerHTML = arr[i].Price;
      printPDesc.innerHTML = arr[i].Description;
      printPImg.innerHTML = `<img src="${arr[i].Image}" alt="">`;
      flag++;
    }
  }
  if (flag == 0) {
    clearPage();
  }
}

function viewItems() {
  getARR();
  store();
  for (let i = arr.length - 1; i >= 0; i--) {
    makeClone();
    document.getElementById("printID").innerHTML = arr[i].ID;
    document.getElementById("printPName").innerHTML = arr[i].Name;
    document.getElementById("printPPrice").innerHTML = arr[i].Price + "₹";
    document.getElementById("printPDesc").innerHTML = arr[i].Description;
    document.getElementById(
      "printPImg"
    ).innerHTML = `<img src="${arr[i].Image}" id="hereImg" alt="Image">`;
    document.getElementById("printValue").style.display = "block";
    if (i == 0) {
      document.getElementById("viewAll").disabled = true;
    }
  }
}
viewItems();
function editFunction() {
  getARR();
  let idStore = this.event.target.parentNode.childNodes[3].textContent;
  document.getElementById("pName").value = arr[idStore - 1].Name;
  document.getElementById("pPrice").value = arr[idStore - 1].Price;
  document.getElementById("pDesc").value = arr[idStore - 1].Description;
  document.getElementById("pImage").value = arr[idStore - 1].Image;
  document.getElementById("pID").value = arr[idStore - 1].ID;
}

function delFunction() {
  getARR();
  let idStore = this.event.target.parentNode.childNodes[3].textContent;
  let getIndex;
  getIndex = arr.map((object, index) => {
    if (object.ID == idStore) return index;
  });
  let indexStore;
  for (let i = 0; i < getIndex.length; i++) {
    if (getIndex[i] !== undefined) {
      indexStore = getIndex[i];
    }
  }
  arr.splice(indexStore, 1);
  localStorage.setItem("ProductData", JSON.stringify(arr));
  document.getElementById("printValue").style.display = "none";
  clearPage();
  viewItems();
}

function makeClone() {
  clone = document.getElementById("printValue").cloneNode(true);
  document.getElementById("printValue").after(clone);
  clone.class = "values2";
}

function valueAssignment() {
  for (let i = arr.length - 1; i >= 0; i--) {
    makeClone();
    document.getElementById("printID").innerHTML = arr[i].ID;
    document.getElementById("printPName").innerHTML = arr[i].Name;
    document.getElementById("printPPrice").innerHTML = "₹" + arr[i].Price;
    document.getElementById("printPDesc").innerHTML = arr[i].Description;
    document.getElementById(
      "printPImg"
    ).innerHTML = `<img src="${arr[i].Image}" id="hereImg" alt="Image">`;
    document.getElementById("printValue").style.display = "block";
  }
}
let sortByprice = document.getElementById("sortByprice");
sortByprice.addEventListener("click", (e) => {
  if (sortByprice.innerHTML.includes("↑")) {
    sortWtPrice();
    sortByprice.innerHTML = "Sort By Price ↓ ";
  } else {
    sortWtPrice();
    sortByprice.innerHTML = "Sort By Price ↑ ";
  }
});

function sortWtPrice() {
  getARR();
  if (sortByprice.innerHTML.includes("↑")) {
    let str = arr.sort((a, b) => {
      return b.Price - a.Price;
    });
  } else {
    let str = arr.sort((a, b) => {
      return a.Price - b.Price;
    });
  }
  valueAssignment();
}

let sortByName = document.getElementById("sortByName");
sortByName.addEventListener("click", () => {
  getARR();
  if (sortByName.innerHTML.includes("↑")) {
    sortwtName();
    sortByName.innerHTML = "Sort By Name ↓ ";
  } else {
    sortwtName();
    sortByName.innerHTML = "Sort By Name ↑ ";
  }
});

function sortwtName() {
  if (sortByName.innerHTML.includes("↓")) {
    arr.sort(function (a, b) {
      if (a.Name < b.Name) {
        return -1;
      }
      if (a.Name > b.Name) {
        return 1;
      }
      return 0;
    });
    valueAssignment();
  } else {
    arr.sort(function (a, b) {
      if (a.Name > b.Name) {
        return -1;
      }
      if (a.Name < b.Name) {
        return 1;
      }
      return 0;
    });
    valueAssignment();
  }
}

let sortByID = document.getElementById("sortByID");
sortByID.addEventListener("click", () => {
  // document.getElementById("printValue").innerHTML = "";
  // document.getElementById("printValue").style = none;
  if (sortByID.innerHTML.includes("↑")) {
    sortWtID();
    sortByID.innerHTML = "Sort By ID ↓ ";
  } else {
    sortWtID();
    sortByID.innerHTML = "Sort By ID ↑ ";
  }
});

function sortWtID() {
  getARR();
  console.log(arr);
  if (sortByID.innerHTML.includes("↑")) {
    let str = arr.sort((a, b) => {
      return a.ID - b.ID;
    });
  } else {
    let str = arr.sort((a, b) => {
      return b.ID - a.ID;
    });
  }
  valueAssignment();
}
