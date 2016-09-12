var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('guess> ');
rl.prompt();
rl.on('line', function(line) {
    if (line === "right") rl.close();
    rl.prompt();
}).on('close',function(){
    process.exit(0);
});

// var readline = require('readline');
// var fs = require('fs');
//
// var lineReader = readline.createInterface({
//   input: fs.createReadStream("data.txt")
// });
//
// lineReader.on('line', function (line) {
//   var arr = line.split(";");
//   console.log("Ten: %s, Tuoi: %s, Hon nhan: %s", arr[0], arr[1], arr[2]);
// });

//fs.appendFileSync(file, data)
//fs.writeFileSync(file, data)
