var express = require('express');
var path = require('path');
var moment = require('moment');
var app = express();
var filePath=path.join(__dirname,'index.html');
var reg=/^\d{8,}$/

app.get('/',function(req,res){
	res.sendFile(filePath,function(err){
		if(err){
			console.log('err');
			res.status(err.status).end();
			return ;
		}
		console.log('Res:'+filePath);
	})
});

//capture the date
app.get('/:datestring',function(req,res){
	var mydate;
	if(reg.test(req.params.datestring)){
		mydate=moment(req.params.datestring,"X");
	}else{
		mydate=moment(req.params.datestring,"YYYY MM DD");
	}
	if(mydate.isValid()){
		res.json({
			code:0,
			unix:mydate.format('X'),
			natural:mydate.format('YYYY-MM-DD')
		});
	}else{
		res.json({
			code:1,
			unix:null,
			natural:null
		})
	}
});

app.listen(80,function(){
	console.log('App listening on port 80');
});