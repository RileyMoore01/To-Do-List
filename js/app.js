window.onload = () => {
  const form1 = document.querySelector("#addForm");
}



function openNav() {
  document.getElementById("nav-bar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
  document.getElementById("nav-bar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.body.style.backgroundColor = "black";
} 