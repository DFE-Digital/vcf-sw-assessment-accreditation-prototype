/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

const pageUrl = window.location.pathname.split("/");
const currentURL = pageUrl[pageUrl.length-1];
const pageUrlPath = window.location.pathname;

$(document).ready(function () {
  window.GOVUKFrontend.initAll();
  // console.log('currentURL', currentURL);
  console.log('pageUrlPath', pageUrlPath);

  if ((pageUrlPath === '/') || (pageUrlPath === '/booking/version-3/') || (pageUrlPath === '/booking/version-3/start') || (pageUrlPath === '/booking/version-3/data-cleared')) {
    const backLink = document.getElementById('backLink').style.display = 'none';
  }

  // If on the Check answers page
  if (currentURL === 'booking-confirmation') {

    // Set the correct dates to show
    if (localStorage.getItem('bookingMethodName') === "Together") {
      localStorage.removeItem('bookingKADateSelected');
      localStorage.removeItem('bookingScenarioDateSelected');
    }
    if (localStorage.getItem('bookingMethodName') === "Separately") {
      localStorage.removeItem('bookingTogetherDateName');
    }

    // ################

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
      document.getElementById('changeManagersEmail').classList.remove('hidden');
      document.getElementById('addManagersEmail').classList.add('hidden');
      document.getElementById('supervisorEmailValue').innerHTML = localStorage.getItem('supervisorEmailValue');
    } else {
      document.getElementById('changeManagersEmail').classList.add('hidden');
      document.getElementById('addManagersEmail').classList.remove('hidden');
      document.getElementById('supervisorEmailValue').innerHTML = "Not provided"
    }

    // Changes to details
    // ##################

    // changeBookingMethod
    var changeBookingMethod = document.getElementById('changeBookingMethod');
    changeBookingMethod.addEventListener('click', changeBookingMethodScript);
    function changeBookingMethodScript(){
      localStorage.setItem('changingBookingMethod', true);
    }

    // changeAssessmentDate
    var changeAssessmentDate = document.getElementById('changeAssessmentDate');
    changeAssessmentDate.addEventListener('click', changeAssessmentDateScript);
    function changeAssessmentDateScript(){
      localStorage.setItem('changingAssessmentDate', true);
    }

    // changeKAssessmentDate
    var changeKAssessmentDate = document.getElementById('changeKAssessmentDate');
    changeKAssessmentDate.addEventListener('click', changeKAssessmentDateScript);
    function changeKAssessmentDateScript(){
      localStorage.setItem('changingKAssessmentDate', true);
    }

    // changeKAssessmentDate
    var changeScenarioDate = document.getElementById('changeScenarioDate');
    changeScenarioDate.addEventListener('click', changeScenarioDateScript);
    function changeScenarioDateScript(){
      localStorage.setItem('changingScenarioDate', true);
    }

    // changeManagersEmail
    var changeManagersEmail = document.getElementById('changeManagersEmail');
    changeManagersEmail.addEventListener('click', changeManagersEmailScript);
    function changeManagersEmailScript(){
      localStorage.setItem('changingManagersEmail', true);
    }


    // ####################
    // Remove unused localStorage
    localStorage.removeItem('changingBookingMethod');
    localStorage.removeItem('changingAssessmentDate');
    localStorage.removeItem('changingKAssessmentDate');
    localStorage.removeItem('changingScenarioDate');
    localStorage.removeItem('changingManagersEmail');
  }

  if (currentURL === 'booking-dashboard') {
    // Remove all stored variable
    localStorage.removeItem('bookingMethodName');
    localStorage.removeItem('bookingTogetherDateName');
    localStorage.removeItem('bookingKADateSelected');
    localStorage.removeItem('bookingScenarioDateSelected');
    localStorage.removeItem('supervisorEmailValue');
  }

  if ( (pageUrlPath === '/booking/version-3/let-supervisor-know') && (localStorage.getItem('changingManagersEmail')) ) {
    const getSupervisorEmailFormAction = document.getElementById('getSupervisorEmailFormAction');
    const supervisorEmailText = document.getElementById('supervisor-email');
    getSupervisorEmailFormAction.setAttribute("action", "/booking/version-3/booking-confirmation");
    supervisorEmailText.value = localStorage.getItem('supervisorEmailValue');
  }

  // #################################
  // Preload Functions
  getSupervisorEmail();
})


// # Functions
function signIn() {
  const signInEmail = document.getElementById('signin_email').value;
  const signInPassword = document.getElementById('signin_password').value;
  const signInBtn = document.getElementById('signInBtn');

  if (signInEmail !== '' && signInPassword !== '') {
    console.log('Ok all good');
    const attr = signInBtn.getAttributeNode("disabled");
    if (attr) signInBtn.removeAttributeNode(attr);
    signInBtn.setAttribute("aria-disabled", "false");
    signInBtn.classList.remove("class", "govuk-button--disabled");
  } else {
    console.log('hey, you did not enter anything');
    signInBtn.setAttribute("disabled", "disabled");
    signInBtn.setAttribute("aria-disabled", "true");
    signInBtn.classList.add("class", "govuk-button--disabled");
  }
}

