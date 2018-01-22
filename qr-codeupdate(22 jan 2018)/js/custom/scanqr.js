//get audio element
var audio = document.getElementById('denied');
// var button = document.getElementById('play-button');
// button.addEventListener('click', function () {
//   audio.play();
// });
// Playaudio
function playAudio() {
    //alert('here');
    audio.play();
}
//get element startscanning
var startVideoScanning = document.getElementById('startScanning');
var app = '';
// On click 
startVideoScanning.onclick = function () {
    document.getElementById('app').style.display = 'block';
    //create new app variable with vue
    app = new Vue({
        el: '#app',
        data: {
            scanner: null,
            activeCameraId: null,
            cameras: [],
            scans: []
        },
        mounted: function () {
            var self = this;
            //initialise scanner
            self.scanner = new Instascan.Scanner({ video: document.getElementById('previewVideo'), scanPeriod: 5 });
            //add listener for get scan
            self.scanner.addListener('scan', function (content, image) {
                // Add flash on body with element 
                document.getElementById("overlay").style.display = "block";
                //set timeout for removing flash using element
                setTimeout(function() {
                    document.getElementById("overlay").style.display = "none";
                }, 2000);
                //payaudio function
                playAudio();
                // check url validate if content (qr code data) have url
                var checkUrl = ValidURL(content);
                var x = content;
                // check content is json  starting with {
                if(x.charAt(0) == '{'){
                    //check content have method and action then create form
                    if (content.includes("method") && content.includes("action")) {
                        var response = JSON.parse(content);
                        //create form element
                        var form = document.createElement('form');
                        form.id = 'qrlCreateForm';
                        form.action = response.action;
                        form.method = response.method;
                        for (var key in response) {
                            if (key != 'action' && key != 'method') {
                                var input = document.createElement("input");
                                input.setAttribute("type", "hidden");
                                input.setAttribute("name", key);
                                input.setAttribute("value", response[key]);
                                form.appendChild(input)
                            }
                        }
                        var submit = document.createElement("button");
                        submit.setAttribute("type", "submit");
                        submit.id = "submitQrForm"
                        submit.setAttribute("name", "submit");
                        submit.setAttribute("value", "submit");
                        submit.setAttribute("hidden", true);
                        form.appendChild(submit)
                        //append form to element or div
                        document.getElementById('forScan').appendChild(form);
                        self.scans.unshift({ date: +(Date.now()), content: response });
                    }else{
                        var response = JSON.parse(content);
                        for (var key in response) {
                            //check json have link or url key thenre direct that
                            if (key == 'link' || key == 'url') {
                                var url = response[key]
                                //validate url
                                if (ValidURL(url)) {
                                    window.open(url, '_blank');
                                    self.scans.unshift({ date: +(Date.now()), content: url });
                                } else {
                                    self.scans.unshift({ date: +(Date.now()), content: url });
                                }
                            } else {
                                self.scans.unshift({ date: +(Date.now()), content: response[key] });
                            }
                        }
                    }
                }
                // check url validate
                else if (checkUrl) {
                    window.open(content, '_blank');
                    self.scans.unshift({ date: +(Date.now()), content: content });
                }else{
                    self.scans.unshift({ date: +(Date.now()), content: content });
                }
            });
            //check camera available or not 
            // if avail then get them
            Instascan.Camera.getCameras().then(function (cameras) {
                self.cameras = cameras;
                if (cameras.length > 0) {
                    self.activeCameraId = cameras[0].id;
                    self.scanner.start(cameras[0]);
                } else {
                    console.error('No cameras found.');
                }
            }).catch(function (e) {
                console.error(e);
            });
        },
        methods: {
            formatName: function (name) {
                return name || '(unknown)';
            },
            selectCamera: function (camera) {
                this.activeCameraId = camera.id;
                this.scanner.start(camera);
            }
        }
    });
    // display stop button
    document.getElementById('stopScanning').style.display = 'block';
    startVideoScanning.style.display = 'none';
    return false;

}
// Onclick stop 
document.getElementById('stopScanning').onclick = function () {
    app.scanner.stop();
    document.getElementById('stopScanning').style.display = 'none';
    document.getElementById('app').style.display = 'none';
    startVideoScanning.style.display = 'block';
    return false;
}