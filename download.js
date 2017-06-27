var csv = require('csv');
var fs = require('fs');
var parse = require('csv-parse');
var execSync = require('child_process').execSync;
var opts = require('opts');

opts.parse([
    {
        'short': 'i',
        'long': 'index',
        'description': 'index for starting point of download',
        'value': true,
        'required': false
    },
]);

var index = opts.get('index') || 0;

//child_process.execSync関数を利用する
//var result = "" + execSync('cat *.js bad_file | wc -l');

var parser = parse({delimiter: ','}, function(err, data){
  //var result = "" + execSync('cat *.js bad_file | wc -l');
  data.slice(index).forEach(function(row){
    if (row[6] == 'なし') {
      return;
    }
    if (row[6].startsWith('https://www.facebook.com', 0)) {
      return;
    }
    console.log("downloading " + row[6]);
    var result = execSync('wget -q -r -L -T 60 -nc -w 1 -P ./temp/' + row[0] + " " + row[6]);
    //console.log(result);
  });
});

fs.createReadStream(__dirname+'/candidates.csv').pipe(parser);
