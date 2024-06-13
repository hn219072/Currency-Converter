const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024.6.13/v1/currencies";
const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg")
for(let select of dropdown){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText= currCode;
        newOption.value= currCode;
        if(select.name=="from"&& currCode=="USD"){
            newOption.selected="selected";
        }
        if(select.name=="to"&& currCode=="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);


    }
    select.addEventListener("change",(evt) =>{
        updateflag(evt.target);
    });

}
const updateflag =(element)=>{
    let currCode= element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
console.log(element);
}
btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==" "|| amtVal < 1){
        amtVal = 1;
        amount.value=1;
    }
    const URL =`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
    let finalAmount=amtVal*rate;
    msg.innerText=`${amtVal}${fromCurr.value} = ${finalAmount}${toCurr.value}`
    console.log(rate);
    

})

