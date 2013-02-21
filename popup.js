function awesome() {
  // Do something awesome!
}

function totallyAwesome() {
      
  console.log("yo mama");

}

function awesomeTask() {
  awesome();
  totallyAwesome();
}

function clickHandler(e) {
  console.log("test1");
  // setTimeout(awesomeTask, 5000);
}


function showLinks() {
  visibleLinks.forEach(function(e,index) {
    $("#shiva_container_images ul.shiva_choose_image").append("<li id='image_" + index + "'><a href='#' id='clipboard_text_"+ index +"'>" + "<img class='inactive' src='" + e + "'/>" + "</a>"+"<span class='shiva_text_clipboard' id ='clipboard_text_"+ index +"'>" + e + "</span>"+"</li>");  
  });
};

chrome.extension.onMessage.addListener(function(content) {
  visibleLinks = content.images;
  $("#shiva_container_title").html(content.title);
  $("#shiva_container_partner").html(content.partner);
  $("#shiva_container_price").html(content.price);
  $("#shiva_container_url").html(content.url);
  showLinks();
});

window.onload = function() {
  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id},
                      function(activeTabs) {
      chrome.tabs.executeScript(activeTabs[0].id, {file: 'jquery.js'});
      chrome.tabs.executeScript(activeTabs[0].id, {file: 'content.js'});
    });
  });
};

// Add event listeners once the DOM has fully loaded by listening for the

// $(document).ready(function(){

//   console.log($('.shiva_choose_image img'));
//   $('.shiva_choose_image img').on('click', function() {
//     console.log($(this));
//   });
// });

chrome.windows.onCreated.addListener(function(activeInfo) {
  // console.log($('.shiva_choose_image img'));
  $('.shiva_choose_image img').on('click', function() {
    $(this).toggleClass('active');
    $(this).hide();
  });
});