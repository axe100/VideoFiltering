/**
 * Created by D062114 on 9/12/15.
 */

function NameLater() {

    this.filterFrame = function (frame) {
        var imagePixels = getPixels();
        var greyScaledImagePixels = applyGreyScaleToPixels(imagePixels);


    }

    function drawFrameOnCanvas(frame) {

    }

    this.getPixels = function (frame) {
        var c = getCanvas(frame.width, frame.height);
        var videoContainer = document.getElementById("video-container");
        insertAfter(c, videoContainer);
        var ctx = c.getContext('2d');
        ctx.drawImage(frame, 0, 0, frame.width, frame.height);
        return ctx.getImageData(0, 0, c.width, c.height);
    }

    function getCanvas(w,h) {
        var c = document.createElement('canvas');
        c.width = w;
        c.height = h;
        return c;
    };

    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    function filterImage(filter, image, var_args) {
        var args = [this.getPixels(image)];
        for (var i=2; i<arguments.length; i++) {
            args.push(arguments[i]);
        }
        return filter.apply(null, args);
    };

    function applyGreyScaleToPixels(pixels) {
        var d = pixels.data;
        for (var i=0; i<d.length; i+=4) {
            var r = d[i];
            var g = d[i+1];
            var b = d[i+2];
            // CIE luminance for the RGB
            // The human eye is bad at seeing red and blue, so we de-emphasize them.
            var v = 0.2126*r + 0.7152*g + 0.0722*b;
            d[i] = d[i+1] = d[i+2] = v
        }
        return pixels;
    };

}