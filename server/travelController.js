require(`dotenv`).config();

const { CONNECTION_STRING } = process.env;

const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
    postInfo: (req, res) => {
       const { destination, date, image, description } = req.body
       
        sequelize.query(`
          INSERT INTO travelJournal (destination, date, image, description)
          VALUES ('${destination}', '${date}', '${image}', '${description}');
          `)
          .then(dbRes => res.status(200).send(dbRes[0]))
          .catch(err => console.log(err))
      },
      getInfo: (req, res) => {
        
        sequelize.query(`
        SELECT * FROM travelJournal;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
      }

}