// Get the method of booking
function getBookingMethod() {
  // console.log('Booking Method BTN clicked');
  // console.log('localStorage.getItem(\'bookingMethodName\')', localStorage.getItem('bookingMethodName'));
  const ele = document.getElementsByName('booking-method');
  const getBookingMethodBtn = document.getElementById('getBookingMethodBtn');
  const bookingMethodFormAction = document.getElementById('bookingMethodFormAction');
  const kaDateBtn = document.getElementById('kaDate');
  const scenarioDateBtn = document.getElementById('scenarioDate');

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
      // if (localStorage.getItem('bookingMethodName') === "Together") {
      //   console.log('You already selected "Togther"');
      //   bookingMethodFormAction.setAttribute("action", "/booking/version-3/booking-confirmation");
      // } else {
        // localStorage.removeItem('bookingKADateSelected');
        // localStorage.removeItem('bookingScenarioDateSelected');
      // }
    }
    if (document.getElementById('separatelyRadio').checked) {
      // localStorage.removeItem('bookingTogetherDateName');
    }
    // } else if () {

    console.log('>>>>>>>>>>>>',localStorage.getItem('bookingTogetherDateName'));
    console.log('Together >>>>>>>>>>>>', localStorage.getItem('bookingMethodName') === "Together");
    console.log('Separately >>>>>>>>>>>>', localStorage.getItem('bookingMethodName') === "Separately");

    if (localStorage.getItem('changingBookingMethod')) {
      console.log('YESSSS');
      // if ( (localStorage.getItem('bookingTogetherDateName')) && (localStorage.getItem('bookingMethodName') === "Together") ) {
      if ( (localStorage.getItem('bookingTogetherDateName')) && (localStorage.getItem('bookingMethodName') === "Together") ) {
        bookingMethodFormAction.setAttribute("action", "/booking/version-3/booking-confirmation");

      } else if ( (localStorage.getItem('bookingKADateSelected') && localStorage.getItem('bookingScenarioDateSelected')) && (localStorage.getItem('bookingMethodName') === "Separately") ) {
        console.log('BOTH DATES EXISTS');
        bookingMethodFormAction.setAttribute("action", "/booking/version-3/booking-confirmation");

      } else if ( (localStorage.getItem('bookingKADateSelected') && !localStorage.getItem('bookingScenarioDateSelected')) && (localStorage.getItem('bookingMethodName') === "Separately") ) {
        bookingMethodFormAction.setAttribute("action", "/booking/version-3/booking-scenario");

      } else if ( (!localStorage.getItem('bookingKADateSelected')) && (!localStorage.getItem('bookingScenarioDateSelected')) && (localStorage.getItem('bookingMethodName') === "Separately") ) {
        bookingMethodFormAction.setAttribute("action", "/booking/version-3/booking-knowledge-assessment");

      } else {
        bookingMethodFormAction.setAttribute("action", "/booking/version-3/booking-method/answer");
        // localStorage.removeItem('bookingTogetherDateName');
      }
    } else {
      console.log('NOOOOOO ');
      // bookingMethodFormAction.setAttribute("action", "/booking/version-3/let-supervisor-know");
    }

  }
}

// function getBookedDatesforTogether() {
function bookingDate() {
  console.log('bookingDate funtion called');
  const bookingDate = document.getElementById('bookingDate');
  const checked_dateTime = document.querySelector('input[name = "available-date"]:checked');

  if(checked_dateTime !== null){
    localStorage.setItem('bookingTogetherDateName', checked_dateTime.value);

    const attrDisabled = bookingDate.getAttributeNode("disabled");
    if (attrDisabled) bookingDate.removeAttributeNode(attrDisabled);
    bookingDate.setAttribute("aria-disabled", "false");
    bookingDate.classList.remove("class", "govuk-button--disabled");
  }

  if (checked_dateTime.value === 'Other') {
    bookingDate.setAttribute("href", "more-booking-dates");
  } else {
    if ( (pageUrlPath === '/booking/version-3/booking-dates') && (localStorage.getItem('changingAssessmentDate') && localStorage.getItem('bookingTogetherDateName')) ) {
      bookingDate.setAttribute("href", "booking-confirmation");
    } else {
      bookingDate.setAttribute("href", "let-supervisor-know");
    }
  }
}

// function getBookedDatesforKA() {
function kaDate() {
  console.log('kaDate called');
  const kaDate = document.getElementById('kaDate');
  const checked_dateTime = document.querySelector('input[name = "available-date"]:checked');

  if(checked_dateTime != null){
    localStorage.setItem('bookingKADateSelected', checked_dateTime.value);

    const attrDisabled = kaDate.getAttributeNode("disabled");
    if (attrDisabled) kaDate.removeAttributeNode(attrDisabled);
    kaDate.setAttribute("aria-disabled", "false");
    kaDate.classList.remove("class", "govuk-button--disabled");
  }

  if (checked_dateTime.value === 'Other') {
    kaDate.setAttribute("href", "more-kabooking-dates");
  } else {
    if ( (pageUrlPath === '/booking/version-3/booking-knowledge-assessment') && (localStorage.getItem('changingKAssessmentDate') && localStorage.getItem('bookingScenarioDateSelected')) ) {
      kaDate.setAttribute("href", "booking-confirmation");
    } else {
      kaDate.setAttribute("href", "booking-scenario");
    }
  }
}

