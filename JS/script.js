const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class calculator{
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    //add digit to calculator screnn
    addDigit(digit){
        //check if current operation already has a dot
        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    //process all calculator Operations
    processOperation(operation){
        //check if current is empty
        if(this.currentOperationText.innerText === "" && operation !== "C") {
            if(this.previousOperationText.innerText !== ""){
                //change operation
                this.changeOparation(operation);
            }
            return
        }
        //get current and previous sreen
        let operationValue;
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText;

        switch(operation){
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
               this.processDelOperator()
                break;
            case "CE":
               this.processClearCurrentOperation()
                break;
            case "C":
               this.processClearAllOperation()
                break;
            case "=":
               this.processEqualOperation()
                break;
            default:
                break;
        }
    }

    //change values of the calculator screen
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null){
       
        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        }
        else{
            //check if value is zero, if it is just add current value
            if (previous === 0) {
                operationValue = current;
            }

            //add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    changeOparation(operation){
        const mathOperation = ["*", "/", "+", "-"]

        if (!mathOperation.includes(operation)) {
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    //delete the last digit
    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    //clear current oparation
    processClearCurrentOperation(){
        this.currentOperationText.innerText = ""
    }

    //clear all operation
    processClearAllOperation(){
        this.currentOperationText.innerText = ""
        this.previousOperationText.innerText = ""
    }

    //button equal
    processEqualOperation(){
        const operation = previousOperationText.innerText.split(" ")[1]
        this.processOperation(operation)
    }
}

const calc = new calculator(previousOperationText, currentOperationText)

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) =>{
        const value = e.target.innerText;

        if(+value >= 0 || value == "."){
            calc.addDigit(value);
        } else{
           calc.processOperation(value);
        }
    });
});