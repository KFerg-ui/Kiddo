// This is a magic barrel file that you shouldn't have to touch.
// All the *Route.js will be automatically included.
const fs = require('fs');

const files = fs.readdirSync(__dirname, { withFileTypes: true });
const routes = files.reduce((_routes, file) => {
  if (file.name.includes('Route.js')) {
    const routeName = file.name.replace('.js', '');
    _routes.push(require(`./${routeName}`));
  }
  
  return _routes;
}, []);

module.exports = { routes };
