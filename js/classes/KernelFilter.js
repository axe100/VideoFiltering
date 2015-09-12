/**
 * Created by D062114 on 9/12/15.
 */

function KernelFilter() {

    this.applyFilterToFrameDataWithMatrix = function (frameData, matrix) {
        var d = frameData.data;
        for (var i=0; i<d.length; i+=4) {
            var r = d[i];
            var g = d[i+1];
            var b = d[i+2];
            // CIE luminance for the RGB
            // The human eye is bad at seeing red and blue, so we de-emphasize them.
            var v = 0.2126*r + 0.7152*g + 0.0722*b;
            d[i] = d[i+1] = d[i+2] = v
        }
        return frameData;
    }
}