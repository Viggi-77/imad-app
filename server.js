var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;

var config = {
    user:'hegdevignesh711',
    database:'hegdevignesh711',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles= {
'article-one': {
    title: 'Article One | Vignesh Hegde',
    heading:'My Profile',
    date:'August 6,2017',
    content:` <p> A simple profile which is not so highfy but wish to explore and grow and contribute to the betterment of the organisation and environment around           me.  A simple profile which is not so highfy but wish to explore and grow and contribute to the betterment of the organisation and environment             around me. A simple profile which is not so highfy but wish to explore and grow and contribute to the betterment of the organisation and         environment around me. 
               </p>
            </div>
            <div>
                <p> A simple profile which is not so highfy but wish to explore and grow and contribute to the betterment of the organisation and environment around me.  A simple profile which is not so highfy but wish to explore and grow and contribute to the betterment of the organisation and environment around me. A simple profile which is not so highfy but wish to explore and grow and contribute to the betterment of the organisation and environment around me. 
               </p>`
},
'article-two': {
    title: 'Article Two | Vignesh Hegde',
    heading:'My Profile',
    date:'August 7,2017',
    content:` <p> A simple profile which is not so highfy but wish to explore and grow and contribute to the betterment of the organisation and environment around           me.  A simple profile which is not so highfy but wish to explore and grow and contribute to the betterment of the organisation and environment             around me. A simple profile which is not so highfy but wish to explore and grow and contribute to the betterment of the organisation and         environment around me. 
               </p>
            </div>
            <div>
                <p> A simple profile which is not so highfy but wish to explore and grow and contribute to the betterment of the organisation and environment around me.  A simple profile which is not so highfy but wish to explore and grow and contribute to the betterment of the organisation and environment around me. A simple profile which is not so highfy but wish to explore and grow and contribute to the betterment of the organisation and environment around me. 
               </p>`
},
'article-three': {
    title: 'Article Three | Vignesh Hegde',
    heading:'My Profile',
    date:'August 8,2017',
    content:` <p> A simple profile which is not so highfy but wish to explore and grow and contribute to the betterment of the organisation and environment around           me.  A simple profile which is not so highfy but wish to explore and grow and contribute to the betterment of the organisation and environment             around me. A simple profile which is not so highfy but wish to explore and grow and contribute to the betterment of the organisation and         environment around me. 
               </p>
            </div>
            <div>
                <p> A simple profile which is not so highfy but wish to explore and grow and contribute to the betterment of the organisation and environment around me.  A simple profile which is not so highfy but wish to explore and grow and contribute to the betterment of the organisation and environment around me. A simple profile which is not so highfy but wish to explore and grow and contribute to the betterment of the organisation and environment around me. 
               </p>`
}
};

function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    var htmlTemplate =`
    <!DOCTYPE html>
    <html>
        <head>
            <title>${title}</title>
            <meta name="viewport" content="width=device-width. intial-scale=1">
             <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href='/'>Home</a>
                </div>
                <h3>${heading}</h3>
                <div>
                    <p>${date}</p>
                </div>
                <div>
                   ${content}
                </div>
            </div>
        </body>
    </html>`;
    return htmlTemplate;
}
var counter=0;
app.get('/counter', function (req, res) {
    counter=counter+1;
    res.send(counter.toString());
});
var names=[];
app.get('/submit-name', function(req, res){// URL/submit-name?name==xxxx
   var name=req.query.name; 
   names.push(name);
   //JSON:Javascript Object Notation;
   res.send(JSON.stringify(names));
});
var pool=new Pool(config);
app.get('/test-db',function(req,res){
    //Make a select request
    
    //retun the response with the results
    pool.query('SELECT * FROM test', function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result));
        }
    });
    
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/:articleName', function(req, res){
    //articleName==articleOne
    //articles[articleName]== content {} of article one
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
