/**
 * Created by D062114 on 9/12/15.
 */

function KernelInput() {
    var NUMBER_OF_INPUT_FIELDS = 25;
    var DEFAULT_SCALE_VALUE = 1;
    var kernelValues = [0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 1, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0];
    var scaleValue = DEFAULT_SCALE_VALUE;
    var kernelInputFields = [];

    if(kernelInputFields.length == 0) {
        var kernel = document.getElementById("kernel");
        for (var i = 0; i < NUMBER_OF_INPUT_FIELDS; i++) {
            var kernelInputField = document.createElement('input');
            kernelInputField.className = "kernelInputField";
            kernelInputField.id = i+"";
            kernelInputField.type = "text";
            kernelInputField.value = kernelValues[i];
            kernelInputField.addEventListener('input', function (event) {
                console.log("Changed Kernel")
                var indexInKernel = parseFloat(event.target.id);
                var indexValue = parseFloat(event.target.value);
                kernelValues[indexInKernel] = indexValue;
            });
            kernel.appendChild(kernelInputField);
            kernelInputFields[i] = kernelInputField;
        }
    }

    var scaleField = document.getElementById("scale");
    scaleField.value = DEFAULT_SCALE_VALUE;
    scaleField.addEventListener('input', function (event) {
        console.log("Changed Scale");
        scaleValue = parseFloat(event.target.value);
    });

    KernelInput.prototype.getKernelValues = function() {
        return kernelValues;
    }

    KernelInput.prototype.getScaleValue = function() {
        return scaleValue;
    }
}


