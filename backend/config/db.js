// const mongoose = require('mongoose');

// const dbConnect = () =>{
//     mongoose.connect(process.env.DB_URI)
//     .then((conn) =>{
//         console.log(`DataBase connected ${conn.connection.host}`)
//     }).catch((err)=>{
//         console.log(err);
//         process.exit(1)
//     })
// }


// module.exports = dbConnect;
const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB Connection Error: ${err.message}`);
    process.exit(1); 
  }
};

module.exports = dbConnect;