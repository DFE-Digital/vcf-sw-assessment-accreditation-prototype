/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

const pageUrl = window.location.pathname.split("/");
const currentURL = pageUrl[pageUrl.length-1];

$(document).ready(function () {
  window.GOVUKFrontend.initAll();
  console.log('currentURL', currentURL);

  // if (currentURL === 'let-supervisor-know') {
  //   const supervisorEmailValue = document.getElementById('supervisor-email').value;
  //   if (supervisorEmailValue !== "") {
  //     localStorage.setItem('supervisorEmail', false);
  //     localStorage.setItem('supervisorEmailValue', supervisorEmailValue);
  //     // console.log('supervisorEmailValue', supervisorEmailValue);
  //   }
  // }

  if (currentURL === 'booking-confirmation') {
    // if (localStorage.getItem('bookingTogetherDate'))
    if (localStorage.getItem('bookingMethodName')) {
      document.getElementById('bookingMethod').classList.remove('hidden');
      document.getElementById('bookingMethodSelected').innerHTML = localStorage.getItem('bookingMethodName');
    }

    if (localStorage.getItem('bookingTogetherDateName')) {
      document.getElementById('bookingTogetherDate').classList.remove('hidden');
      document.getElementById('bookingTogetherDateSelected').innerHTML = localStorage.getItem('bookingTogetherDateName');
    }

    if (localStorage.getItem('bookingKADateSelected')) {
      document.getElementById('bookingKADate').classList.remove('hidden');
      document.getElementById('bookingKADateSelected').innerHTML = localStorage.getItem('bookingKADateSelected');
    }

    if (localStorage.getItem('bookingScenarioDateSelected')) {
      document.getElementById('bookingScenarioDate').classList.remove('hidden');
      document.getElementById('bookingScenarioDateSelected').innerHTML = localStorage.getItem('bookingScenarioDateSelected');
    }

    if (localStorage.getItem('supervisorEmailValue')) {
      document.getElementById('supervisorEmail').classList.remove('hidden');
      document.getElementById('supervisorEmailValue').innerHTML = localStorage.getItem('supervisorEmailValue');
    }
  }

  if (currentURL === 'booking-dashboard') {
    // Remove all stored variable
    localStorage.removeItem('bookingMethodName');
    localStorage.removeItem('bookingTogetherDateName');
    localStorage.removeItem('bookingKADateSelected');
    localStorage.removeItem('bookingScenarioDateSelected');
    localStorage.removeItem('supervisorEmailValue');
  }
})


// # Functions
function signIn() {
  const signInEmail = document.getElementById('signin_email').value;
  const signInPassword = document.getElementById('signin_password').value;
  const signInBtn = document.getElementById('signInBtn');

  if (signInEmail !== '' && signInPassword !== '') {
    console.log('Ok all good');
    const attr = signInBtn.getAttributeNode("disabled");
    signInBtn.removeAttributeNode(attr);
    signInBtn.setAttribute("aria-disabled", "false");
    signInBtn.classList.remove("class", "govuk-button--disabled");
  } else {
    console.log('hey, you did not enter anything');
    signInBtn.setAttribute("disabled", "disabled");
    signInBtn.setAttribute("aria-disabled", "true");
    signInBtn.classList.add("class", "govuk-button--disabled");
  }
}

function getBookingMethod() {
  console.log('Booking Method BTN clicked');
  const ele = document.getElementsByName('booking-method');
  const getBookingMethodBtn = document.getElementById('getBookingMethodBtn');

  if ((document.getElementById('togetherRadio').checked) || (document.getElementById('separatelyRadio').checked)) {
    const attr = getBookingMethodBtn.getAttributeNode("disabled");
    if (attr) getBookingMethodBtn.removeAttributeNode(attr);
    getBookingMethodBtn.setAttribute("aria-disabled", "false");
    getBookingMethodBtn.classList.remove("class", "govuk-button--disabled");

    for(i = 0; i < ele.length; i++) {
      if(ele[i].checked) {
        localStorage.setItem('bookingMethodName', ele[i].value);
      }
    }

    if (document.getElementById('togetherRadio').checked) {
      localStorage.removeItem('bookingKADateSelected');
      localStorage.removeItem('bookingScenarioDateSelected');
    }
    if (document.getElementById('separatelyRadio').checked) {
      localStorage.removeItem('bookingTogetherDateName');
    }
  }
}

// function getBookedDatesforTogether() {
function bookingDate() {
  console.log('bookingDate called');
  const bookingDate = document.getElementById('bookingDate');
  const checked_dateTime = document.querySelector('input[name = "available-date"]:checked');

  if(checked_dateTime != null){
    localStorage.setItem('bookingTogetherDateName', checked_dateTime.value);

    const attr = bookingDate.getAttributeNode("disabled");
    if (attr) bookingDate.removeAttributeNode(attr);
    bookingDate.setAttribute("aria-disabled", "false");
    bookingDate.classList.remove("class", "govuk-button--disabled");
  }
}

// function getBookedDatesforKA() {
function kaDate() {
  console.log('kaDate called');
  const kaDate = document.getElementById('kaDate');

  const checked_dateTime = document.querySelector('input[name = "available-date"]:checked');

  if(checked_dateTime != null){
    // localStorage.setItem('bookingTogetherDateName', checked_dateTime.value);
    localStorage.setItem('bookingKADateSelected', checked_dateTime.value);

    const attr = kaDate.getAttributeNode("disabled");
    if (attr) kaDate.removeAttributeNode(attr);
    kaDate.setAttribute("aria-disabled", "false");
    kaDate.classList.remove("class", "govuk-button--disabled");
  }
}

// function getBookedDatesforScenario() {
function scenarioDate() {
  console.log('scenarioDate called');
  const scenarioDate = document.getElementById('scenarioDate');

  const checked_dateTime = document.querySelector('input[name = "available-date"]:checked');

  if(checked_dateTime != null){
    // localStorage.setItem('bookingTogetherDateName', checked_dateTime.value);
    localStorage.setItem('bookingScenarioDateSelected', checked_dateTime.value);

    const attr = scenarioDate.getAttributeNode("disabled");
    if (attr) scenarioDate.removeAttributeNode(attr);
    scenarioDate.setAttribute("aria-disabled", "false");
    scenarioDate.classList.remove("class", "govuk-button--disabled");
  }
}

function skipBookingScenarioDate() {
  localStorage.removeItem('bookingScenarioDateName');
}

function getSupervisorEmail() {
  const ele = document.getElementById('supervisor-email').value;
  const getSupervisorEmailBtn = document.getElementById('getSupervisorEmailBtn');

  if (ele !== '') {
    const attr = getSupervisorEmailBtn.getAttributeNode("disabled");
    getSupervisorEmailBtn.removeAttributeNode(attr);
    getSupervisorEmailBtn.setAttribute("aria-disabled", "false");
    getSupervisorEmailBtn.classList.remove("class", "govuk-button--disabled");
    localStorage.setItem('supervisorEmailValue', ele);
  } else {
    getSupervisorEmailBtn.setAttribute("disabled", "disabled");
    getSupervisorEmailBtn.setAttribute("aria-disabled", "true");
    getSupervisorEmailBtn.classList.add("class", "govuk-button--disabled");
    localStorage.removeItem('supervisorEmailValue');
  }
}

function skipSupervisorEmail() {
  localStorage.removeItem('supervisorEmailValue');
}
