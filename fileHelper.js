var readline = require('readline');
var fs = require('fs');
module.exports = {
	readFile : function(filePath, cb) {
		// cb là 1 function call back và trong
		// đó result là mảng giá trị trả về
		var result = [];

		var lineReader = readline.createInterface({
			input : fs.createReadStream(filePath)
		});

		lineReader.on('line', function(line) {
			result.push(line);
		});

		lineReader.on('close', function(line) {
			cb(result);
		});
	},

	writeFile : function(filePath, array, isAppended) {
		if (isAppended) {
			fs.appendFileSync(filePath, array);
			//fs.close();
		} else{
			fs.writeFileSync(filePath, array);
			//fs.close();
		}

	},


};
