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
      .query(`
        DROP TABLE IF EXISTS travelJournal;
        CREATE TABLE IF NOT EXISTS travelJournal(
            id SERIAL PRIMARY KEY, 
            destination VARCHAR(40) NOT NULL,
            date VARCHAR(30),
            image VARCHAR(1000),
            description TEXT
        );
        

        INSERT INTO travelJournal (destination, date, image, description)
        VALUES ('Havasupai','July 7, 2010', 'https://media.istockphoto.com/photos/havasu-falls-landscape-picture-id183280773?b=1&k=20&m=183280773&s=170667a&w=0&h=kSTAqqt2W96DZadl6I8vqie2XF73QBSTodgFy8ahTvw=', 'It was so fun I would go back'),
        ('FollyBeach', 'Aug 4, 2018', '', 'It was so fun I got married there'),
        ('Bartiloche', 'march 4, 2012', '', 'It was a different country'),
        ('NewYork', 'Feb 10, 2018', 'https://media.istockphoto.com/photos/downtown-manhattan-new-york-jersey-city-golden-hour-sunset-picture-id1304412814?b=1&k=20&m=1304412814&s=170667a&w=0&h=yUrsej_Tz0kQTrHUMBuYn5OJkdIMo6QFiUbTWkw-e40=', 'It was so cool id go back there');
        `)
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding DB", err));
  }


};
