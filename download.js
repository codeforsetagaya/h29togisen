var csv = require('csv');
var fs = require('fs');
var parse = require('csv-parse');
var execSync = require('child_process').execSync;

//child_process.execSync関数を利用する
//var result = "" + execSync('cat *.js bad_file | wc -l');

var parser = parse({delimiter: ','}, function(err, data){
  //var result = "" + execSync('cat *.js bad_file | wc -l');
  data.forEach(function(row){
    if (row[6] == 'なし') {
      return;
    }
    var result = execSync('wget -r -L -P ./temp/' + row[0] + " " + row[6]);
    console.log(result);
  });
});

fs.createReadStream(__dirname+'/candidates.csv').pipe(parser);
