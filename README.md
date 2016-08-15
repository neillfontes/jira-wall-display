# Jira Wall Display

Tiny app to create a wall display for Agile Teams that use Jira. Don't lose track for your team's progress! I could not find anything more or less ready to do it, so I've gathered these pieces of tech to achieve the final result. It is suitable for queries to track down bug count or sprint progress in an Agile environment. Feel free to use it! There are some improvements to the HTML page, to be more flexible to support 1 to 4 teams and improvements to the js as well, but the distributed version is working as designed.

## Getting Started

On the server side you will need a Jira with REST API enabled and a user with capabilities to query the projects you want to display on the screen. In order to run the queries from the client, you have two options, a) use a CORS-enabling plugin like [Chrome -> Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) otherwise your requests will be blocked at Jira server, or b) use a reverse-proxy at your domain to send and receive the requests between your app and Jira - there are many options around. Option A is simpler with a far easier setup. 

### Prerequisites

* Jira REST API enabled (Hosted or at atlassian.net)
* User/Password with adequate permissions
* Some JQL knowledge
* This tiny app 

### Installing

js/functions.js

Configure the user and password:

```
$.ajaxSetup({
...
"Authorization": make_base_auth('JIRA_USER', 'JIRA_PASSWORD')
```

Configure the URLs, replacing this with your company's JIRA URL. 

```
https://companyurl.forjira.net/rest/api/2/search?jql
```

Configure the queries for each team and its criteria for displaying in plain JQL. That must be suited for the workflow adopted for your company! Example:

```
team = TeamA AND type = Bug and status not in (Done, Production, Finished)
```

[Optional] Configure the intervals for refresh the data triggering the queries again (below is set to 1-minute, should be enough):

```
var myVar = setInterval(function(){ myTimer(); $("#countdown").TimeCircles().restart(); }, 60000);
```

[Optional] Configure the color coding and thresholds:

```
$(document).ajaxStop(function() {
...

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
...
}
```

2-team.html

Configure the team names to be displayed:

```
Replace the Placeholders for the Team-A / Team-B
```

[Optional] Change the refresh timer to be displayed. It should hold the same value as defined in the js/functions.js file. 

```
	<div id="countdown" data-timer="60" style="width: 100%;"></div>
```

[Optional] Change the theme for white or black background, just switch the comment between the sections. 

```
<link rel="stylesheet" type="text/css" href="css/_light.css"> 
<!-- <link rel="stylesheet" type="text/css" href="css/_dark.css"> -->
```

## Built With

* [jquery-1.12.4](https://jquery.com/)
* [bootstrap/3.3.6](http://getbootstrap.com/)
* [TimeCircles](http://git.wimbarelds.nl/TimeCircles/readme.php)

## Authors

* **Neill Lima** - *Initial work* - [Website](http://neill.com.br)

## License

This project is licensed under the MIT License - see the [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT) for details.