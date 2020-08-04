function parseTextWithTemplateBase(input, template) {
	const re = new RegExp('^' + template.replace(/\$(\w+)/g, '(?<$1>.+?)') + '$');
	return Object.assign({}, input.match(re).groups);
}

function ExtractArraysAndStrings(input, template) {
	let out = {};
	Object.keys(input).forEach((val) => {
		varTemplate = template.find((searchRes) => searchRes.varName == val);
		if (varTemplate) {
			switch (varTemplate.type) {
				case 'string':
					out = { ...out, [val]: input[val] };
					break;
                case 'array':
                    out = { ...out, [val]: input[val].split(RegExp(varTemplate.separator)).map((val) => val.trim()) };
                    break;
                default :
                    out = { ...out, [val]: input[val] };
                    break;
			}
		} else {
			out = { ...out, [val]: input[val] };
		}
	});
	return out;
}

function insertObjectDataInString(template = '', data = {}) {
	const regex = /\$(\w+)/g;
	let formattedString = template;
	while ((r = regex.exec(template))) {
		formattedString = formattedString.replace(r[0], data[r[1]]);
	}
	return formattedString;
}

module.exports = {
	parseTextWithTemplateBase,
	insertObjectDataInString,
	ExtractArraysAndStrings
};
