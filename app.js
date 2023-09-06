var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.get('/signup', function(req,res){

	res.render("signuppage", {styleLink:"./stylesheets/signup.css"});

});

app.get('/partnerlogin',function(req,res){

	res.render("partnerlogin");
})

app.get('/submit',function(req,res){

	fs.readdir(path.join(__dirname,"database/"),(err,file)=>{
		
		for(i=0;i<=file.length;i++){
			console.log(file[i]);

		}
	

	});

	let fileContent = {
		name:req.query.name
		,email:req.query.email
		,password:req.query.password,
	}
	
	const numFiles = new Promise((resolve,reject)=>{

		let DBPath = path.join(__dirname,"database/");
		fs.readdir(DBPath,(err,file) =>{	
			fs.writeFile(DBPath+"userfile"+file.length+".json",JSON.stringify(fileContent),(err)=>{
				if(err){
					reject(err);
				}
				else{
					
					resolve(file.length);
				}
			});
		});
	});
	
})
/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
*/
/*
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/
module.exports = app;
