const handlebars = require('handlebars');

const template = handlebars.compile('<p>{{someVar}}</p>');

const result = template({ someVar: 'Hello!'});

console.log(result);