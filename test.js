const axios = require('axios').default;
const fs = require('fs');

var argv = process.argv.slice(2);

if (argv[0].match(/^([a-zA-Z0-9\s_\\.\-\(\):])+(.json)$/)) {

    console.log('File Parsed');

	let rawdata = fs.readFileSync(argv[0]);
    let testData = JSON.parse(rawdata);
    console.log('Input Email')
    console.log(testData.inputString);
	axios
		.get('http://localhost:3000/parse', {
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify(testData)
		})
		.then((val) => {
            console.log('\n Parsed Data')
			console.log(val.data);
        });
} else {
	console.log('invalid file: JSON REQUIRED');
}
