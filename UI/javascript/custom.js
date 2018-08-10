//PASSWORD STRENGTH
let result = document.getElementById("result");
let password = document.getElementById("password");
let passDisplay = document.getElementById("pass-strength");

const check = (input) => {
  let result;
  const arr1 = [/[A-Z]+?/, /[a-z]+?/, /[0-9]+?/, /[$@#&!]+?/];

  const doMatch = (arr, word) => {
    let result = [];
    let i;

    for (i in arr){
      if(word.match(arr[i]) !== null){
        result.push(word.match(arr[i]));
      }
    }
    return result;
  };
  
  if(input.length<6){
    result = "Minimum password length is 6";
  }
  else if(input.length>12){
    result = "Maximum password length is 12";
  }
  else {
    let matchLength = doMatch(arr1, input).length;
    switch(matchLength){
        case 4:
        result = "Password Strength: 100%";
        break;
    case 3:
        result = "Password Strength: 75%";
        break;
    case 2:
        result = "Password Strength: 50%";
        break;
    case 1:
        result = "Password Strength: 25%";
        break;
    default:
        result = "Invalid";
    }
  }
  return result;
}
const checkPassword = () => {
  passDisplay.style.display = "inline-block";
  result.innerHTML = check(password.value);
}

//PASSWORD MATCH CHECK
let matchDisplay = document.getElementById("match-display");
let password2 = document.getElementById("password2");
let signupBtn = document.getElementById("sign-up");

const passwordMatch = () => {
  if (password.value !== password2.value){
    matchDisplay.innerHTML = "Passwords do not match!";
  }else {
    signupBtn.disabled = false;
  }
}

//ACCEPT-ANSWER TOGGLE

const showAccepted = (input) => {
  let index = parseInt(input);
  let accepted = document.getElementsByClassName("accepted");
  let unacceptBtn = document.getElementsByClassName("unaccept");
  let acceptBtns = document.getElementsByClassName("accept");

  unacceptBtn[index].style.display = "inline";
  accepted[index].style.display = "inline";

  for (let i=0; i<=acceptBtns.length-1; i++){
    acceptBtns[i].style.display = "none";
  }
}


const showAcceptBtn = (input) => {
  let index = parseInt(input);
  let accepted = document.getElementsByClassName("accepted");
  let unacceptBtn = document.getElementsByClassName("unaccept");
  let acceptBtns = document.getElementsByClassName("accept");

  unacceptBtn[index].style.display = "none";
  accepted[index].style.display = "none";

  for (let i=0; i<= acceptBtns.length-1; i++){
    acceptBtns[i].style.display = "inline";
  }
}

//SHOW MORE CONTENT BUTTON
const showMore = (input) => {
  let index = parseInt(input);
  let btnContainer = document.getElementsByClassName("btn-container");
  //let showMoreBtn = document.getElementsByClassName("show-more");
  let hiddenContent = document.getElementsByClassName("hidden-content");

  hiddenContent[index].style.display = "inline";
  btnContainer[index].style.display = "none";
}