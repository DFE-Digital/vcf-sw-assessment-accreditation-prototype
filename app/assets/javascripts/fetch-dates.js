var request = new XMLHttpRequest();
request.open('GET', '../../public/javascripts/dates.js', true);

// console.log('fetch dates and currentURL', currentURL);

let correctUrl = "";
function injectCorrectUrl() {
  if (currentURL === 'booking-knowledge-assessment') {
    correctUrl = "kaDate";
  } else if (currentURL === 'booking-scenario') {
    correctUrl = "scenarioDate";
  } else if (currentURL === 'more-booking-dates') {
    correctUrl = "moreDates";
  } else if (currentURL === 'more-kabooking-dates') {
    correctUrl = "moreKaDates";
  } else if (currentURL === 'more-scenario-booking-dates') {
    correctUrl = "moreScenarioDates";
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
  // console.log('populateDateList called');

  // THE JSON ARRAY.
  var dateList = document.getElementById('date');
  var dateList2 = document.getElementById('moreDate');
  // var dateList3 = document.getElementById('moreKaDate');

  if (dateList && ((correctUrl !== 'moreDates') || (correctUrl !== 'moreKaDates') || (correctUrl !== 'moreScenarioDates'))) {

    // console.log('dates.mainDates',dates.mainDates);
    // console.log('correctUrl',correctUrl);

    let elementsToInsert = [];
    for (var i = 0; i < dates.mainDates.length; i++) {

      // CREATE RADIO BUTTON ELEMENT WITH JSON
      var radio = document.createElement('input');
      var label = document.createElement('label');
      radio.type = 'radio';
      radio.name = dates.mainDates[i].dateDay;
      radio.value = dates.mainDates[i].dateDay;

      label.setAttribute("for", dates.mainDates[i].dateDay);
      label.innerHTML = dates.mainDates[i].dateDay;

      if (dates.mainDates[i].dateTime) {
        dateList.innerHTML = dateList.innerHTML +
        '<div class="govuk-radios__item">' +
          '<input class="govuk-radios__input" id="'+ dates.mainDates[i].dateID +'" name="available-date" type="radio" value="' + dates.mainDates[i].dateDayName + ' ' + dates.mainDates[i].dateDay + ', ' + dates.mainDates[i].dateMonth + ' ' + dates.mainDates[i].dateYear + ' at ' + dates.mainDates[i].dateTime + '" ' +
          'onclick="' + correctUrl + '()"' +
          '> ' +
          '<label class="govuk-label govuk-radios__label" for="'+ dates.mainDates[i].dateID +'">'+
            dates.mainDates[i].dateDayName + ' ' + dates.mainDates[i].dateDay + ', ' + dates.mainDates[i].dateMonth + ' ' + dates.mainDates[i].dateYear + ' at ' + dates.mainDates[i].dateTime
          '</label>' +
        '</div>';
      } else if (dates.mainDates[i].otherIdentifier) {
        dateList.innerHTML = dateList.innerHTML +
        '<div class="govuk-radios__item">' +
          '<input class="govuk-radios__input" id="'+ dates.mainDates[i].dateID +'" name="available-date" type="radio" value="' + dates.mainDates[i].dateDayName + '" ' +
          'onclick="' + correctUrl + '()"' +
          '> ' +
          '<label class="govuk-label govuk-radios__label" for="'+ dates.mainDates[i].dateID +'">'+
            dates.mainDates[i].dateDayName +
          '</label>' +
        '</div>';
      }
    }
  }

  if (dateList2 && ((correctUrl === 'moreDates') || (correctUrl === 'moreKaDates') || (correctUrl === 'moreScenarioDates'))) {

    // console.log('moreDates loaded >>>>>>>>>>>>>');
    // console.log('correctUrl:',correctUrl);
    // console.log('dates.mainDates.moreDates', dates.mainDates[10].moreDates);

    let elementsToInsert = [];
    let mainDatesLates = dates.mainDates.at(-1); // The last item in the main array
    // let mainDatesLates = dates.mainDates.slice(-1)[0]; // The last item in the main array
    // console.log('.mainDatesLates.moreDates',mainDatesLates.moreDates);
    let moreDates = mainDatesLates.moreDates
    // console.log('moreDates',moreDates.moreDates);
    for (let i = 0; i < moreDates.length; i++) {
      // console.log('moreDates[i:]', moreDates[i]);

      var radio = document.createElement('input');
      var label = document.createElement('label');
      radio.type = 'radio';
      radio.name = moreDates[i].dateDay;
      radio.value = moreDates[i].dateDay;
      label.setAttribute("for", moreDates[i].dateDay);
      label.innerHTML = moreDates[i].dateDay;

      if (moreDates[i].dateTime) {
        dateList2.innerHTML = dateList2.innerHTML +
        '<div class="govuk-radios__item">' +
          '<input class="govuk-radios__input" id="'+ moreDates[i].dateID +'" name="available-date" type="radio" value="' + moreDates[i].dateDayName + ' ' + moreDates[i].dateDay + ', ' + moreDates[i].dateMonth + ' ' + moreDates[i].dateYear + ' at ' + moreDates[i].dateTime + '" ' +
          'onclick="moreDates()"' +
          '> ' +
          '<label class="govuk-label govuk-radios__label" for="'+ moreDates[i].dateID +'">'+
            moreDates[i].dateDayName + ' ' + moreDates[i].dateDay + ', ' + moreDates[i].dateMonth + ' ' + moreDates[i].dateYear + ' at ' + moreDates[i].dateTime
          '</label>' +
        '</div>';
      }
    }
  }
}
populateDateList();
