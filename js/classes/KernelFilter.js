/**
 * Created by D062114 on 9/12/15.
 */

function KernelFilter() {

    this.applyKernelFilterToFrameDataWithMatrixAndScale = function(pixels, kernel, scale) {
        var side = Math.round(Math.sqrt(kernel.length));
        var halfSide = Math.floor(side/2);

        var src = pixels.data;
        var sw = pixels.width;
        var sh = pixels.height;

        var w = sw;
        var h = sh;
        var outputFrame = createEmptyOutputFrameWithWidthAndHeight(w, h);
        var outputFramePixels = outputFrame.data;

        for (var y=0; y<h; y++) {
            for (var x=0; x<w; x++) {
                var sy = y;
                var sx = x;
                var dstOff = (y*w+x)*4;
                var r=0, g=0, b=0;
                for (var cy=0; cy<side; cy++) {
                    for (var cx=0; cx<side; cx++) {
                        var scy = Math.min(sh-1, Math.max(0, sy + cy - halfSide));
                        var scx = Math.min(sw-1, Math.max(0, sx + cx - halfSide));
                        var srcOff = (scy*sw+scx)*4;
                        var wt = kernel[cy*side+cx];
                        r += src[srcOff] * wt / scale;
                        g += src[srcOff+1] * wt / scale;
                        b += src[srcOff+2] * wt / scale;
                    }
                }
                outputFramePixels[dstOff] = r;
                outputFramePixels[dstOff+1] = g;
                outputFramePixels[dstOff+2] = b;
                outputFramePixels[dstOff+3] = 255;
            }
        }
        return outputFrame;
    };

    function createEmptyOutputFrameWithWidthAndHeight(width, height) {
        var helperCanvas = document.createElement('canvas');
        var helperContext = helperCanvas.getContext('2d');
        var result = helperContext.createImageData(width,height);
        return result;
    }

    function isPixelInsideOfFrame(pixelX, pixelY, frameWidth, frameHeight) {
        var result = false;
        if (pixelX >= 0 && pixelX < frameWidth && pixelY >= 0 && pixelY < frameHeight) {
            result = true;
        }
        return result;
    }
}