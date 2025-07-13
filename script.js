const inputSlider = document.querySelector("[data-lengthslider]");
const lengthdisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[dataPasswordDisplay]");

const copybtn = document.querySelector("[data-copy]");

const copymsg = document.querySelector("[ data-copymsg]");


const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");

const indicator = document.querySelector("[data-indicator]");
const generatebtn = document.querySelector(".generatebutton");

const allcheckbox = document.querySelectorAll("input[type=checkbox]");

const symbl = '~!@#$%^&*()-_=+[{]}\\|;":,<.>/?';

 



let password = "";

let passwordlength = 10;
let checkcount = 0;
handleSlider();
//set circle color to grey
setindicator("#ccc");


//set passwordlength
function handleSlider() {
    inputSlider.value = passwordlength;
    lengthdisplay.innerText = passwordlength;

    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordlength-min)*100/(max-min)) + "% 100%";
}


function setindicator(color){
    indicator.style.backgroundColor = color;
    //shadow
}

function getRndInteger(min,max){
    return  Math.floor(Math.random()*(max-min))+min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}
 
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generatesymbol(){
    const randNum = getRndInteger(0, symbl.length);
    return symbl.charAt(randNum);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower=false;
    let hasNum = false;
    let hasSym=false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordlength>=8){
        setindicator("#0f0");
    }
    else if(
        (hasLower || hasUpper) &&
        (hasNum || hasSym)&&
        passwordlength >=6
    ){
        setindicator("#ff0");
    }
    else{
        setindicator("#f00");
    }

    
}
async function copycontent() {
        try{
            await navigator.clipboard.writeText(passwordDisplay.value);
            copymsg.innerText = "copied";
        }
        catch(e){
            copymsg.innerText = "Failed";
        }

        copymsg.classList.add("active");

        setTimeout(() => {
            copymsg.classList.remove("active");
        }, 2000);
    }

function handlecheckboxchange(){
    checkcount = 0;
    allcheckbox.forEach((checkbox) => {
        if (checkbox.checked) checkcount++;
    });
}


//special case
if(passwordlength < checkcount){
    passwordlength = checkcount;
    handleSlider();
}



allcheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change',handlecheckboxchange);
})

inputSlider.addEventListener('input', (e) =>{
        passwordlength = e.target.value;
        handleSlider();
}
)

copybtn.addEventListener('click', () =>{
    if(passwordDisplay.value){
        copycontent();
    }

})  


generatebtn.addEventListener('click',() =>{
    //none of the checkbox are selected

    if(checkcount ==0) 
        return;
    if(passwordlength < checkcount){
        passwordlength = checkcount;
        handleSlider();
    }

    //lets start the journey to find new password

    //remove old password

    password ="";

    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked){
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked){
    //     password += generatesymbol();
    // }

    let funArr = [];

    if(uppercaseCheck.checked)
        funArr.push(generateUpperCase);
    if(lowercaseCheck.checked)
        funArr.push(generateLowerCase);
    if(numbersCheck.checked)
        funArr.push(generateRandomNumber);
    if(symbolsCheck.checked)
        funArr.push(generatesymbol);

    //compulsary addition

    for(let i=0; i<funArr.length; i++){
        password += funArr[i]();
    }

    for(let i=0; i<passwordlength-funArr.length; i++){
        let randIndex = getRndInteger(0,funArr.length);
        password += funArr[randIndex]();
    }

    //shuffle the password

    function shufflepassword(arr){
        for (let i = arr.length - 1; i > 0; i--) {
        
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        }
        let str ="";
        arr.forEach((el) => (str += el));
        return str;
}

    password = shufflepassword(Array.from(password));

    //show in UI
    passwordDisplay.value = password;

    //calculate strength
    calcStrength();
});





    










 












