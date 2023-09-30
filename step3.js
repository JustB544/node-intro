const fs = require("fs");
const axios = require("axios")


function cat(path){
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(`Error reading ${path}:`);
            console.log(err.stack);
            process.exit(1);
        }
        console.log(data);
        process.exit(0);
    });
}

function catWrite(path, file){
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(`Error reading ${path}:`);
            console.log(err.stack);
            process.exit(1);
        }
        fs.writeFile(file, data, 'utf8', function(err){
            if (err) {
                console.log(`Error writing ${file}:`);
                console.log(err.stack);
                process.exit(1);
            }
            process.exit(0);
        });
    });
}

function webCat(url){
    const response = axios.get(url)
    .then(({data}) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(`Error fetching ${url}: `);
        console.log(err.message);
        process.exit(1);
    });
}

function webCatWrite(url, file){
    const response = axios.get(url)
    .then(({data}) => {
        fs.writeFile(file, data, 'utf8', function(err){
            if (err) {
                console.log(`Error writing ${file}:`);
                console.log(err.stack);
                process.exit(1);
            }
            process.exit(0);
        });
    })
    .catch((err) => {
        console.log(`Error fetching ${url}: `);
        console.log(err.message);
        process.exit(1);
    });
}

if (process.argv[2] === "--out"){
    if (process.argv[4].slice(0, 4) === "http") {
        webCatWrite(process.argv[4], process.argv[3]);
    }
    else {
        catWrite(process.argv[4], process.argv[3]);
    }
}
else {
    console.log("WTF");
    if (process.argv[2].slice(0, 4) === "http") {
        webCat(process.argv[2]);
    }
    else {
        cat(process.argv[2]);
    }
}

