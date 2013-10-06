$(document).ready(function(){
	
function initialize(){
   
var 	 latit      = 40.78607,
         longit     = -119.20699,
		 count      = 100,
	     url_begins = "https://api.instagram.com/v1/media/search?lat=" + latit + "&lng=" + longit + "&count=" + count + "&",
		 token      = "access_token=" + get_url_vars()["access_token"],
		 myLatlng   = new google.maps.LatLng(latit,longit);
  
var      mapOptions = {
    	  center : myLatlng,
		  zoom: 15,
		  mapTypeId: google.maps.MapTypeId.SATELLITE,
		  streetViewControl: false
	     };

var      map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);			
			
function get_url_vars() {
	       var vars = []
	       var hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');

	       for (var i = 0; i < hashes.length; i++) {
	         hash = hashes[i].split('=');
	         vars.push(hash[0]);
	         vars[hash[0]] = hash[1]
	       }
	       return vars
	     }

function get_grams() {
	       var processUrl = url_begins + token;
	       load_grams(processUrl);
	     } 

function load_grams(url) {
	       load_url = url;

	       $.ajax({
	         type: "GET",
	         dataType: "jsonp",
	         cache: false,
	         url: load_url,
	         success: function (results) {
	           j_data = results;
	           create_layout(j_data);
	         },
			 complete: function(){
			   $('#load_overlay').fadeOut(2000);	
			 },
	       });
	     }
	
function create_layout(json_data) {
	       var feed = json_data
	 
	       for (var i in feed.data) {
		     var high= .00967821;
			 var low = high * -1;
			 var insta_lat = feed.data[i].location.latitude + (Math.random() * (high - low) + low);
		     var insta_long = feed.data[i].location.longitude + (Math.random() * (high - low) + low);
	  	     var insta_loc = new google.maps.LatLng(insta_lat, insta_long);
			 var insta_link = feed.data[i].link;
			 var insta_user = feed.data[i].user.username;
			 var insta_pic = feed.data[i].images.thumbnail.url;
			 var insta_pic = feed.data[i].images.thumbnail.url;
		     var insta_comments = feed.data[i].comments.count;
		     var insta_likes = feed.data[i].likes.count;
			 
			 if (feed.data[i].caption !=null){
			   var insta_cap = feed.data[i].caption.text.substring(0,120) + " .....";
			 }else{
			   var insta_cap = "";
		     };
			 
			 var marker = new google.maps.Marker({
			   position: insta_loc,
			   animation: google.maps.Animation.DROP,
			   user_name: insta_user,
			   user_pic: insta_pic,
			   user_cap: insta_cap,
			   user_link: insta_link,
			   icon: "http://codeandpen.com/Festgram/images/map_icon.png",
			   user_likes: insta_likes,
			   user_comments: insta_comments	
			 });
		
			marker.setMap(map);
			google.maps.event.addListener(marker, 'click', create_info_window);
		  }
       }
function create_info_window(){
	       var infowindow = new google.maps.InfoWindow({
		         content: 
		           '<div class="info_window">' +
		           '<h3>'+ this.user_name + '</h3>' +
		           '<a href="' + this.user_link + '" target="_blank">' +
		           '<img class="img" src="' + this.user_pic + '"/>' + '</a>' +
		           '<div class="info_box">' + '<div class="comments"><img src="http://codeandpen.com/Festgram/images/comments.png" />' +
		           this.user_comments + '</div><div class="likes"><img src="http://codeandpen.com/Festgram/images/heart.png" />' + 
		           this.user_likes  + '</div>' + 
		           '</div>' + '<p>'+ this.user_cap + '</p>' +
		           '</div>'
	           });
	       infowindow.open(map,this);
         }  
	     get_grams();
    }
    google.maps.event.addDomListener(window, 'load', initialize);
});
		