// function getBookedDatesforScenario() {
function scenarioDate() {
  console.log('scenarioDate called');
  const scenarioDate = document.getElementById('scenarioDate');
  const checked_dateTime = document.querySelector('input[name = "available-date"]:checked');

  if(checked_dateTime != null){
    localStorage.setItem('bookingScenarioDateSelected', checked_dateTime.value);

    const attrDisabled = scenarioDate.getAttributeNode("disabled");
    if (attrDisabled) scenarioDate.removeAttributeNode(attrDisabled);
    scenarioDate.setAttribute("aria-disabled", "false");
    scenarioDate.classList.remove("class", "govuk-button--disabled");
  }

  if (checked_dateTime.value === 'Other') {
    scenarioDate.setAttribute("href", "more-scenario-booking-dates");
  } else {
    if ( pageUrlPath === '/booking/version-3/booking-scenario' && localStorage.getItem('supervisorEmailValue') ) {
      scenarioDate.setAttribute("href", "booking-confirmation");
    } else {
      scenarioDate.setAttribute("href", "let-supervisor-know");
    }
  }
}

// MORE DATES
function moreDates() {
  console.log('moreDates called');
  const moreDates = document.getElementById('moreDates');
  const checked_dateTime = document.querySelector('input[name = "available-date"]:checked');

  if(checked_dateTime != null){
    if (pageUrlPath === '/booking/version-3/more-booking-dates') {
      localStorage.setItem('bookingTogetherDateName', checked_dateTime.value);

      if (localStorage.getItem('changingAssessmentDate') || localStorage.getItem('supervisorEmailValue')) {
        moreDates.setAttribute("href", "booking-confirmation");
      } else {
        moreDates.setAttribute("href", "let-supervisor-know");
      }
    }

    if (pageUrlPath === '/booking/version-3/more-kabooking-dates') {
      localStorage.setItem('bookingKADateSelected', checked_dateTime.value);
      moreDates.setAttribute("href", "booking-scenario");

      // if (localStorage.getItem('changingKAssessmentDate') || localStorage.getItem('supervisorEmailValue')) {
      if ( (localStorage.getItem('changingKAssessmentDate') && localStorage.getItem('changingScenarioDate')) || localStorage.getItem('supervisorEmailValue')) {
        moreDates.setAttribute("href", "booking-confirmation");
      } else if ( (localStorage.getItem('changingKAssessmentDate') && !localStorage.getItem('changingScenarioDate')) ) {
        moreDates.setAttribute("href", "booking-scenario");
      } else {
        moreDates.setAttribute("href", "let-supervisor-know");
      }
    }

    if (pageUrlPath === '/booking/version-3/more-scenario-booking-dates') {
      localStorage.setItem('bookingScenarioDateSelected', checked_dateTime.value);

      if (localStorage.getItem('changingScenarioDate') || localStorage.getItem('supervisorEmailValue')) {
        moreDates.setAttribute("href", "booking-confirmation");
      } else {
        moreDates.setAttribute("href", "let-supervisor-know");
      }
    }

    const attr = moreDates.getAttributeNode("disabled");
    if (attr) moreDates.removeAttributeNode(attr);
    moreDates.setAttribute("aria-disabled", "false");
    moreDates.classList.remove("class", "govuk-button--disabled");
  }
}

function getSupervisorEmail() {
  const ele = document.getElementById('supervisor-email').value;
  const getSupervisorEmailBtn = document.getElementById('getSupervisorEmailBtn');

  if (ele !== '') {
    const attr = getSupervisorEmailBtn.getAttributeNode("disabled");
    if (attr) getSupervisorEmailBtn.removeAttributeNode(attr);
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

// Clear all data
function clearData() {
  // Remove all stored variable
  localStorage.removeItem('bookingMethodName');
  localStorage.removeItem('bookingTogetherDateName');
  localStorage.removeItem('bookingKADateSelected');
  localStorage.removeItem('bookingScenarioDateSelected');
  localStorage.removeItem('supervisorEmailValue');

  localStorage.removeItem('changingBookingMethod');
  localStorage.removeItem('changingAssessmentDate');
  localStorage.removeItem('changingKAssessmentDate');
  localStorage.removeItem('changingScenarioDate');
  localStorage.removeItem('changingManagersEmail');

  window.location.href = '/booking/version-3/data-cleared';
}

// Skip buttons
function skipBookingScenarioDate() {
  localStorage.removeItem('bookingScenarioDateSelected');
}
function skipSupervisorEmail() {
  localStorage.removeItem('supervisorEmailValue');
}
