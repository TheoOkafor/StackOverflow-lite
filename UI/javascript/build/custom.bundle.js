"use strict";

//PASSWORD STRENGTH
var result = document.getElementById("result");
var password = document.getElementById("password");
var passDisplay = document.getElementById("pass-strength");

var check = function check(input) {
  var result = void 0;
  var arr1 = [/[A-Z]+?/, /[a-z]+?/, /[0-9]+?/, /[$@#&!]+?/];

  var doMatch = function doMatch(arr, word) {
    var result = [];
    var i = void 0;

    for (i in arr) {
      if (word.match(arr[i]) !== null) {
        result.push(word.match(arr[i]));
      }
    }
    return result;
  };

  if (input.length < 6) {
    result = "Minimum password length is 6";
  } else if (input.length > 12) {
    result = "Maximum password length is 12";
  } else {
    var matchLength = doMatch(arr1, input).length;
    switch (matchLength) {
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
};
var checkPassword = function checkPassword() {
  passDisplay.style.display = "inline-block";
  result.innerHTML = check(password.value);
};
//password.onchange = checkPassword;


//ACCEPT-ANSWER TOGGLE

var showAccepted = function showAccepted(input) {
  var index = parseInt(input);
  var accepted = document.getElementsByClassName("accepted");
  var unacceptBtn = document.getElementsByClassName("unaccept");
  var acceptBtns = document.getElementsByClassName("accept");

  unacceptBtn[index].style.display = "inline";
  accepted[index].style.display = "inline";

  for (var i = 0; i <= acceptBtns.length - 1; i++) {
    acceptBtns[i].style.display = "none";
  }
};

var showAcceptBtn = function showAcceptBtn(input) {
  var index = parseInt(input);
  var accepted = document.getElementsByClassName("accepted");
  var unacceptBtn = document.getElementsByClassName("unaccept");
  var acceptBtns = document.getElementsByClassName("accept");

  unacceptBtn[index].style.display = "none";
  accepted[index].style.display = "none";

  for (var i = 0; i <= acceptBtns.length - 1; i++) {
    acceptBtns[i].style.display = "inline";
  }
};
