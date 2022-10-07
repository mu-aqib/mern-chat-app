const mongooge = require('mongoose');

const dbconnect = async ()=>{
    try{
        let conn = await mongooge.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("db connected: " + conn.connection.host)
    }
    catch(err){
        console.log("some error occured " + err.message)
    }
}

module.exports = dbconnect;