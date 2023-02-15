let arr = [];
let clone;
let id = 0;
let submit = document.getElementById("submit");
submit.addEventListener("click", (e) => {
  products();
  e.preventDefault();
});

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
// Adding products in localstorage
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
      console.log(arr);
      console.log(arr.length == []);
      arr.length === 0 ? (id = 1) : (id = arr[arr.length - 1].ID + 1);
      obj.ID = id;
      obj.Name = document.getElementById("pName").value;
      obj.Image = document.getElementById("pImage").value;
      obj.Price = document.getElementById("pPrice").value;
      obj.Description = document.getElementById("pDesc").value;
      arr.push(obj);
      localStorage.setItem("ProductData", JSON.stringify(arr));
      alert("Product Added Successfully");
      clearPage();
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
document.getElementById("clear").addEventListener("click", () => {
  clearPage();
});
function clearPage() {
  window.location.reload();
}
let printValue = document.querySelector(".printValue");
let printID = document.querySelector(".printID");
let printPName = document.getElementById("printPName");
let printPPrice = document.getElementById("printPPrice");
let printPDesc = document.getElementById("printPDesc");
let printPImg = document.getElementById("printPImg");

function searchByID() {
  arr = getARR();
  let flag = 0;
  let tempID = document.getElementById("readID").value;
  for (let i = 0; i < arr.length; i++) {
    if (tempID > arr.length || tempID < 0) {
      clearPage();
      break;
    }
    if (arr[i].ID == tempID) {
      document.querySelector(".printValue").style.display = "block";
      printID.innerHTML = arr[i].ID;
      printPName.innerHTML = arr[i].Name;
      printPPrice.innerHTML = arr[i].Price;
      printPDesc.innerHTML = arr[i].Description;
      printPImg.innerHTML = `<img src="${arr[i].Image}" id="hereImg" alt="">`;
      flag++;
    }
    if (arr[i].Name.toLowerCase() == tempID.toLowerCase()) {
      document.querySelector(".printValue").style.display = "block";
      printID.innerHTML = arr[i].ID;
      printPName.innerHTML = arr[i].Name;
      printPPrice.innerHTML = arr[i].Price;
      printPDesc.innerHTML = arr[i].Description;
      printPImg.innerHTML = `<img src="${arr[i].Image}" id="hereImg" alt="">`;
      flag++;
    }
  }
  if (flag == 0) {
    clearPage();
  }
}
function viewItems() {
  getARR();
  for (let i = arr.length - 1; i >= 0; i--) {
    makeClone();
    document.querySelector(".printID").innerHTML = arr[i].ID;
    document.getElementById("printPName").innerHTML = arr[i].Name;
    document.getElementById("printPPrice").innerHTML = arr[i].Price + "₹";
    document.getElementById("printPDesc").innerHTML = arr[i].Description;
    document.getElementById(
      "printPImg"
    ).innerHTML = `<img src="${arr[i].Image}" id="hereImg" alt="Image">`;
    document.querySelector(".printValue").style.display = "block";
    if (i == 0) {
      document.getElementById("viewAll").disabled = true;
    }
  }
}

function editFunction() {
  getARR();
  let idStore = this.event.target.parentNode.childNodes[1].textContent;
  let index = arr.findIndex((x) => x.ID == idStore);

  document.getElementById("pName").value = arr[index].Name;
  document.getElementById("pPrice").value = arr[index].Price;
  document.getElementById("pDesc").value = arr[index].Description;
  document.getElementById("pImage").value = arr[index].Image;
  document.getElementById("pID").value = arr[index].ID;
}

function delFunction() {
  let str = document.querySelectorAll(".printValue");
  str.forEach((element) => {
    element.style.display = "none";
  });
  getARR();
  let idStore = this.event.target.parentNode.childNodes[1].textContent;
  console.log(idStore);
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
  document.querySelector(".printValue").style.display = "none";
  // clearPage();
  viewItems();
}

function makeClone() {
  clone = document.querySelector(".printValue").cloneNode(true);
  document.querySelector(".printValue").after(clone);
  clone.class = "values2";
}

function valueAssignment() {
  for (let i = arr.length - 1; i >= 0; i--) {
    makeClone();
    document.querySelector(".printID").innerHTML = arr[i].ID;
    document.getElementById("printPName").innerHTML = arr[i].Name;
    document.getElementById("printPPrice").innerHTML = "₹" + arr[i].Price;
    document.getElementById("printPDesc").innerHTML = arr[i].Description;
    document.getElementById(
      "printPImg"
    ).innerHTML = `<img src="${arr[i].Image}" id="hereImg" alt="Image">`;
    document.querySelector(".printValue").style.display = "block";
  }
}
let sortByprice = document.getElementById("sortByprice");
sortByprice.addEventListener("click", (e) => {
  let str = document.querySelectorAll(".printValue");
  str.forEach((element) => {
    element.style.display = "none";
  });
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
  let str = document.querySelectorAll(".printValue");
  str.forEach((element) => {
    element.style.display = "none";
  });
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
  let str = document.querySelectorAll(".printValue");
  str.forEach((element) => {
    element.style.display = "none";
  });
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
