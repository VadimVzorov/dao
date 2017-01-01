/*

IP - categories
OP - randomly selected destinations from yelp

steps

1. collect location

1. get access token
2. record to local storage
3. collect user input to categories
4. send data to yelp

filter logic:
take cat1
sort results by rating
take top 20 results
pick random
take location
search for cat 2 in the radius
sort results by rating
take top 5 results
pick random
take location
search for cat 3 in the radius
sort results by rating
take top 5 results
pick random



*/

//api collect token
var oAuth = 'https://api.yelp.com/oauth2/token';

function getToken() {
  return $.ajax({
    url: oAuth,
    method: 'POST',
    data: {
      client_id: '5oo0E0mfr9864uBveeWofQ',
      client_secret: 'fwHba0PHi1xjRPHE44CxyCPXr2tI5lgU3DNGsx9mgYAGUwiefFqvX2uLjrLObmBI'
    }
  })
}

//api search yelp

var sURL = '//api.yelp.com/v3/businesses/search';

// function searchY() {
//   $.ajax({
//     url: sURL,
//     // method: 'GET',
//     // 'dataType' : 'jsonp',
//     // 'jsonpCallback' : 'cb',
//     headers: {
//      'Content-Type':'application/x-www-form-urlencoded'
//    },
//     beforeSend: function (request) {
//       console.log("header added");
//       var authKey = localStorage.getItem('token');
//       console.log(authKey);
//       // headers.set("Authorization", "Bearer " + OAuthToken);
//       request.setRequestHeader("Authorization", "Bearer " +authKey);
//     },
//     data: { term: 'food', location: 'Montreal' },
//     success: function(data, textStatus, request){
//       console.log(request.getResponseHeader('Authorization'));
//    },
//    error: function (request, textStatus, errorThrown) {
//         console.log(request.getResponseHeader('Authorization'));
//    }
//   })
// }


//state

var state = {
  location:'',
  input: []
}

//modify

function collectLocation(location) {
  state.location = location;
}

function collectCat() {
  var cat1 = $('#cat1').val();
  var cat2 = $('#cat2').val();
  var cat3 = $('#cat3').val();
  state.input.push(cat1, cat2, cat3);
}




//render

function hideElement(element) {
  // $(element).hide('fast')

  // this element has class animatein, if it has animatein
  // remove class animate in and add calss animate out
  ver $ele = $(element)
  if($ele.hasclass('animatein')) {

  }else {

  }

  $(elm)..addClass('animateout');
}

function showElement(element, callback) {
  $(element).show('fast')
}


//listen

$(document).ready(function(){

  getToken().done(function(data) {
    localStorage.setItem('token', data.access_token);
  })


  // $('#searchButton').on('click', function getLoc(){
  //   var location = $('#city-search').val();
  //   collectLocation(location);
  //   hideSearch('#search');
  // })


  $('#city-search').on('submit', function getLoc(){
    event.preventDefault();
    var location = $('#city-search').val();
    collectLocation(location);
    hideElement('#search',showElement('.column.mix,.mix'));
  })


  $('#go').on('click', collectCat);


});




// function commonTask() {
//
// },
//
//
// $().click(commonTask)
// $().on('submit', commonTask)
