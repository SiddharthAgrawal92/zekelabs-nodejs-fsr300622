const http = require('http');
const { fork } = require('child_process');

const server = http.createServer((req, res) => {
    if (req.url !== '/favicon.ico') {
        //without child-process
        // const result = findFactors(req.url.split('/')[1]);
        // res.setHeader('content-type', 'application/json');
        // res.end(JSON.stringify(result)); //string
        // res.send(any_data_type);//express

        //with child process
        const childProcess = fork('child_logic.js');

        // // childProcess.send('Hello Child Process how are u?');

        // //send the value for cpu intensive task processing
        childProcess.send(req.url.split('/')[1]);

        childProcess.on('message', data => {
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify(data));
        });

        childProcess.on('exit', code => {
            console.log(`child process has been exited with code: ${code}`);
        });
    } else {
        res.end('not found');
    }
});
server.listen(8080, () => {
    console.log('Server is running on : http://localhost:8080');
});

const findFactors = (number) => {
    if (number < 1 || number == 1) return false;

    const factors = [];
    for (let index = 2; index < number; index++) {
        if (number % index === 0) {
            factors.push(index);
        }
    }
    return { number: number, factors: factors };
} 