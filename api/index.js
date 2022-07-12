const { createSeeds } = require('./seeds.js');
const server = require('./src/app.js');
const { conn, Dog} = require('./src/db.js');

// Syncing all the models at once.
conn
  .sync({ force: true })
  .then(() => {
    // Run seeds
    (async ()=>{
      await createSeeds(Dog);
    })();
  })
  .then(() => {
    server.listen(3001, () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
  });
