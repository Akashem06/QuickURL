let boxQR = document.getElementsByClassName("boxQR");
let sourceQR = document.getElementById("sourceQR");
let url = document.getElementsByClassName("url");
let boxQRText = document.getElementsByClassName("boxQRText");

let buttonQR = document.getElementsByClassName("createQR");
let buttonURL = document.getElementsByClassName("shortenURL");
let trashCan = document.getElementsByClassName("delete");

let resultContainerQR = document.getElementsByClassName("resultContainerQR");


let backTop = document.getElementsByClassName("backTop");


window.onscroll = function() {backToTop()};

function backToTop() {
  if (document.documentElement.scrollTop > 900) {
    backTop[0].style.display = "block";
  } 
  else {
    backTop[0].style.display = "none";
  }
}

function topFunction() {
    document.documentElement.scrollTop = 0;
}

function scrollQR() {
    resultContainerQR[0].scrollIntoView()
}

trashCan[0].addEventListener('click', (e) => {
    console.log(trashCan.href);
    const endpoint = `/shortURLS/${trashCan.href}`;

    fetch(endpoint, {
        method: 'DELETE'
    })
})

function generateQR() {
    let urlModify = url[0].value.replace(/\s/g, "");
    if (urlModify.length > 0) {

    scrollQR()
    sourceQR.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + url[0].value;
    
    boxQRText[0].innerHTML = "Source URL: " + urlModify;
    boxQRText[0].href = urlModify;
    }
    
    else {
        url[0].value = null;
    }
} 

