import http from 'http';

var options = { 
    host: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET'
};

function runReq(response){
    let str = '';

    response.on('data', (chunk) => {
        str += chunk;
    });

    response.on('end', () => {
        console.log(str);
    });
}

//simulate 100 requests
for (let i = 0; i < 100; i++) {
    http.request(options, runReq).end();
}