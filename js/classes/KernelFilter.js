/**
 * Created by D062114 on 9/12/15.
 */

function KernelFilter() {

    this.applyKernelFilterToFrameDataWithMatrix = function(frame, kernel, scale) {
        var kernelWidth = Math.round(Math.sqrt(kernel.length));
        var kernelBorderWidth = Math.floor(kernelWidth/2);
        var framePixels = frame.data;
        var frameWidth = frame.width;
        var frameHeight = frame.height;
        var width = frameWidth;
        var height = frameHeight;
        var helperCanvas = document.createElement('canvas');
        var helperContext = helperCanvas.getContext('2d');
        var outputFrame = helperContext.createImageData(width,height);
        var outputFramePixels = outputFrame.data;
        for (var y=0; y<height; y++) {
            for (var x=0; x<width; x++) {
                var pixelY = y;
                var pixelX = x;
                var pixelValuesOffset = (y*width+x)*4;
                var red = 0, green = 0, blue = 0, alpha = 0;
                for (var kernelY = 0; kernelY < kernelWidth; kernelY ++) {
                    for (var kernelX = 0; kernelX < kernelWidth; kernelX ++) {
                        var scy = pixelY + kernelY  - kernelBorderWidth;
                        var scx = pixelX + kernelX  - kernelBorderWidth;
                        if (scy >= 0 && scy < frameHeight && scx >= 0 && scx < frameWidth) {
                            var addingPixelValueOffset = (scy*frameWidth+scx)*4;
                            var weightAtKernelPosition = kernel[kernelY *kernelWidth+kernelX ];
                            red += framePixels[addingPixelValueOffset] * weightAtKernelPosition * scale;
                            green += framePixels[addingPixelValueOffset+1] * weightAtKernelPosition * scale;
                            blue += framePixels[addingPixelValueOffset+2] * weightAtKernelPosition * scale;
                            alpha += framePixels[addingPixelValueOffset+3] * weightAtKernelPosition;
                        }
                    }
                }
                outputFramePixels[pixelValuesOffset] = red;
                outputFramePixels[pixelValuesOffset+1] = green;
                outputFramePixels[pixelValuesOffset+2] = blue;
                outputFramePixels[pixelValuesOffset+3] = alpha;
            }
        }
        return outputFrame;
    }
}