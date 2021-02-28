// ! mongoose
const mongoose = require('mongoose')

const dbURI = 'mongodb+srv://segi3:4re6vpivYC4koADm@cluster0.iuqmx.mongodb.net/yabot?retryWrites=true&w=majority'

module.exports = async() => {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        // .then(() => console.log('connected to db'))
        .catch((err) => console.log(err));
    return mongoose
}