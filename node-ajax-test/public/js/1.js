$(function () {
	$('#click').on('click', function () {
		$.when($.ajax("test1.html"),$.ajax("test.html"))
		  .done(function(res) {console.log(res,'done');})
		  .fail(function(res) {console.log(res,'fail');});
	})
})
