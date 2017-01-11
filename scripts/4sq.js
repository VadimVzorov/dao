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
 take top 40 results
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

//api

var fsq = {
  URL: 'https://api.foursquare.com/v2/venues/explore',
  cat:{
    Breakfast: '4bf58dd8d48988d143941735',
    Food: '4d4b7105d754a06374d81259',
    Coffe: '4bf58dd8d48988d1e0931735',
    Bar: '52e81612bcbc57f1066b7a0d,52e81612bcbc57f1066b7a0e,4bf58dd8d48988d11e941735,4bf58dd8d48988d11c941735,56aa371be4b08b9a8d57354d,4bf58dd8d48988d122941735,4bf58dd8d48988d123941735',
    Beer: '56aa371ce4b08b9a8d57356c,4bf58dd8d48988d117941735,4bf58dd8d48988d11b941735',
    Music: '4bf58dd8d48988d1e5931735',
    Park: '52e81612bcbc57f1066b7a21,4bf58dd8d48988d163941735',
    Books: '4bf58dd8d48988d1b1941735,4bf58dd8d48988d114951735,52f2ab2ebcbc57f1066b8b30',
    Art: '4bf58dd8d48988d1e2931735,56aa371be4b08b9a8d573532',
    Museum: '4bf58dd8d48988d181941735',
    Sights: '507c8c4091d498d9fc8c67a9'
  },
  client_id:'TCRIQHEB243DG4WWK5AJDMP0WM5LHJFSIEBCPSTZZR2PDK1L',
  client_secret:'MYCMFPZCKABYAOJU5OW4D0C3QEHBVGSIT3EE3P2WLFLR5MHN',
  v:'20170103',
  locale: 'en',
  venuePhotos: 1,
  radius: 2000
}
//
// function fetchData(obj) {
//   $.ajax({
//     url: obj.url,
//     data: obj.data,
//     method: obj.method || 'GET',
//     success: obj.success,
//     error: obj.error
//   })
// }
//
//
// function getLocation() {
//   var obj = {
//     url: 'http://vadim.com',
//     method: 'post',
//     success: function() {
//
//     },
//     error: function() {
//
//     }
//   }
//   fetchData(obj);
// }



function getData1(city, cat, rad) {
  $.ajax({
    url: fsq.URL,
    data:{
      near: city,
      categoryId: cat,
      limit:'50',
      client_id: fsq.client_id,
      client_secret: fsq.client_secret,
      v: fsq.v,
      locale: fsq.locale,
      venuePhotos: fsq.venuePhotos
    },
    success: function(data){
      //store received data
      //run function for cat2
      // pushResults(data);
      var random = Math.floor((Math.random() * 49));
      var results = data.response.groups[0].items[random];
      console.log(results);
      state.results.push(results);
      getData2(fsq.cat[state.input[1]]);
    }
  })
}

function getData2(cat) {
  var count = 1;
  var rad = fsq.radius;
  function getData(){
    $.ajax({
      url: fsq.URL,
      data:{
        ll: getCoor(0),
        categoryId: cat,
        limit:'50',
        client_id: fsq.client_id,
        client_secret: fsq.client_secret,
        v: fsq.v,
        locale: fsq.locale,
        venuePhotos: fsq.venuePhotos,
        radius: rad
      },
      success: function(data){
        var resultsLength = data.response.groups[0].items.length;
        var random = Math.floor((Math.random() * (resultsLength - 1)));
        var results = data.response.groups[0].items[random];
        console.log(results);
        if (results === undefined) {
          count++;
          rad += count*1000;
          getData()
        } else {
          state.results.push(results)
          getData3(fsq.cat[state.input[2]]);
        };
      }
    })
  };
  getData();
}

function getData3(cat) {
  var count = 1;
  var rad = fsq.radius;
  function getData(){
    $.ajax({
      url: fsq.URL,
      data:{
        ll: getCoor(0),
        categoryId: cat,
        limit:'50',
        client_id: fsq.client_id,
        client_secret: fsq.client_secret,
        v: fsq.v,
        locale: fsq.locale,
        venuePhotos: fsq.venuePhotos,
        radius: rad
      },
      success: function(data){
        var resultsLength = data.response.groups[0].items.length;
        var random = Math.floor((Math.random() * (resultsLength - 1)));
        var results = data.response.groups[0].items[random];
        console.log(results);
        if (results === undefined) {
          count++;
          rad += count*1000;
          getData()
        } else {
          state.results.push(results);
          console.log(state.results);
          createCard(state.results);
        };
      }
    })
  };
  getData();
}

