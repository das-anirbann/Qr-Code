
let imgBox = document.getElementById("imgBox");
let qrImg = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
let useLogo = document.getElementById("useLogo");
let logoUpload = document.getElementById("logoUpload");
let qrContainer;


useLogo.addEventListener("change", ()=> {
    logoUpload.style.display = useLogo.checked ? "block" : "none";
});

 function showMessage(msg){
                const container = document.querySelector(".container");
                let message = document.createElement("div");

                message.className = "error-message";
                message.innerHTML = msg;

                container.appendChild(message);

                setTimeout(()=> {
                    message.classList.add("fade-out");
                    setTimeout(()=> message.remove(), 500)
                }, 3000)
            }


function generateQr() {

            if(qrText.value.length > 0){
        
            if(useLogo.checked && logoUpload.files.length === 0){
                showMessage("please upload a logo");
                return;
            }

           
                //clear previous QR
            imgBox.classList.add("show-img");
            imgBox.innerHTML = "";
            
            

                //create QR with library
            qrContainer = new QRCode(imgBox, {
                text: qrText.value,
                width: 500,
                height: 500,
                correctLevel: QRCode.CorrectLevel.H
            });

            //small delay to allow QR to render
            let checkCanvas = setInterval( ()=> {
                let canvas = imgBox.querySelector("canvas");
                if(canvas){
                    clearInterval(checkCanvas);

                    if (useLogo.checked && logoUpload.files.length > 0){
                        let ctx = canvas.getContext("2d");
                        let logo = new Image();
                        logo.src = URL.createObjectURL(logoUpload.files[0]);
                        logo.onload = () => {
                            const maxLogoSize = canvas.width * 0.2;
                            let ratio = Math.min(maxLogoSize / logo.width,  maxLogoSize / logo.height);
                            let logoWidth = logo.width * ratio ;
                            let logoHeight = logo.height * ratio ; 
                            const x = (canvas.width - logoWidth) / 2;
                            const y = (canvas.height - logoHeight) / 2;
                            ctx.drawImage(logo, x , y, logoWidth, logoHeight);

                        };
                    }
                    imgBox.classList.add("show-img");
                    document.getElementById("downloadBtn").classList.add("show");
                }
            }, 50);
          } else{
            qrText.classList.add("error");
            setTimeout(()=>{
                    qrText.classList.remove("error");
            },1000); 
         }
}

function downloadQr(){
    let canvas = imgBox.querySelector("canvas");
    if(!canvas) return;

        let scale =4;
        let tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width * scale;
        tempCanvas.height = canvas.height * scale;
        let ctx = tempCanvas.getContext("2d");
        ctx.scale(scale, scale);
        ctx.drawImage(canvas, 0 ,0);

        let link = document.createElement("a");
        link.href = tempCanvas.toDataURL("image/png");
        link.download = "qr-code.png";
        link.click();
    
}

function goBack(){
    location.reload();
}