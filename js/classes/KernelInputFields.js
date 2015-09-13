/**
 * Created by D062114 on 9/12/15.
 */

function KernelInputFields() {

    var NUMBER_OF_INPUT_FIELDS = 25;
    var INDEX_OF_CENTERED_KERNEL_FIELD = 12;
    var kernel = [0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0,
                  0, 0, 1, 0, 0,
                  0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0];

    var kernelInputFields = [];

    this.generateKernelInputFields = function () {
        if(kernelInputFields.length == 0){
            var kernel = document.getElementById("kernel");
            for (var i = 0; i < NUMBER_OF_INPUT_FIELDS; i++) {
                var kernelInputField = document.createElement('input');
                kernelInputField.className = "kernelInputField";
                kernelInputField.type = "text";
                kernelInputField.value = getDefaultValueForFieldAtIndex(i);
                kernel.appendChild(kernelInputField);
                kernelInputFields[i] = kernelInputField;
            }
        }
    }

    this.getKernelValuesAsArray = function() {
        //validateKernel();
        return kernel;
    }

    function validateKernel() {
        if(kernelInputFields.length != 0) {
            for (var i = 0; i < NUMBER_OF_INPUT_FIELDS; i++) {
                kernel[i] = kernelInputFields[i].value;
            }
        }
    }

    function getDefaultValueForFieldAtIndex(index) {
        var result;
        if(index != INDEX_OF_CENTERED_KERNEL_FIELD) {
            result = 0;
        } else {
            result = 1;
        }
        return result;
    }
}