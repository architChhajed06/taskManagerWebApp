const mongoose = require('mongoose');



const connectionString = "mongodb+srv://architchhajed6:formula070@cluster0.xx6aulo.mongodb.net/test?retryWrites=true&w=majority"

const connectDB = (url) => {
    return mongoose.connect(url)
}



module.exports = connectDB
