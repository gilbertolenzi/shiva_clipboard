$(window).ready(function(){
	
	$.fn.changevalue = function(v) {
	    return this.val(v).trigger('select');
	}

	$('#shiva_clipboard input').bind('copy', function() {
	    
	    var copiedProductTitle =  $("#shiva_container_title").html();
	    var copiedProductPrice =  $("#shiva_container_price").html();
	    var copiedProductPartner =  $("#shiva_container_partner").html();
	    var copiedProductUrl =  $("#shiva_container_url").html();

	    var $this = $(this),
	    
	    origval = $this.val();
	    
 	    $this.changevalue( copiedProductTitle +'	'+ copiedProductPrice +'	'+ copiedProductPartner +'	'+ copiedProductUrl +'	'+ origval);
	    setTimeout(function(){
	        $this.val(origval);
	    }, 0);
	});
	
});