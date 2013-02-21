var carousel_images = $(".browsable .carousel_wrap img").map(function(){
  return $(this).attr('src').replace(/assets\d*/, "www").replace(/\?\d*/, "");
});
var product_title = $("#product_header h1").text();
var product_partner = $("#product_header h2 a").text();
var product_price = $("#price .currency_GBP").text();
var product_url = window.location.href;

chrome.extension.sendMessage({
	images: carousel_images.toArray(), 
	title: product_title,
	partner: product_partner,
	price: product_price,
	url: product_url
});