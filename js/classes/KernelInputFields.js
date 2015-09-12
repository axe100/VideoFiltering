/**
 * Created by D062114 on 9/12/15.
 */

function KernelInputFields() {

    this.generateKernelInputFields = function () {
        var kernel = document.getElementById("kernel");
        for (var i = 0; i < 25; i++) {
            var kernelInputField = document.createElement('input');
            kernelInputField.id = "kernelInputField_" + i;
            kernelInputField.className = "kernelInputField";
            kernelInputField.type = "text";
            kernel.appendChild(kernelInputField);
        }
    }
}