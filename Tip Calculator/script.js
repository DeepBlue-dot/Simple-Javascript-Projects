let bill_amount=document.getElementById("bill-amount");
let tip_percentage=document.getElementById("tip-percentage");
let result=document.getElementById("total");


function Calculate(){
    const bill=bill_amount.value;
    const tip=tip_percentage.value;
    const totalValue = bill * (1 + tip / 100);
    result.innerHTML=totalValue.toFixed(2);
}