let result = document.getElementById("result");
let password = document.getElementById("password");
let passDisplay = document.getElementById("pass-strength");

const check = (input) => {
  let result;
  const arr1 = [/[A-Z]+?/, /[a-z]+?/, /[0-9]+?/, /[$@#&!]+?/];

  const doMatch = (arr, word) => {
    let result = [];

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
        result = "100%";
        break;
    case 3:
        result = "75%";
        break;
    case 2:
        result = "50%";
        break;
    case 1:
        result = "25%";
        break;
    default:
        result = "Invalid";
    }
  }
  return result;
}
const checkPassword = () => {
  passDisplay.style.display = block;
  result.innerHTML = check(password.value);
}
password.onchange = checkPassword;


//SIGN IN FOCUS
