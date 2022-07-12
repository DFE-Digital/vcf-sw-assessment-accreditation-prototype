const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

module.exports = router;

console.log('routes called');

router.post('/booking/split/booking-method/answer', function (req, res) {
    var bookingMethod = req.session.data['booking-method']

    // Check whether the variable matches a condition
    if (bookingMethod == "All in one"){
      // Send user to next page
      res.redirect('/booking/split/booking-dates')
    } else if (bookingMethod == "Split") {
      res.redirect('/booking/split/booking-knowledge-assessment')
    }
    else {
      // Send user to ineligible page
      res.redirect('/booking/split/booking-method')
    }
})

router.post('/booking/version-2/booking-method/answer', function (req, res) {
    var bookingMethod = req.session.data['booking-method']

    // Check whether the variable matches a condition
    if (bookingMethod == "Together"){
      // Send user to next page
      res.redirect('/booking/version-2/booking-dates')
    } else if (bookingMethod == "Separately") {
      res.redirect('/booking/version-2/booking-knowledge-assessment')
    } else {
      // Send user to another page
      res.redirect('/booking/version-2/booking-method')
    }
})
