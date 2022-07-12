var request = new XMLHttpRequest();
request.open('GET', '../../public/javascripts/dates.js', true);

console.log('fetch dates and currentURL', currentURL);

let correctUrl = "";
function injectCorrectUrl() {
  if (currentURL === 'booking-knowledge-assessment') {
    correctUrl = "kaDate";
  } else if (currentURL === 'booking-scenario') {
    correctUrl = "scenarioDate";
  } else {
    correctUrl = "bookingDate";
  }
  return correctUrl;
}

const urlDetected = injectCorrectUrl();

request.onload = function() {
  var date = document.getElementById('date');

  if (this.status >= 200 && this.status < 400) {
    if (date) {
      var dates = this.response;
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
  var dateList = document.getElementById('date');
  if (dateList) {
    var elementsToInsert = [];
    for (var i = 0; i < dates.length; i++) {

      // CREATE RADIO BUTTON ELEMENT WITH JSON
      var radio = document.createElement('input');
      var label = document.createElement('label');
      radio.type = 'radio';
      radio.name = dates[i].dateDay;
      radio.value = dates[i].dateDay;

      label.setAttribute("for", dates[i].dateDay);
      label.innerHTML = dates[i].dateDay;

      dateList.innerHTML = dateList.innerHTML +
      '<div class="govuk-radios__item">' +
        '<input class="govuk-radios__input" id="'+ dates[i].dateID +'" name="available-date" type="radio" value="' + dates[i].dateDayName + ' ' + dates[i].dateDay + ', ' + dates[i].dateMonth + ' ' + dates[i].dateYear + ' at ' + dates[i].dateTime + '" ' +
        'onclick="' + correctUrl + '()"' +
        '> ' +
        '<label class="govuk-label govuk-radios__label" for="'+ dates[i].dateID +'">'+
          dates[i].dateDayName + ' ' + dates[i].dateDay + ', ' + dates[i].dateMonth + ' ' + dates[i].dateYear + ' at ' + dates[i].dateTime
        '</label>' +
      '</div>';

    }
  }
}
populateDateList();
