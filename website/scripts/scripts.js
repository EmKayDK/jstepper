$(document).ready(function() {

	$("table.tablehover tr:not(.notablehover) td").hover(
		function() {
			$(this).parents("tr").find("td").css({ backgroundColor: "#DDD" });
		},
		function() {
			$(this).parents("tr").find("td").css({ backgroundColor: "" });
		}
	);
	
	$('#btnSubmit').on('click', function() {
		TrackClick();
	});

});

function TrackClick() {
	var strValue = $('#txtScript').val();
	ga('send', 'event', 'documentation', 'test', strValue);
}