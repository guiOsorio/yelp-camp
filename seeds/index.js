const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected')
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground ({
            author: '60a84c91760a8c2a58dae65a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, repellendus laborum. Quaerat, dignissimos quas! Odit vitae quos autem, voluptatum corporis vero magni fugit. Quaerat expedita asperiores ducimus, adipisci quasi consectetur?',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/gosorio/image/upload/v1622232169/YelpCamp/ezdpvkybhm30rbkldhtw.jpg',
                  filename: 'YelpCamp/ezdpvkybhm30rbkldhtw'
                },
                {
                  url: 'https://res.cloudinary.com/gosorio/image/upload/v1622232169/YelpCamp/cvjnukubcwj37qaglduv.jpg',
                  filename: 'YelpCamp/cvjnukubcwj37qaglduv'
                }
            ],
            geometry: { 
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ] 
            }
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})