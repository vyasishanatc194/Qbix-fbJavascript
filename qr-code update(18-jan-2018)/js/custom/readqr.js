function ValidURL(str) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!regex.test(str)) {
        return false;
    } else {
        return true;
    }
}
(function () {
    'use strict';

    var upload = document.getElementById('uploadQRcode');
    var createqr = document.getElementById('createqr');
    var preview = document.getElementById('preview');
    var qr = new QrCode();

    qr.callback = function (err, successfull) {
        var elemspan = document.getElementById('qrfromurlspan');
        if (typeof elemspan !== 'undefined' && elemspan !== null) {
            elemspan.remove();
        }
        var span = document.createElement('span');
        span.id = 'qrfromurlspan';
        if (successfull) {
            var data = successfull.result;
            var checkUrl = ValidURL(data);
            var x = content;
            if (x.charAt(0) == '{') {
                var response = JSON.parse(content);
                console.log(response);
                for (var key in response) {
                    if (key == 'link' || key == 'url') {
                        var url = response[key]
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
            }else if (checkUrl) {
                window.open(data, '_blank');
                span.innerHTML = '<a href="' + data + '" target= "_blank">' + data + '</a>';
            } else {
                // var response = typeof data;
                // console.log(response);
                // response = JSON.stringify(data);
                // console.log(typeof response);
                if (data.includes("method") && data.includes("action") ){
                    var response = JSON.parse(data);
                    console.log(response);
                    var form = document.createElement('form');
                    form.id = 'qrlCreateForm';
                    form.action = response.action;
                    form.method = response.method;
                    for (var key in response) {
                        if (key != 'action' && key != 'method'  ){
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
                    span.appendChild(form);
                    // var input = document.createElement("INPUT");
                    // input.setAttribute("type", "text");
                    
                } else {
                    span.innerHTML = data;
                }
                
                
                // if () {
                //      var formData = JSON.parse(data);
                //      console.log(formData.method);
                //  }else{
                //      
                // }
                // var formData = JSON.parse(data);
                // console.log(formData.method);
            }

        }
        else {
            span.textContent = 'Error! See error message in console!';
            console.error(err);
        }
        preview.appendChild(span);
    }
    var generatQrCode = function () {
        var elemFiles = this.files;
        if (typeof elemFiles === 'undefined' && elemFiles !== null) {
            var file = document.getElementById('uploadQRcode');
            this.files = file.files
        }
        for (var i = 0; i < this.files.length; i++) {
            var file = this.files[i];
            var imageType = /^image\//;

            if (!imageType.test(file.type)) {
                throw new Error('File type not valid');
            }

            // Read file
            var reader = new FileReader();
            reader.addEventListener('load', function () {
                // Show as preview image
                var elem = document.getElementById('qrfromurl');
                if (typeof elem !== 'undefined' && elem !== null) {
                    elem.remove();
                }
                var img = document.createElement('img');
                img.src = this.result;
                img.id = 'qrfromurl';
                preview.appendChild(img);
                // Analyse code
                qr.decode(this.result);
            }.bind(reader), false);
            reader.readAsDataURL(file);

        }
        delete this.files;
    }
    upload.addEventListener('change', generatQrCode, false);
    createqr.addEventListener('click', generatQrCode, false);
    $('#myTab li:first-child a').tab('show')
})();