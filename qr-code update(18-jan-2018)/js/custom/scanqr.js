var audio = document.getElementById('denied');
// var button = document.getElementById('play-button');
// button.addEventListener('click', function () {
//   audio.play();
// });
function playAudio() {
    //alert('here');
    audio.play();
}

var startVideoScanning = document.getElementById('startScanning');
var app = '';
startVideoScanning.onclick = function () {
    document.getElementById('app').style.display = 'block';
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
            self.scanner = new Instascan.Scanner({ video: document.getElementById('previewVideo'), scanPeriod: 5 });
            self.scanner.addListener('scan', function (content, image) {
                document.getElementById("overlay").style.display = "block";
                setTimeout(function() {
                    document.getElementById("overlay").style.display = "none";
                }, 2000);
                playAudio();
                var checkUrl = ValidURL(content);
                var x = content;
                if(x.charAt(0) == '{'){
                    var response = JSON.parse(content);
                    console.log(response);
                    for (var key in response) {
                        if(key == 'link' || key == 'url'){
                            var url = response[key]
                            if (ValidURL(url)){
                                window.open(url, '_blank');
                                self.scans.unshift({ date: +(Date.now()), content: url });
                            } else {
                                self.scans.unshift({ date: +(Date.now()), content: url });
                            }
                        }else{
                            self.scans.unshift({ date: +(Date.now()), content: response[key] });
                        }
                    }
                }else if (checkUrl) {
                    window.open(content, '_blank');
                    self.scans.unshift({ date: +(Date.now()), content: content });
                }else{
                    if (content.includes("method") && content.includes("action")) {
                        var response = JSON.parse(content);
                        console.log(response);
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
                        document.getElementById('forScan').appendChild(form);
                        self.scans.unshift({ date: +(Date.now()), content: response });
                    }else{
                        self.scans.unshift({ date: +(Date.now()), content: content });
                    }
                }
                
            });
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
    document.getElementById('stopScanning').style.display = 'block';
    startVideoScanning.style.display = 'none';
    return false;

}
document.getElementById('stopScanning').onclick = function () {
    app.scanner.stop();
    document.getElementById('stopScanning').style.display = 'none';
    document.getElementById('app').style.display = 'none';
    startVideoScanning.style.display = 'block';
    return false;
}