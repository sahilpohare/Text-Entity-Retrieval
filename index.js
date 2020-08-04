const { parseTextWithTemplateBase, ExtractArraysAndStrings } = require('./parser');
const express = require('express')();
const bodyParser = require('body-parser');

const testRequest = {
	template: 'my name is $name and I do $activities',
	inputString: 'my name is Sahil and I do coding, gaming and singing',
	variables: [
		{
			varName: 'name',
			type: 'string'
		},
		{
			varName: 'activities',
			type: 'array',
			separator: ',|and'
		}
	]
};
const parseData = (data = testRequest) => {
	var out = parseTextWithTemplateBase(data.inputString, data.template);
	if (data.variables) out = ExtractArraysAndStrings(out, testRequest.variables);
	return out;
};

express.use(bodyParser.json());
//console.log(JSON.parse(`{"template":"my name is $name and I do $activities","inputString":"my name is Sahil and I do coding, gaming and singing","variables":[{"varName":"name","type":"string"},{"varName":"activities","type":"array","separator":",|and"}]}`));
express.get('/', (req, res) => res.send('GOTCHA'));

express.get('/parse', (req, res) => {
	let out = parseData(req.body);
	res.json(out);
});

express.listen(3000, console.log(`Started Jingling on 3000`));
