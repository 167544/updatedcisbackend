let http = require('http');


const server = http.createServer((request, response) => {
    
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('<p> Hello, Node.js HTTP Server! </p>');

});
  


server.listen(3001)