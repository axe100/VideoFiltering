/**
 * Created by D062114 on 9/12/15.
 */

function KernelFilter() {

    this.applyKernelFilterToFrameDataWithMatrixAndScale = function(frame, kernel, scale) {
        var kernelWidth = Math.round(Math.sqrt(kernel.length));
        var kernelBorderWidth = Math.floor(kernelWidth/2);
        var framePixels = frame.data;
        var frameWidth = frame.width;
        var frameHeight = frame.height;
        var width = frameWidth;
        var height = frameHeight;
        var outputFrame = createEmptyOutputFrameWithWidthAndHeight(width, height);
        var outputFramePixels = outputFrame.data;
        for (var y=0; y<height; y++) {
            for (var x=0; x<width; x++) {
                var pixelY = y;
                var pixelX = x;
                var pixelValuesOffset = (y*width+x)*4;
                var red = 0, green = 0, blue = 0, alpha = 0;
                for (var kernelY = 0; kernelY < kernelWidth; kernelY ++) {
                    for (var kernelX = 0; kernelX < kernelWidth; kernelX ++) {
                        var scx = pixelX + kernelX  - kernelBorderWidth;
                        var scy = pixelY + kernelY  - kernelBorderWidth;
                        if (isPixelInsideOfFrame(scx, scy, frameWidth, frameHeight)) {
                            var addingPixelValueOffset = (scy*frameWidth+scx)*4;
                            var weightAtKernelPosition = kernel[kernelY *kernelWidth+kernelX ];
                            red += framePixels[addingPixelValueOffset] * weightAtKernelPosition;
                            green += framePixels[addingPixelValueOffset+1] * weightAtKernelPosition;
                            blue += framePixels[addingPixelValueOffset+2] * weightAtKernelPosition;
                            alpha += framePixels[addingPixelValueOffset+3] * weightAtKernelPosition;
                        }
                    }
                }
                outputFramePixels[pixelValuesOffset] = red/scale;
                outputFramePixels[pixelValuesOffset+1] = green/scale;
                outputFramePixels[pixelValuesOffset+2] = blue/scale;
                outputFramePixels[pixelValuesOffset+3] = alpha;
            }
        }
        return outputFrame;
    }

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