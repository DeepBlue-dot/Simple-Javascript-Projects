let random_num= Math.floor(Math.random()*100)
let life=10
console.log(random_num)
const input_filed=document.getElementById("guess_number")
const sub=document.getElementById("submitBtn")
const help=document.querySelector(".help");
const rest=document.querySelector(".restart");
const ans=document.querySelector(".answer");

console.log(document.body.innerHTML)

function get_num(){
    if(Number(input_filed.value) > random_num){
        help.style.display="flex"
        help.innerHTML="Too High"
        ans.style.display="flex"
        ans.innerHTML="Wrong"
        life--
    }
    else if(Number(input_filed.value) == random_num)
    {
        help.style.display="none"
        ans.style.display="flex"
        sub.disabled=true;
        rest.style.display="flex"
        ans.innerHTML="Congratulations"
    }
    else if(Number(input_filed.value) < random_num){
        help.style.display="flex"
        help.innerHTML="Too Low"
        ans.style.display="flex"
        ans.innerHTML="Wrong"
        life--
    }
    input_filed.value=""
    if(life==0){
        game_over()
    }
    console.log(life)
}
function reset(){
    random_num= Math.floor(Math.random()*100)
    console.log(random_num)
    life=10
    help.style.display="none"
    ans.style.display="none"
    rest.style.display="none"
    input_filed.value="";
    sub.disabled=false;
}
function game_over(){
    help.style.display="flex"
    help.innerHTML= "Game Over"
    ans.style.display="flex"
    ans.innerHTML="Failed"
    sub.disabled=true;
    rest.style.display="flex"
}