const fs = require("fs")

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
cat(process.argv[2]);
