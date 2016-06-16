var plugins = require('glob').sync('decklang/plugins/*.ne').map(x => x.split('/')[2].split('.')[0]);
plugins.forEach(x => console.log('@include \"plugins/'+x+'.ne\"'));
console.log('Directive -> ' + plugins.join('|'));
