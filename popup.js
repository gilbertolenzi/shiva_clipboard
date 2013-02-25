// Add event listeners once the DOM has fully loaded by listening for the

$(document).ready(function(){
  
  var visibleLinks = [];

  function showLinks() {
    visibleLinks.forEach(function(e,index) {
      $("#shiva_container_images ul").append("<li id='image_" + index + "'><a href='#' id='clipboard_text_"+ index +"'>" + "<img src='" + e + "'/>" + "</a><span class='shiva_text_clipboard' id ='clipboard_text_"+ index +"'>" + index + "</span></li>");
    });
  };  


  function populateSelect() {
    visibleLinks.forEach(function(e,index){
      $("#shiva_select_image").append("<option value='"+ e +"'>Image " + index + "</option>");
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

        //on change of the select value
        $("#shiva_select_image").on("change", function(){
          var str = "";
          var selectValue = "";

          $("#shiva_select_image option:selected").each(function () {
            str += $(this).text() + " ";
            selectValue += $(this).val() + " ";
          });
          

          //debug which value am i getting?
          // console.log('The option with value ' + selectValue + ' and text ' + str + ' was selected.');
          
          //print the value in the popu.html view
          $("#shiva_container_image_path").html(selectValue);
        })
        .trigger('change');
      });
    });
  };
});