var express=require('express')
var path=require('path')
var mongoose=require('mongoose')
var Movie=require('./models/movies')
var _=require('underscore')
var port=process.env.PORT || 3000
var app=express()

mongoose.connect('mongodb://localhost/movies')

app.set('views','./views/pages')
app.set('view engine','jade')
//app.use(express.bodyParser())
app.use(express.static('bower_components'))
app.listen(port)

console.log('start at'+port)

//Home page
app.get('/',function(req,res){
	movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('index',{
			title: 'wanglin shouye',
			movies:movies
		})
	})
})
//see movie
app.get('/movie/:id',function(req,res){
	var id=req.params.id
	Movie.findById(id,function(err,movie){
		res.render('detail',{
			title: 'wanglin xiangqingye',
			movie:movie
		})
	})
	
})
//input new movie
app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title: 'wanglin admin',
		movie:{
			title:'',
			doctor:'',
			country:'',
			year:'',
			poster:'',
			flash:'',
			summary:'',
			language:''
		}
	})
})
//post new movie
app.post('/admin/movie/new',function(req,res){
	var id=req.body.movie.id
	var movieObj=req.body.movie
	var _movie
	if(id !== 'undefined'){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err)
			}
			_movie=_.extend(movie,movieObj)
			-movie.save(function(err,movie){
				if(err){
					console.log(err)
				}
				res.redirect('/movie'+movie._id)
			})
		})
	}
	else{
		_movie=new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			poster: movieObj.poster,
			summary: movieObj.summary,
			flash: movieObj.flash
		})
		_movie.save(function(err,movie){
			if(err){
				console.log(err)
			}
			res.redirect('/movie'+movie._id)
		})
	}
})
//update movie
app.get('/admin/update/:id',function(req,res){
	var id = req.params.id
	if(id){
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'update',
				movie:movie
			})
		})
	}

})

//movies list
app.get('/admin/list',function(req,res){
	movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('list',{
			title: 'wanglin list',
			movies: movies
		})
	})
	
})
console.log(__dirname+'>')