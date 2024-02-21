let bill_amount=document.getElementById("bill-amount");
let tip_percentage=document.getElementById("tip-percentage");
let result=document.getElementById("total");


function Calculate(){
    const bill=bill_amount.value;
    const tip=tip_percentage.value;
    console.log(bill, tip);
    result.innerHTML=totalValue.toFixed(2);
}