function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
  return "Basic " + hash;
}

$.ajaxSetup({
	headers: { 
		"Content-Type": "application/json", 
		"Authorization": make_base_auth('JIRA_USER', 'JIRA_PASSWORD')
		}
});
	
function myTimer() {
	
	//TeamA Queries
	$.ajax({ 
		url: 'https://companyurl.forjira.net/rest/api/2/search?jql=team = TeamA AND type = Bug and status not in (Done, Accepted, Staging, Live, Closed)', 
		type: 'GET',
		dataType: 'json',
		success: function (data) { 
			var total = JSON.stringify(data.total)
			$('#TeamA-total-bugs').html(total);
		}
	});
	
	$.ajax({ 
		type: 'GET', 
		url: 'https://companyurl.forjira.net/rest/api/2/search?jql=team = TeamA AND type = Bug and status not in (Done, Accepted, Staging, Live, Closed) and assignee is EMPTY', 
		dataType: 'json',
		success: function (data) { 
			var total = JSON.stringify(data.total)
			$('#TeamA-total-not-assigned').html(total);
		}
	});
	$.ajax({ 
		type: 'GET', 
		url: 'https://companyurl.forjira.net/rest/api/2/search?jql=team = TeamA AND type = Bug and status in ("In Progress") and Sprint in openSprints()', 
		dataType: 'json',
		success: function (data) { 
			var total = JSON.stringify(data.total)
			$('#TeamA-total-in-progress').html(total);
		}
	});
	$.ajax({ 
		type: 'GET', 
		url: 'https://companyurl.forjira.net/rest/api/2/search?jql=team = TeamA AND type = Bug and status in (Staging) and Sprint in openSprints()', 
		dataType: 'json',
		success: function (data) { 
			var total = JSON.stringify(data.total)
			$('#TeamA-total-staging').html(total);
		}
	});
	$.ajax({ 
		type: 'GET', 
		url: 'https://companyurl.forjira.net/rest/api/2/search?jql=team = TeamA AND type = Bug and status in (Live, Closed) and Sprint in openSprints()', 
		dataType: 'json',
		success: function (data) { 
			var total = JSON.stringify(data.total)
			$('#TeamA-done').html(total);
		}
	}); 

	//TeamB Queries
	$.ajax({ 
		type: 'GET', 
		url: 'https://companyurl.forjira.net/rest/api/2/search?jql=team = TeamB AND type = Bug and status not in (Done, Accepted, Staging, Live, Closed)', 
		dataType: 'json',
		success: function (data) { 
			var total = JSON.stringify(data.total)
			$('#TeamB-total-bugs').html(total);
		}
	}); 
	$.ajax({ 
		type: 'GET', 
		url: 'https://companyurl.forjira.net/rest/api/2/search?jql=team = TeamB AND type = Bug and status not in (Done, Accepted, Staging, Live, Closed) and assignee is EMPTY', 
		dataType: 'json',
		success: function (data) { 
			var total = JSON.stringify(data.total)
			$('#TeamB-total-not-assigned').html(total);
		}
	});
	$.ajax({ 
		type: 'GET', 
		url: 'https://companyurl.forjira.net/rest/api/2/search?jql=team = TeamB AND type = Bug and status in ("In Progress") and Sprint in openSprints()', 
		dataType: 'json',
		success: function (data) { 
			var total = JSON.stringify(data.total)
			$('#TeamB-total-in-progress').html(total);
		}
	});
	$.ajax({ 
		type: 'GET', 
		url: 'https://companyurl.forjira.net/rest/api/2/search?jql=team = TeamB AND type = Bug and status in (Staging) and Sprint in openSprints()', 
		dataType: 'json',
		success: function (data) { 
			var total = JSON.stringify(data.total)
			$('#TeamB-total-staging').html(total);
		}
	});
	$.ajax({ 
		type: 'GET', 
		url: 'https://companyurl.forjira.net/rest/api/2/search?jql=team = TeamB AND type = Bug and status in (Live, Closed) and Sprint in openSprints()', 
		dataType: 'json',
		success: function (data) { 
			var total = JSON.stringify(data.total)
			$('#TeamB-done').html(total);
		}
	}); 
	
}

var myVar = setInterval(function(){ myTimer(); $("#countdown").TimeCircles().restart(); }, 60000);
	
$(document).ready(function() {
	
	$("#countdown").TimeCircles({
		"animation": "smooth",
		"bg_width": 1.2,
		"fg_width": 0.1,
		"circle_bg_color": "#cacfd3",
		"time": {
			"Days": {
				"show": false,
			},
			"Hours": {
				"show": false,
			},
			"Minutes": {
				"show": false,
			},
			"Seconds": {
				"color": "#99abff",
				"show": true,
			}
		}
	}); 
	
	$("#countdown").TimeCircles({count_past_zero: false});
	
	myTimer();
	
})

$(document).ajaxStop(function() {

	$( "div[id*='total']" ).each(function() {
		
		var total = $(this).html();

		// between 0 and 3 green    #009933
		// between 4 and 7 yellow   #cccc00
		// greater than 8 red       #cc0000

		if (total > 0 && total <= 3) {
			$(this).css( "color", "#009933" );
		} else if (total > 3 && total <= 7) {
			$(this).css( "color", "#cccc00" );
		} else if (total >= 8) {
			$(this).css( "color", "#cc0000" );
		}

	});
	
});