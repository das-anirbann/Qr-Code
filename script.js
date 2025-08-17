
let imgBox = document.getElementById("imgBox");
let qrImg = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");

function generateQr() {

    if(qrText.value.length > 0){
  
    qrImg.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(qrText.value);
    
    qrImg.onload = ()=> {
    imgBox.classList.add("show-img");
    
    document.getElementById("downloadBtn").classList.add("show");

    }
    }
     else{
       qrText.classList.add("error");
       setTimeout(()=>{
            qrText.classList.remove("error");
       },1500); 
    }
}

function downloadQr(){
    let link = document.createElement("a");
    link.href = qrImg.src;
    link.download = "qr-code.png";
    link.click();
}