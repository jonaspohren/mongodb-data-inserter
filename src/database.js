const mongoose = require('mongoose');
const faker = require('faker');
const User = require('./models/user');

process.on('message', async message => {
  try {
    await mongoose.connect(message.mongoUri, { useNewUrlParser: true });
  
    for (let i = 0; i < message.docsPerThread; i++) {
      const user = new User({
        name: faker.name.findName(),
        company: faker.company.companyName(),
        companySize: faker.random.number(),
        jobTitle: faker.name.jobTitle(),
        updatedAt: faker.date.past(),
        email: faker.internet.email(),
        password: faker.internet.password()
      });
  
      await user.save();
    }
  
    await mongoose.disconnect();

  } catch (err) {
    process.send({ error: err.message })
  } finally {
    process.exit();
  }
});