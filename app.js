const { fork } = require('child_process');

const run = (nThreads = 2, docsPerThread = 500, mongoUri = 'mongodb://localhost/db') => {
  for (let i = 0; i < nThreads; i++) {
    const child = fork('./src/database.js');
    
    child.send({ mongoUri, docsPerThread });

    child.on('message', message => {
      console.log(`Error: ${message.error}`);
    });
  }
};

run(process.argv[2], process.argv[3], process.argv[4]);
