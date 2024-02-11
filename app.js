const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>enter message</title></head>");
    res.write(`<body><h3>${fs.readFileSync("message.txt")}</h3><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></input></form></body>`);
    res.write("</html>");
    res.end();
  }
  if(url === '/message' && req.method === 'POST'){
    const body =[];
    req.on('data',(chunk)=>{
       body.push(chunk);
    });
    req.on('end',()=>{
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split('=')[1];
        fs.writeFileSync('message.txt',message);
    });
    res.statusCode = 302;
    res.setHeader('Location','/');
    return res.end();
  }
});

server.listen(3000);
