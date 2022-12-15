const http = require('http');
const routes = require('./routes');
const HOSTNAME = '127.0.0.1', PORT = 8080;
const server = http.createServer(routes);
server.listen(PORT, HOSTNAME, () => { console.log(`Server is running at: http://${HOSTNAME}:${PORT}`); });

//http client from npm
// axios.get('http://localhost:8080').then(res=>{})
// axios.post('http://127.0.0.1:8080', {abc: 123}).then(res=>{})

// internally axios uses below
// fetch()
// XMLHttpRequest