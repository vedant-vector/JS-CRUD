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
function validation() {
  let name1 = document.getElementById("pName").value;
  let name2 = document.getElementById("pPrice").value;
  let name3 = document.getElementById("pDesc").value;
  let name4 = document.getElementById("pImage").value;
  console.log(name1);
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

function products() {
  arr = getARR();

  if (validation() !== 1) {
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
    alert("Product Added Successfully");
  }
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
      printPImg.innerHTML = "";
      break;
    }
    if (arr[i].ID == tempID) {
      document.getElementById("printValue").style.display = "block";
      printID.innerHTML = arr[i].ID;
      printPName.innerHTML = arr[i].Name;
      printPPrice.innerHTML = arr[i].Price;
      printPDesc.innerHTML = arr[i].Description;
      printPImg.innerHTML = `<img src="${arr[i].Image}" alt="">`;
    }
  }
}

// let pro = new Promise((resolve, reject) => {
//   resolve();
// });

function viewItems() {
  arr = getARR();
  store();
  document.getElementById("printValue").style.display = "none";
  // Remember this while sorting
  for (let i = arr.length - 1; i >= 0; i--) {
    makeClone();

    document.getElementById("printID").innerHTML = arr[i].ID;
    document.getElementById("printPName").innerHTML = arr[i].Name;
    document.getElementById("printPPrice").innerHTML = arr[i].Price;
    document.getElementById("printPDesc").innerHTML = arr[i].Description;
    document.getElementById(
      "printPImg"
    ).innerHTML = `<img src="${arr[i].Image}" alt="Image">`;

    document.getElementById("printValue").style.display = "block";

    let del = document.querySelector(".delete");
    del.addEventListener("click", async (e) => {
      let idStore = e.target.parentNode.childNodes[3].textContent;
      arr = arr.splice(idStore - 1, 1);
      localStorage.setItem("ProductData", JSON.stringify(arr));
      document.getElementById("printValue").style.display = "none";
      viewItems();

      // console.log(arr);
    });

    let edit = document.querySelector(".edit");
    edit.addEventListener("click", (e) => {
      getARR();
      document.getElementById("pName").value = arr[i].Name;
      document.getElementById("pPrice").value = arr[i].Price;
      document.getElementById("pDesc").value = arr[i].Description;
      document.getElementById("pImage").value = arr[i].Image;
      document.getElementById("pID").value = arr[i].ID;
    });

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

// function afterPageLoad() {
//   window.location.reload();
// }
