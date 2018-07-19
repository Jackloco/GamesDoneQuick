const mongoose = require('mongoose');
const Entry = require('../models/entry');
const Forum = require('../models/forum');
const User = require('../models/user');

const dbName = 'gamesdonequick';
mongoose.connect(`mongodb://localhost/${dbName}`);

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

const forum = [
    {
        username: "Jeb Bush",
        topic: "Main Character in Halo",
        body:"Why isn't the main character in Halo me?"
    },
    {
        username: "Sam Bonner",
        topic: "wtf is this shit",
        body: "why isn't there a speed run of Cold Waters?"
    },
    {
        username: "Rabbleflaggers",
        topic: "Is SkullGirls a possible speed run?",
        body: "Asking for a friend..."
    }
];

Forum.create(forum)
    .then((result) => {
        console.log(`created ${result.length} forum posts`);
        mongoose.disconnect();
    })
    .catch((err) => {
        console.log(err)
    })