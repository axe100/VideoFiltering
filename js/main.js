/**
 * Created by D062114 on 9/12/15.
 */

var KernelInputFields = new KernelInputFields();
var KernelFilter = new KernelFilter();
var Canvas = new Canvas();

var video;
var videoWith;
var videoHeight;
var drawingCanvas;
var drawingContext;
var dataRetrivalHelperCanvas;
var dataRetrivalHelperContext;

function init() {
    initVariables();
    addFileInputChangeListener();
    addVideoPlayEventListener();
    KernelInputFields.generateKernelInputFields();
}

function initVariables() {
    video = document.querySelector('video');
    drawingCanvas = document.getElementById('canvas');
    drawingContext = drawingCanvas.getContext('2d');
    dataRetrivalHelperCanvas = document.createElement('canvas');
    dataRetrivalHelperContext = dataRetrivalHelperCanvas.getContext('2d');
}

function draw() {
    if(video.paused || video.ended)	return false;
    dataRetrivalHelperContext.drawImage(video,0,0,videoWith, videoHeight);
    var frameData = dataRetrivalHelperContext.getImageData(0, 0, videoWith, videoHeight);
    var matrix;
    frameData = KernelFilter.applyKernelFilterToFrameDataWithMatrix(frameData,
           [1,1,1,1,1,
            1,1,1,1,1,
            1,1,1,1,1,
            1,1,1,1,1], 0.2);
    drawingContext.putImageData(frameData, 0, 0);
    setTimeout(draw, 20);
}

function addFileInputChangeListener() {
    var inputNode;
    inputNode = document.querySelector('input');
    inputNode.addEventListener('change', playSelectedFile, false);
}

function addVideoPlayEventListener() {
    video.addEventListener('play', function(){
        videoWith = video.clientWidth;
        videoHeight = video.clientHeight;
        drawingCanvas.width = videoWith;
        drawingCanvas.height = videoHeight;
        dataRetrivalHelperCanvas.width = videoWith;
        dataRetrivalHelperCanvas.height = videoHeight;
        draw();
    },false);
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