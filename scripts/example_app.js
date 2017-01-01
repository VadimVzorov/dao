/**
 *

    IP --  API

    OP -- Jquery to get data
 */


var oAuth = 'https://api.yelp.com/oauth2/token'

// headers: {
//   'Authorization':'Basic xxxxxxxxxxxxx',
//   'Content-Type':'application/json'
// },
var API = 'http://api.yelp.com/v3/businesses/search';



var getAuthKey = {
  fetch: function() {
    return $.ajax({
      type: 'POST',
      url: oAuth,
      data: {
        client_id: "5oo0E0mfr9864uBveeWofQ",
        client_secret: "fwHba0PHi1xjRPHE44CxyCPXr2tI5lgU3DNGsx9mgYAGUwiefFqvX2uLjrLObmBI"
      }
    })
  }
}



var x;
var getData = {
  init: function() {
    console.log("init called");
  },
  fetch: function(){
    // console.log(allowAuth);
    $.ajax({
      url: API,
      // method: 'GET',
      dataType: 'jsonp',
      beforeSend: function (request) {
        console.log(request);
        request.setRequestHeader("Authorization", allowAuth);
      },
    }).done(function(data){
      console.log(data);
    })
  }
}

function expireLS({
  localStorage.delete('authKey', data.access_token)
}


$(document).ready(function(){

  //
  if(!localStorage.getItem('authKey')){
    getAuthKey.fetch().done(function(data){
      localStorage.setItem('authKey', data.access_token)
      // x = data.access_token
    });
  }

  // getData.fetch();
//
  // $("#get-data").on('click', function(){
  //     getData.fetch().done(function(data){
  //       console.log(data.title);
  //       $(".id").html(data.title);
  //     });
  // });
});
