// Add event listeners once the DOM has fully loaded by listening for the

$(document).ready(function(){
  
  var visibleLinks = [];

  function showLinks() {
    visibleLinks.forEach(function(e,index) {
      $("#shiva_container_images ul").append("<li id='image_" + index + "'><a class='shiva_choose_image' href='#' id='clipboard_text_"+ index +"'>" + "<img src='" + e + "'/>" + "</a></li>");
    });
  };  


  function populateSelect() {
    visibleLinks.forEach(function(e,index){
      $("#shiva_select_image").append("<option value='"+ e +"'>" + index +"-"+ e +"</option>");
    });
  };  

  chrome.extension.onMessage.addListener(function(content) {
    visibleLinks = content.images;
    $("#shiva_container_title").html(content.title);
    $("#shiva_container_partner").html(content.partner);
    $("#shiva_container_price").html(content.price);
    $("#shiva_container_url").html(content.url);
    showLinks();
    populateSelect();

  });
 

  window.onload = function() {
    chrome.windows.getCurrent(function (currentWindow) {
      chrome.tabs.query({active: true, windowId: currentWindow.id},
                        function(activeTabs) {
        chrome.tabs.executeScript(activeTabs[0].id, {file: 'jquery.js'});
        chrome.tabs.executeScript(activeTabs[0].id, {file: 'content.js'});
        $("#shiva_select_image").on("change", function(event){
          console.log('The option with value ' + $(this).val() + ' and text ' + $(this).text() + ' was selected.');
        });
      });
    });
  };

});