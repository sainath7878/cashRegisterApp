const billAmount = document.querySelector("#bill-amount");
const cashGiven = document.querySelector("#cash-given");
const btnCheck = document.querySelector(".btn-check");
const errorMessage = document.querySelector(".error-message");
const notesToBeReturned = document.querySelectorAll(".notes");
const btnNext = document.querySelector(".btn-next");
const cashGivenDiv = document.querySelector(".cash-given");
const notesTable = document.querySelector("Table");
const returnChange = document.querySelector(".return-change");

const availableCurrencyNotes = [2000,500,100,20,5,1];

btnNext.addEventListener("click", function showCashGivenDiv(){
    errorMessage.style.display = "none";
    if(Number(billAmount.value) > 0){
        btnNext.style.display = "none";
        cashGivenDiv.style.display = "block";
        btnCheck.style.display = "block";
        btnCheck.addEventListener("click" ,function validateBillandCase(){
            errorMessage.style.display = "none";
            if(Number(cashGiven.value > 0) && Number(billAmount.value) > 0){
                if(Number(cashGiven.value) > Number(billAmount.value) ){
                    notesTable.style.visibility="visible";
                    const amountToBeReturned = cashGiven.value - billAmount.value;
                    calculateAmount(amountToBeReturned);
                }
                else if(Number(cashGiven.value) === Number(billAmount.value)){
                    returnChange.style.visibility = "visible";
                    notesTable.style.visibility="hidden";
                    const amountToBeReturned = cashGiven.value - billAmount.value;
                    returnChange.innerText = "Change to be returned = " + amountToBeReturned;
                }
                else{
                    showErrorMessage("Cash Given must be greater than Bill Amount");
                }
            }
            else{
                showErrorMessage("Entered fields must be positive");
            }
            
        })
    }
    else{
        showErrorMessage("Entered Bill Amount must be positive");
    }
} )

function showErrorMessage(msg){
    errorMessage.style.display = "block";
    errorMessage.innerText = msg;
    returnChange.style.visibility = "hidden";
    notesTable.style.visibility="hidden";
}

function calculateAmount(amount){
    returnChange.style.visibility = "visible";
    returnChange.innerText = "Change to be returned = " + amount;
    for(var i=0 ;i<availableCurrencyNotes.length;i++ ){
        var numberOfNotes = Math.trunc(amount / availableCurrencyNotes[i]);
        amount = amount%availableCurrencyNotes[i];
        notesToBeReturned[i].innerText = numberOfNotes;
    }
}