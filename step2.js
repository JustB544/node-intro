const fs = require("fs");
const axios = require("axios")

path = process.argv[2];

function cat(path){
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(`Error reading ${process.argv[2]}:`);
            console.log(err.stack);
            process.exit(1);
        }
        console.log(data);
        process.exit(0);
    });
}

function webCat(url){
    const response = axios.get(process.argv[2])
    .then(({data}) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(`Error fetching ${process.argv[2]}: `);
        console.log(err.message);
        process.exit(1);
    });
}

if (path.substr(0, 4) === "http") {
    webCat(path);
}
else {
    cat(path);
}

