// ! mongoose
const mongoose = require('mongoose')

const { mongoPath } = require('@root/config.json')

module.exports = async() => {
    await mongoose.connect(mongoPath, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        // .then(() => console.log('connected to db'))
        .catch((err) => console.log(err));

    mongoose.set('useFindAndModify', false);

    console.log('Connection to mongoDB established.')

    return mongoose
}