function expandRadius(){
  var plusRadius = 1000;
  if (data === undefined) {
    $.ajax({
      url: fsq.URL,
      data:{
        ll: getCoor(1),
        categoryId: cat,
        limit:'50',
        client_id: fsq.client_id,
        client_secret: fsq.client_secret,
        v: fsq.v,
        locale: fsq.locale,
        venuePhotos: fsq.venuePhotos,
        radius: fsq.radius + plusRadius
      },
      success: function(data){
        //store received data
        //run function for cat3
        pushResults(data);
        console.log(state.results);
      }
    })
  }
}

function getCoor(index){
  var lat = state.results[index].venue.location.lat;
  var lng = state.results[index].venue.location.lng;
  var ll = lat+','+lng;
  return ll;
}

function results(data) {
  console.log(data);
}


  function filter(data, term){
   data.filter(function(){
     return data.category === term
   })
 }


 //state

 var state = {
   location:'',
   input: [],
   results:[],
   htmlCard:{
     title:'<div class="column result-card"><div class="card"><div class="photo-card" style="background: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),url(photoURL) center">replace</div>',
     description: '<div class="card-info"><div class="description">replace</div>',
     descriptionBlank: '<div class="card-info"><div class="description">Should be a very exciting place!</div>',
     address:'<div class="address-info"><div class="title">Address</div><div class="address">replace</div></div></div></div></div>'
   }
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

function createCard(array, callback) {
  var html = [];
  for (var i = 0; i < array.length; i++) {
    var title = state.htmlCard.title.replace('replace', array[i].venue.name);
    if (array[i].venue.photos.groups[0]) {
      var title = title.replace('photoURL', "'" + array[i].venue.photos.groups[0].items[0].prefix + "700x350" + array[i].venue.photos.groups[0].items[0].suffix + "'");
    } else {
      var title = title.replace('photoURL', 'sky.jpg');
    }
    if (array[i].tips) {
      var description = state.htmlCard.description.replace('replace', array[i].tips[0].text);
    } else {
      var description = state.htmlCard.descriptionBlank;
    }
    var address = state.htmlCard.address.replace('replace', array[i].venue.location.address);

    // var title = title.replace('photoURL', "'" + array[i].venue.photos.groups[0].items[0].prefix + "300x200" + array[i].venue.photos.groups[0].items[0].suffix + "'");
    // console.log(title);
      // var description = state.htmlCard.description.replace('replace', array[i].tips[0].text);
      // var address = state.htmlCard.address.replace('replace', array[i].venue.location.address);
      var final = title + description + address;
    console.log(final);
    html.push(final);
  }
  console.log(html);
state.finalHTML = html;
var data = {}
return showCard('#row-main');
}



 //render

 function hideElement(element) {
   $(element).addClass('hide-element');

 }

 function animateOut(element, callback) {
   $(element).addClass('animate-out');
   setTimeout(function(){hideElement(element)}, 300);
  //  callback();
 }

 function animateIn(element) {
   setTimeout(function(){
     $(element).removeClass('hide-element');
     $(element).addClass('show-element');
     $(element).addClass('animate-in')
   },300);
 }

 function showElement(element) {
   $(element).removeClass('hide-element');
 }

function showCard(element) {
  $(element).append(state.finalHTML);
}

 //listen

 $(document).ready(function(){
   $('#city-search').on('submit',function getLoc(){
     event.preventDefault();
     var location = $('#search-bar').val();
     collectLocation(location);
     animateOut('#search, #choose', animateIn('.mix, #instr-txt'));
   });

   $('#go').on('click', function(){
     console.log('click');
     collectCat();
     getData1(state.location, fsq.cat[state.input[0]]); //if success launches getData2 and getData3 -->     //  createCard(state.results, showCard('#row-main'));
     hideElement('#instr-txt, .mix, #go');

   });
 });
