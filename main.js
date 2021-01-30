//setting global variable
const firstClassTicket = 150;
const economyClassTicket = 100;
const negativAlertWrapper = document.querySelector(".negative-alert-wrapper");
const bookAlertWrapper = document.querySelector(".book-alert-wrapper");
const negetiveAlert = document.querySelector(".alert-negetive");
const bookingAlert = document.querySelector(".booking-alert");
let totalCost = 0;

//declaring ticketCountChange function to increase or decrase the ticket count
function ticketCountChange(isIncrease, ticketClass) {
    let TicketInput = document.getElementById(ticketClass + "Inp");
    let ticketCount = parseInt(TicketInput.value);
    let TicketNewCount = ticketCount;
    //increase ticket count
    if (isIncrease == true) {
        TicketNewCount = ticketCount + 1;
    }
    // decrease ticket count 
    if (isIncrease == false) {
        if (ticketCount > 0) {
            TicketNewCount = ticketCount - 1;
        }
        //this is for animating warning box
        else {
            negativAlertWrapper.classList.add('wrapper-animator');
            negetiveAlert.classList.add('alert-box-animator');
        }

    }
    TicketInput.value = TicketNewCount;
    let TicketTotal = 0;
    if (ticketClass == 'firstClass') {
        TicketTotal = TicketNewCount * firstClassTicket;
    }
    if (ticketClass == 'economyClass') {
        TicketTotal = TicketNewCount * economyClassTicket;
    }

    totalTicketCost();


}

function totalTicketCost() {
    //DOM elements
    const subTotalDisplay = document.getElementById('sub-total');
    const vatDisplay = document.getElementById('vat');
    const grandTotalDisplay = document.getElementById('grand-total');
    const firstClassCount = parseFloat(document.getElementById('firstClassInp').value);
    const economyClassCount = parseFloat(document.getElementById('economyClassInp').value);

    //calculating subTotal, vat and grandTotal

    const subTotal = firstClassCount * firstClassTicket + economyClassCount * economyClassTicket;
    const vat = subTotal / 10; //for 10% vat
    const grandTotal = subTotal + vat;

    //assign the values     
    subTotalDisplay.innerText = "$" + subTotal;
    vatDisplay.innerText = '$' + vat;
    grandTotalDisplay.innerText = '$' + grandTotal;
    totalCost = grandTotal;

}


//book ticket function
function bookTicket() {

    bookAlertWrapper.classList.add('wrapper-animator');
    bookingAlert.classList.add('alert-box-animator');

    const firstClassCount = document.getElementById('firstClassInp').value;
    const economyClassCount = document.getElementById('economyClassInp').value;
    const warningDisplay = document.querySelector("#booking-warning-text");
    const bookAlertBtn = document.querySelector(".book-alert-btn");
    const message = "You have selected " + firstClassCount + " FIRST CLASS and " + economyClassCount + " ECONOMY CLASS ticket. Your total cost will be $" + totalCost + " (including VAT). Click 'ok' to book the ticket."
    const warningHeading = document.querySelector(".book-warning");
    if (totalCost == 0) {
        warningDisplay.innerText = "You have not selected any ticket . Please select at least one ticket.";
        bookAlertBtn.addEventListener("click", removeAlertBox);
    }
    else {
        bookAlertBtn.removeEventListener("click", removeAlertBox);
        warningDisplay.innerText = message;
        bookAlertBtn.addEventListener("click", function () {
            warningHeading.innerText = "Success";
            warningHeading.classList.add("text-green");
            warningDisplay.innerHTML = "<i class='fas text-green fa-check-circle'></i> ticket booking successful.Thank you for using our service.";
            bookAlertBtn.addEventListener("click", removeAlertBox);
        });
    }
}
//book button
document.querySelector("#book-button").addEventListener("click", bookTicket);

//remove alert box
function removeAlertBox(event) {
    event.target.parentNode.parentNode.classList.remove('wrapper-animator');
    event.target.parentNode.classList.remove('alert-box-animator');
    setTimeout(function () {
        //this code will exicute after animation
        document.querySelector(".book-warning").classList.remove("text-green");
        document.querySelector(".book-warning").innerText = "Warning";
    }, 300);

}

//remove alert box listener

document.querySelector(".alert-box-btn").addEventListener("click", removeAlertBox);





