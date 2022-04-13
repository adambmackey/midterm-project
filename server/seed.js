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
  seed: (req, res) => {
    sequelize
      .query(
`

        CREATE TABLE IF NOT EXISTS travelJournal(
            id SERIAL PRIMARY KEY, 
            destination VARCHAR(40) NOT NULL,
            date VARCHAR(30),
            image VARCHAR(1000),
            description TEXT
        );
        

        INSERT INTO travelJournal (destination, date, image, description)
        VALUES ('Havasupai','July 7, 2010', 'img url', 'It was so fun I would go back'),
        ('FollyBeach', 'Aug 4, 2018', 'img url', 'It was so fun I got married there'),
        ('Bartiloche', 'march 4, 2012', 'img url', 'It was a different country'),
        ('NewYork', 'Feb 10, 2018', 'img url', 'It was so cool id go back there');
        `)
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding DB", err));
  },
  postInfo: (req, res) => {
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


};
