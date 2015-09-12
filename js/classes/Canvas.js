/**
 * Created by D062114 on 9/12/15.
 */

function Canvas() {

    var context;

    this.drawFrameDataToCanvas = function (frameData) {
        checkContextForNull();
        context.putImageData(frameData, 0, 0);
    }

    function checkContextForNull() {
        if(context == null) {
            initCanvasAndContext();
        }
    }

    function initCanvasAndContext() {
        var canvas = document.createElement("canvas");
        canvas.with = 600;
        canvas.height = 600;
        document.body.appendChild(canv);
        context = canvas.getContext('2d');
    }
}