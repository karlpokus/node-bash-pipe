var spawn = require('child_process').spawn;

// returns {cmd: str, args: []}
function parse(data) {
  return data
    .split('|')
    .map(function(str){
      var tempArr = str.trim().split(" ");
      return {
        cmd: tempArr[0],
        args: tempArr.slice(1)
      }
    });
}

var args = process.argv.slice(2)[0];

if (!args) {
  console.error('missing args');
  
} else {
  parse(args)
    .map(function(o){
      return spawn(o.cmd, o.args)
    })
    .forEach(function(o, i, arr){
      var current = o,
          isLast = (i === arr.length -1),
          next = (isLast)? null: arr[i+1];

      // !isLast -> end stdin on next on current close
      current.on('close', function() {
        if (!isLast) {
          next.stdin.end();
        }
      });

      // pipe or log data
      current.stdout.on('data', function(data) {
        if (isLast) {
          console.log(`${data}`);
        } else {
          next.stdin.write(data);
        }
      });
    })
}