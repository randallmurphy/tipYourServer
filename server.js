const fs = require('fs');
const http = require('http');

http
    .createServer((request, response) => {
        if (request.url === '/create-directory' && request.method === 'POST') {
            fs.mkdir('content', (err) => {
                if (err) {
                    response.end(err);
                } else {
                    response.end('content directory created')
                }
            })
        } else if (request.url === '/create-text' && request.method === 'PUT') {
            fs.writeFile('randomText.txt', 'some random text for content', (err) => {
                if (err) {
                    response.end(err);
                } else {
                    response.end('file created')
                }
            })
        } else if (request.url === '/new-foler-and-fille' && request.method === 'POST') {
            fs.readFile('randomText.txt', (err, data) => {
                if (err) {
                    response.end(err);
                } else {
                    fs.writeFile('content/verbage.txt', data, (err) => {
                        if (err) {
                            response.end(err);
                        } else {
                            response.end('verbage.txt created.');
                            setTimeout(() => {
                                fs.unlinkSync('content/verbage.txt')
                                fs.rmdir('content', (err) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log('directory deleted')
                                    }
                                })
                            }, 7000)
                        }
                    })
                }
            })

        } else {
            response.end('route not found or method not called');
        }
    })



















    .listen(3000, () => {
        console.log('server successfully running on port: 3000!')
    })