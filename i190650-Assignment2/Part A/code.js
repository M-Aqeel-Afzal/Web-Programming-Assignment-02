const input1 = document.querySelector(".file-input"); // for user selected file
const input2 = document.querySelector(".choose-img"); // for user selected image
const input3 = document.querySelector(".preview-img img"); //to load iamge for previewing
const input4 = document.querySelectorAll(".filter button"); // for all fillter buttons
const input5 = document.querySelector(".filter-info .name"); //getting name
const input6 = document.querySelector(".slider input");   //getting slider input
const input7 = document.querySelector(".filter-info .value");  //getting filter value
const input8 = document.querySelector(".preview-img img");  //getting preview img
const input9 = document.querySelectorAll(".rotate button");   //getting rutate button
const input10 = document.querySelector(".reset-filter");  //getting reset filter
const input11 = document.querySelector(".save-img");   //getting save img
const buttons = document.getElementsByTagName("button");   //getting button
console.log(document.getElementById("brightness").innerHTML);
                // variables
var bright = 100,
  saturat = 100,
  invers = 0,
  grays = 0,
  pressedbutton = "",
  rotateing = 0,
  horizon = 1,
  verti = 1;
const imageLoadingFunction = () => { //image loader function
  var img = input1.files[0];
  if (!img) return;
  input3.src = URL.createObjectURL(img);
}
const settingFilters = () => {
  input8.style.transform = `rotate(${rotateing}deg) scale(${horizon}, ${verti})`;
  input8.style.filter = `brightness(${bright}%) saturate(${saturat}%) invert(${invers}%) grayscale(${grays}%)`;
}

input4.forEach(item => {
  item.addEventListener("click", () => {
    document.querySelector("#brightness").classList.remove("active");
    document.querySelector("#saturation").classList.remove("active");
    document.querySelector("#inversion").classList.remove("active");
    document.querySelector("#grayscale").classList.remove("active");
    item.classList.add("active");
    input5.innerText = item.innerText;

    if (item.id === "brightness") {
      input6.max = "200";
      input6.value = bright;
      input7.innerText = `${bright}%`;
    } else if (item.id === "saturation") {
      input6.max = "200";
      input6.value = saturat;
      input7.innerText = `${saturat}%`;
    } else if (item.id === "inversion") {
      input6.max = "200";
      input6.value = invers;
      input7.innerText = `${invers}%`;
    } else {
      input6.max = "200";
      input6.value = grays;
      input7.innerText = `${grays}%`;
    }

  });
});




const selectedButton = e => {
  pressedbutton = e.target.id;
};

const changeFilterValue = () => {
  input7.innerText = `${input6.value}%`;
  if (pressedbutton === "brightness") {
    bright = input6.value;
  } else if (pressedbutton === "saturation") {
    saturat = input6.value;
  } else if (pressedbutton === "inversion") {
    invers = input6.value;
  } else {
    grays = input6.value;
  }
  settingFilters();
};

input9.forEach(item => {
  item.addEventListener("click", () => {

    if (item.id === "left") {
      rotateing -= 90;
    } else if (item.id === "right") {
      rotateing += 90;
    } else if (item.id === "horizontal") {
      horizon = horizon === 1 ? -1 : 1;
    } else {
      verti = verti === 1 ? -1 : 1;
    }
    settingFilters();
  });
});

const resetFilterValue = () => {
  bright = 100,
    saturat = 100,
    invers = 0,
    grays = 0,
    pressedbutton = "",
    rotateing = 0,
    horizon = 1,
    verti = 1;
  input4[0].click();
  settingFilters();
}
const imageSavingFunction = () => {
  let canv = document.createElement('canvas');
  const context = canv.getContext('2d');
  canv.width = input8.naturalWidth;
  canv.height = input8.naturalHeight;
  context.filter = `brightness(${bright}%) saturate(${saturat}%) invert(${invers}%) grayscale(${grays}%)`;
  context.translate(canv.width / 2, canv.height / 2);
      if(rotateing !== 0) {
          context.rotate(rotateing * Math.PI / 180);
      }
  context.scale(horizon, verti);
  context.drawImage(input8, -canv.width / 2, -canv.height / 2, canv.width, canv.height);
  const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canv.toDataURL();
    link.click();

}

input6.addEventListener("input", changeFilterValue);
input10.addEventListener("click", resetFilterValue);
input11.addEventListener("click", imageSavingFunction);
input1.addEventListener("change", imageLoadingFunction);

input2.addEventListener("click", () => input1.click());
for (let button of buttons) {
  button.addEventListener("click", selectedButton);
}
