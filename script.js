let name1;
let img;
let price;
let desc;
let arr = [];

let id = 0;

let submit = document.getElementById("submit");

let obj = {
  ID: "",
  Name: "",
  Image: "",
  Price: "",
  Description: "",
};

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

  id = arr.length + 1;
  obj.ID = id;
  obj.Name = document.getElementById("pName").value;
  obj.Image = document.getElementById("pImage").value;
  obj.Price = document.getElementById("pPrice").value;
  obj.Description = document.getElementById("pDesc").value;
  //   console.log(obj.Description);

  arr.push(obj);
  console.log(arr);

  localStorage.setItem("ProductData", JSON.stringify(arr));
}

submit.addEventListener("click", (e) => {
  products();
  e.preventDefault();
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
  store();
  let tempID = document.getElementById("readID").value;
  for (let i = 0; i <= arr.length; i++) {
    if (tempID > arr.length || tempID < 0) {
      printID.innerHTML = "";
      printPName.innerHTML = "";
      printPPrice.innerHTML = "";
      printPDesc.innerHTML = "";
      break;
    }
    if (arr[i].ID == tempID) {
      document.getElementById("printValue").style.display = "block";
      printID.innerHTML = arr[i].ID;
      printPName.innerHTML = arr[i].Name;
      printPPrice.innerHTML = arr[i].Price;
      printPDesc.innerHTML = arr[i].Description;
    }
  }
}

function viewItems() {
  arr = getARR();
  console.log(arr);
  store();
  document.getElementById("printValue").style.display = "none";
  // Remember this while sorting
  for (let i = arr.length - 1; i >= 0; i--) {
    makeClone();

    document.getElementById("printID").innerHTML = arr[i].ID;
    document.getElementById("printPName").innerHTML = arr[i].Name;
    document.getElementById("printPPrice").innerHTML = arr[i].Price;
    document.getElementById("printPDesc").innerHTML = arr[i].Description;
    document.getElementById("printValue").style.display = "block";
    if (i == 0) {
      document.getElementById("viewAll").disabled = true;
    }
  }
}

function makeClone() {
  let clone = document.getElementById("printValue").cloneNode(true);
  document.getElementById("printValue").before(clone);
}

//   console.log(document.getElementById("parentPrintID").nextSibling.textContent);

function delFun() {
  let del = document.getElementById("delete");
  del.addEventListener("click", (e) => {
    console.log("Hello");
  });
}
