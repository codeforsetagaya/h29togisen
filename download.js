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

var parser = parse({delimiter: ','}, function(err, data){
  //var result = "" + execSync('cat *.js bad_file | wc -l');
  data.slice(index).forEach(function(row){
    // skip candaite who isn't online
    if (row[6] == 'なし') {
      return;
    }
    // skip facebook page
    if (row[6].startsWith('https://www.facebook.com', 0)) {
      return;
    }
    console.log("downloading " + row[6]);
    try {
      var result = execSync('wget -r -T 30 -nc -l 2 -np -w 1 -P ./temp/' + row[0] + " " + row[6]);
    }
    catch (err) {
      console.log("error on:" + row[6]);
    }
  });
});

fs.createReadStream(__dirname+'/candidates.csv').pipe(parser);
