'use strict';

// PASSWORD STRENGTH
var result = document.getElementById('result');
var password = document.getElementById('password');
var passDisplay = document.getElementById('pass-strength');

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
    result = 'Minimum password length is 6';
  } else if (input.length > 12) {
    result = 'Maximum password length is 12';
  } else {
    var matchLength = doMatch(arr1, input).length;
    switch (matchLength) {
      case 4:
        result = 'Password Strength: 100%';
        break;
      case 3:
        result = 'Password Strength: 75%';
        break;
      case 2:
        result = 'Password Strength: 50%';
        break;
      case 1:
        result = 'Password Strength: 25%';
        break;
      default:
        result = 'Invalid';
    }
  }
  return result;
};
var checkPassword = function checkPassword() {
  passDisplay.style.display = 'inline-block';
  result.innerHTML = check(password.value);
};

// PASSWORD MATCH CHECK
var matchDisplay = document.getElementById('match-display');
var password2 = document.getElementById('password2');
var signupBtn = document.getElementById('sign-up');

var passwordMatch = function passwordMatch() {
  if (password.value !== password2.value) {
    matchDisplay.innerHTML = 'Passwords do not match!';
  } else {
    signupBtn.disabled = false;
  }
};

// ACCEPT-ANSWER TOGGLE

var showAccepted = function showAccepted(input) {
  var index = parseInt(input);
  var accepted = document.getElementsByClassName('accepted');
  var unacceptBtn = document.getElementsByClassName('unaccept');
  var acceptBtns = document.getElementsByClassName('accept');

  unacceptBtn[index].style.display = 'inline';
  accepted[index].style.display = 'inline';

  for (var i = 0; i <= acceptBtns.length - 1; i++) {
    acceptBtns[i].style.display = 'none';
  }
};

var showAcceptBtn = function showAcceptBtn(input) {
  var index = parseInt(input);
  var accepted = document.getElementsByClassName('accepted');
  var unacceptBtn = document.getElementsByClassName('unaccept');
  var acceptBtns = document.getElementsByClassName('accept');

  unacceptBtn[index].style.display = 'none';
  accepted[index].style.display = 'none';

  for (var i = 0; i <= acceptBtns.length - 1; i++) {
    acceptBtns[i].style.display = 'inline';
  }
};

// SHOW MORE CONTENT BUTTON
var showMore = function showMore(input) {
  var index = parseInt(input);
  var btnContainer = document.getElementsByClassName('btn-container');
  // let showMoreBtn = document.getElementsByClassName("show-more");
  var hiddenContent = document.getElementsByClassName('hidden-content');

  hiddenContent[index].style.display = 'inline';
  btnContainer[index].style.display = 'none';
};

//SHOW COMMENT SECTION
var showCommentForm = function showCommentForm(input) {
  //Input is the value of the button which corresponds with the position of the button
  //in the className DOM array
  var index = parseInt(input);
  var commentForm = document.getElementsByClassName('comment-form');
  commentForm[index].style.display = 'block';
};
