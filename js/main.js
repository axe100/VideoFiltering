/**
 * Created by D062114 on 9/12/15.
 */

var kernelInputFields = new KernelInputFields();

function init() {
    addFileInputChangeListener();
    kernelInputFields.generateKernelInputFields();
}

function addFileInputChangeListener() {
    var inputNode;
    inputNode = document.querySelector('input');
    inputNode.addEventListener('change', playSelectedFile, false);
}

function playSelectedFile(event) {
    var file = this.files[0];
    var type = file.type;
    var videoNode = document.querySelector('video');
    var canPlay = videoNode.canPlayType(type);
    if (canPlay == false) {
        return;
    }
    var fileURL = URL.createObjectURL(file);
    videoNode.src = fileURL;
}
