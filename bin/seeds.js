const mongoose = require('mongoose');
const Entry = require('../models/entry');
const User = require('../models/user');

const dbName = 'gamesdonequick';
mongoose.connect(`mongodb://localhost/${dbName}`);


// const jrr = {_id: new mongoose.Types.ObjectId(), name: "JRR", lastName: "Tolkien", nationality: "British", birthday: '01/03/1892'}
// const george = {_id: new mongoose.Types.ObjectId(), name: "George", lastName: "Orwell", nationality: "British", birthday: '06/25/1903'}
//
// const authors = [jrr, george];


// const books = [
// {
//   title: "the hobbit",
//   description: "short people go on a quest",
//   author: jrr._id,
//   rating: 7
// },
// {
//   title: "lord of the rings",
//   description: "trees walk around a fight, small people grow big, dead people come back to life, etc.",
//   author: jrr._id,
//   rating: 10
// },
//   {
//     title: "Animal Farm",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     author: george._id,
//     rating: 9
//   },
//   {
//     title: "1984",
//     description: 'dystopian futuristic society where the government controls everything.  Basically Black Mirror.',
//     author: george._id,
//     rating: 5
//   }
// ]

const entries = [
    {
        game: "Halo 3",
        console: "Xbox 360",
        difficulty: "Legendary",
        time: "1:15:12",
        username: "Sorix",
        youtubeLink: "https://youtu.be/ZqlMHmGOP_Q"
    },
    {
        game: "Halo 5",
        console: "Xbox One",
        difficulty: "Legendary",
        time: "1:23:07",
        username: "DavidSpartan95",
        youtubeLink: "https://youtu.be/apiB5leqSpc"
    },
    {
        game: "Halo 3: ODST",
        console: "Xbox 360",
        difficulty: "Legendary",
        time: "1:19:03",
        username: "Heroic_Robb",
        youtubeLink: "https://www.twitch.tv/videos/163059863"
    },
];


Entry.create(entries)
    .then((result) => {
        console.log(`created ${result.length} entries`);
        mongoose.disconnect();
    })
    .catch((err) => {
        console.log(err)
    })