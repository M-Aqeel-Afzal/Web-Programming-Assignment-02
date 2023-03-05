
const input8 = document.querySelector(".preview-img img");  //get the image element in preview img
const input10 = document.querySelector(".reset-filter"); //get resetFilter element
const input11 = document.querySelector(".save-img");    //get the save img element

let flipno = document.getElementById("no-flip");   //get the no flip button element
let flipx = document.getElementById("flip-x");   //get the flip x button element
let flipy = document.getElementById("flip-y"); //get the flip y button element


let filter_blur = document.getElementById("blur");         // getting element by ids
let filter_contrast = document.getElementById("contrast");
let filter_rotate = document.getElementById("hue-rotate");
let filter_sepia = document.getElementById("sepia");
let uploadingButton = document.getElementById("upload-button");
let image = document.getElementById("chosen-image");

function resetFilter(){       //reset all the filters
    filter_blur.value = "0";
    filter_contrast.value = "100";
    filter_rotate.value = "0";
    filter_sepia.value = "0";
    flipno.checked = true;
    addFilter();
    flipImage();
}
uploadingButton.onchange = () => {       //upload img
    resetFilter();
    document.querySelector(".image-container").style.display = "block";
    let reader = new FileReader();
    reader.readAsDataURL(uploadingButton.files[0]);
    reader.onload = () => {
        image.setAttribute("src", reader.result);
    }
}


var horizon = 1,verti = 1;



const imageSavingFunction = () => {                      //save the img
  let canv = document.createElement('canvas');
  const context = canv.getContext('2d');
  canv.width = input8.naturalWidth;
  canv.height = input8.naturalHeight;
  context.filter = `blur(${filter_blur.value}px) contrast(${filter_contrast.value}%) hue-rotate(${filter_rotate.value}deg) sepia(${filter_sepia.value}%)`;
  context.translate(canv.width / 2, canv.height / 2);

  context.scale(horizon, verti);
  context.drawImage(input8, -canv.width / 2, -canv.height / 2, canv.width, canv.height);
  const link = document.createElement("a");
    link.download = "image.jpg";
    console.log(context.filter);
    link.href = canv.toDataURL();
    link.click();

}



let sliders = document.querySelectorAll(".filter1 input[type='range']");
sliders.forEach( slider => {                                                   //addfilter function call
    slider.addEventListener("input", addFilter);
});
function addFilter(){                                      //updating filter values
    image.style.filter = `blur(${filter_blur.value}px) contrast(${filter_contrast.value}%) hue-rotate(${filter_rotate.value}deg) sepia(${filter_sepia.value}%)`;
}

let radioButton = document.querySelectorAll(".flip-option input[type='radio']");
radioButton.forEach( radioBtn => {                                                  //flip image function call
    radioBtn.addEventListener("click", flipImage);
});
function flipImage(){                                             //applying flip on img
    if(flipx.checked){
        image.style.transform = "scaleX(-1)";
        horizon = horizon === 1 ? -1 : 1;

    }
    else if(flipy.checked){
        image.style.transform = "scaleY(-1)";
        verti = verti === 1 ? -1 : 1;

    }
    else{
        image.style.transform = "scale(1,1)";
    }
}

input10.addEventListener("click", resetFilter);
input11.addEventListener("click", imageSavingFunction);
