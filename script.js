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

function products() {
  let a = JSON.parse(localStorage.getItem("ProductData"));
  if (!a) {
    arr = [];
  } else {
    arr = JSON.parse(localStorage.getItem("ProductData"));
  }

  id++;
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
