var request = new XMLHttpRequest();
request.open('GET', '../../public/javascripts/moreDates.js', true);

console.log('fetch dates and currentURL', currentURL);

// let correctUrl = "";
function injectCorrectUrl() {
  if (currentURL === 'more-booking-dates') {
  // if (currentURL === 'booking-knowledge-assessment') {
  //   correctUrl = "kaDate";
  // } else if (currentURL === 'booking-scenario') {
  //   correctUrl = "scenarioDate";
  // } else {
  //   correctUrl = "bookingDate";
  console.log('more-booking-dates loaded');
  }
  return correctUrl;
}

// const urlDetected = injectCorrectUrl();

request.onload = function() {
  var moreDate = document.getElementById('moreDate');

  if (this.status >= 200 && this.status < 400) {
    if (moreDate) {
      var moreDates = this.response;
    }
  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();
function populateDateList(urlDetected) {
  console.log('populateDateList called');
  console.log('correctUrl',correctUrl);
  // THE JSON ARRAY.
  var dateList = document.getElementById('moreDate');
  if (dateList && correctUrl === 'booking-dates-more') {
    var elementsToInsert = [];
    for (var i = 0; i < moreDates.length; i++) {

      // CREATE RADIO BUTTON ELEMENT WITH JSON
      var radio = document.createElement('input');
      var label = document.createElement('label');
      radio.type = 'radio';
      radio.name = dates[i].dateDay;
      radio.value = dates[i].dateDay;

      label.setAttribute("for", dates[i].dateDay);
      label.innerHTML = dates[i].dateDay;

      if (dates[i].dateTime) {
        dateList.innerHTML = dateList.innerHTML +
        '<div class="govuk-radios__item">' +
          '<input class="govuk-radios__input" id="'+ dates[i].dateID +'" name="available-date" type="radio" value="' + dates[i].dateDayName + ' ' + dates[i].dateDay + ', ' + dates[i].dateMonth + ' ' + dates[i].dateYear + ' at ' + dates[i].dateTime + '" ' +
          'onclick="' + correctUrl + '()"' +
          '> ' +
          '<label class="govuk-label govuk-radios__label" for="'+ dates[i].dateID +'">'+
            dates[i].dateDayName + ' ' + dates[i].dateDay + ', ' + dates[i].dateMonth + ' ' + dates[i].dateYear + ' at ' + dates[i].dateTime
          '</label>' +
        '</div>';
      // } else {
      //   dateList.innerHTML = dateList.innerHTML +
      //   '<div class="govuk-radios__item">' +
      //     '<input class="govuk-radios__input" id="'+ dates[i].dateID +'" name="available-date" type="radio" value="' + dates[i].dateDayName + '" ' +
      //     'onclick="' + correctUrl + '()"' +
      //     '> ' +
      //     '<label class="govuk-label govuk-radios__label" for="'+ dates[i].dateID +'">'+
      //       dates[i].dateDayName +
      //     '</label>' +
      //   '</div>';
      }
    }
  }
}
populateDateList();
