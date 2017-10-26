
const fs = require('fs'); 
let params = process.argv;
let port = params[2]; 
const http = require('http');
const path = require('path');
const uuidv1 = require('uuid/v1');
const qs = require('querystring');
const logger = require('./node_modules/mLog'); 
const moment = require('./node_modules/moment');
const colors = require('./node_modules/colors');
const axios = require('./node_modules/axios');

function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

const server = http.createServer(function (req,res) {
    var filePath = '.' + req.url;
    if(req.method === 'GET'){
        if (filePath == './') {
        fs.readFile('./index.html',function (err, html){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html);
        res.end();
        
        console.info(colors.blue(moment().format('MMMM Do YYYY, h:mm:ss a'), req.method, req.url));
    });
    }
    
    else if (fs.existsSync(filePath)) {
        fs.readFile(filePath, function (err, html){ 
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html);
        console.info(colors.blue(moment().format('MMMM Do YYYY, h:mm:ss a'), req.method, req.url));
        res.end();
        })
       
    }
    else {
         res.writeHead(404, {'Content-Type': 'text/html'});
         fs.createReadStream('404.html').pipe(res);
         console.error(colors.red('The URL '+ req.url +' doesnt exist', moment().format('MMMM Do YYYY, h:mm:ss a'), req.method));
    }
            var cookies = parseCookies(req);
            if(cookies){
                 let data = fs.readFileSync(__dirname + `/.session/${cookies.SESSIONID}`);
                console.log(data)
                 res.setHeader('x-my-user-data', data);
            }

    }
   
    
       
    
    if (req.method === 'POST' && req.url === '/add-session' ) {
        var body = '';
        req.on('data', function(chunk){
            body += chunk;
        });
        req.on('end', function() {
            var data = qs.parse(body);
            var valeur = uuidv1();
            // now you can access `data.email` and `data.password`
            
            fs.writeFile(__dirname + `/.session/${valeur}`, data, function(err) {
             console.log(data);
            });
            
          
    
            res.setHeader('Set-Cookie', `SESSIONID=${valeur}`);
            res.writeHead(200);
            console.log(data);
            res.end();
  });
               }
    
  
});

server.listen(port,'127.0.0.1',(err) => {
  if (err) {
    return console.log('something bad happened', err)
   }

  console.log(colors.blue(moment().format('MMMM Do YYYY, h:mm:ss a'), `server is listening on ${port}`))
})