var qrUrl = document.getElementById("text");
var qr = new VanillaQR({
    url: qrUrl.value,
    size: 400,
    colorLight: "#ffffff",
    colorDark: "#000000"

});
document.getElementById('qrcode').appendChild(qr.domElement);
//Create qr controllers
function createQR() {
    qr.url = qrUrl.value;
    qr.init();
    convertCanvasToImage()
}

// Converts canvas to an image
function convertCanvasToImage() {
    // find in Qr code Object canvas tag
    var canvasImage = document.getElementById("qrcode");
    var canvas = canvasImage.querySelector('canvas');
    //  get todataUrl
    var img = canvas.toDataURL("image/png");
    // get a object and set image url in href for download qr code as image

    // var image = qr.toImage('png');
    // image.src = img
    // window.open(image.src);
    var a = document.getElementById('qrcodeimages');
    a.href = img;
}


createQR();
convertCanvasToImage();

$("#text").
    on("blur", function () {
        createQR();
    }).
    on("keydown", function (e) {
        if (e.keyCode == 13) {
            createQR();
        }
    });
