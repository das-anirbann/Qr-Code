
let imgBox = document.getElementById("imgBox");
let qrImg = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
let useLogo = document.getElementById("useLogo");
let logoUpload = document.getElementById("logoUpload");
let qrContainer;


useLogo.addEventListener("change", ()=> {
    logoUpload.style.display = useLogo.checked ? "block" : "none";
});

function generateQr() {

            if(qrText.value.length > 0){
        
            if(useLogo.checked && logoUpload.files.length === 0){
                alert("please upload a logo");
                return;
            }

                //clear previous QR
            imgBox.classList.add("show-img");
            imgBox.innerHTML = '<img src="" id="qrImage">';
            qrImg = document.getElementById("qrImage");
            

                //create QR with library
            qrContainer = new QRCode(imgBox, {
                text: qrText.value,
                correctLevel:QRCode.CorrectLevel.H
            });

            //small delay to allow QR to render
            setTimeout( ()=>{
                let canvas = imgBox.querySelector("canvas");
                if(canvas){
                    if (useLogo.checked && logoUpload.files.length > 0){
                        let ctx = canvas.getContext("2d");
                        let logo = new Image();
                        logo.src = URL.createObjectURL(logoUpload.files[0]);
                        logo.onload = () => {
                            const logoSize = canvas.width*0.2;
                            const x = (canvas.width - logoSize) / 2;
                            const y = (canvas.height - logoSize) / 2;
                            ctx.drawImage(logo, x , y, logoSize, logoSize);
                        };
                    }
                    imgBox.classList.add("show-img");
                    document.getElementById("downloadBtn").classList.add("show");
                }
            }, 300);
          } else{
            qrText.classList.add("error");
            setTimeout(()=>{
                    qrText.classList.remove("error");
            },1000); 
         }
}

function downloadQr(){
    let canvas = imgBox.querySelector("canvas");
    if(canvas){
        let link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "qr-code.png";
        link.click();
    }
}