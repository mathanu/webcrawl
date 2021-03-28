
var express = require('express')
var app = express()
var request = require('request');
var cheerio = require('cheerio');
var flatfile = require('flat-file-db');


app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 })	

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('welcome to scrap app')
})


app.get('/gettagdata', function (req, res) {

let tag = req.query.tag;

request('https://stackoverflow.com/questions/tagged/'+tag, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var questionTitle =[]
    var questionId =[]
    var quesVotes =[]
    var quesAnswers =[]
    var quesViews =[]
    var quesUserDetails =[]
    var outputArray = {};
    var a="",id="";
    $('.question-hyperlink').each(function(i, element){
      a = $(this).text().trim();
      questionTitle.push(a)
    });  

  $('.question-summary').each(function(i, element){
      a = $(this).attr('id');
      id = a.split("-")[2]
      questionId.push(id)
    });  

  totalQuestions = $('.mr12').text().replace("questions", " ").trim();//total no of questions 


$('.vote-count-post').each(function(i, element){
      var a = $(this).text().trim();
      quesVotes.push(a)
     // console.log(a)
    });



$('.views').each(function(i, element){
      var a = $(this).text().replace("views","").trim();
      quesViews.push(a)
     // console.log(a)
    });

$('.status').each(function(i, element){
      var a = $(this).text().replace('answer'," ").replace(' s','').trim();
      quesAnswers.push(a)
     // console.log(a)
    });

$('.user-details a').each(function(i, element){
      var a = $(this).text().trim();
      quesUserDetails.push(a)
     // console.log(a)
    });


	var todayDate = new Date();
	var finalArray=[];
	for(var key in questionId)
	{
		if(questionId[key] != undefined)
		finalArray.push({"questionid":questionId[key], "title":questionTitle[key],"votes":quesVotes[key],"views":quesViews[key],"answers":quesAnswers[key],"author":quesUserDetails[key],"dateadded":todayDate});

	}

	var withAnswer=0;
	var withoutAnswer=0;
	var viewed=0;
	var notviewed=0;
	var voted=0;
	var notVoted=0;
	var countArray={}
	for(var key in finalArray)
	{

		if(finalArray[key]['answers']!=0)
			withAnswer++
		if(finalArray[key]['answers']==0)
			withoutAnswer++
		if(finalArray[key]['views']!=0)
			viewed++
		if(finalArray[key]['views']==0)
			notviewed++
		if(finalArray[key]['votes']!=0)
			voted++
		if(finalArray[key]['votes']==0)
			notVoted++

	}
	
	countArray = [{name:"WITHANSWER",value:withAnswer},{name:"WITHOUTANSWER", value:withoutAnswer},{name:"VIEWED", value:viewed},{name:"NOTVIEWED", value:notviewed},{name:"VOTED", value:voted},{name:"NOTVOTED", value:notVoted}]//construct data for chart


	var db = flatfile('/tmp/my.db');
	db.on('open', function() {

	db.put('TOTAL-PHP', totalQuestions); 
	db.put('COUNT-PHP', countArray); 
    db.put('RECORDS-PHP', finalArray);  // store some data
	   outputArray['TOTAL'] = db.get('TOTAL-PHP');
	   outputArray['COUNT'] = db.get('COUNT-PHP');
	   outputArray['RECORDS'] = db.get('RECORDS-PHP');
	   console.log("outputArray", outputArray)
	   res.send({"result":outputArray})
	});
  }

});

});


// Change the 404 message modifing the middleware
app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// start the server in the port 3000 !
app.listen(3000, function () {
    console.log('Scraping app listening on port 3000.');
});