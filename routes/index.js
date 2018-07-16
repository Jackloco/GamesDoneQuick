const express = require('express');
const router = express.Router();
// const pokeApi = axios.create({
//     baseURL: 'http://pokeapi.co/api/v2/pokemon'
// })

/* GET home page */
router.get('/', (req, res, next) => {
    res.render('index');
});

// function getPokemonInfo(id) {
//     pokeApi.get(id)
//         .then(response => {
//             console.log(response.data)
//         })
//         .catch(err => {
//             console.error(err)
//         })
// }
//
// document.getElementById("pokeButton").onclick = function () {
//     getPokemonInfo("1");
// }

module.exports = router;
