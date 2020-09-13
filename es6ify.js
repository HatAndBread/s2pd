const fs = require('fs');

fs.appendFile('./dist/s2pd.js', 'export default s;', (err) => {
  if (err) throw err;
  console.log('Success! You can use es6 module now! ✨💖🌈');
});
