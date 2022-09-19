const express = require("express");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");
const cors = require('cors')
const app = express();
app.use(express.json())
app.use(cors())

app.cors


// -- Define your route listeners here! --

app.get('/pokemon', (req, res) => {
    return res.status(200).json(allPokemon)
});

app.get('/randompokemon', (req, res) => {
    const min = 0
    const max = allPokemon.length
    const aleatory = Math.floor(Math.random() * (max - min + 1) + min)
    const randomPokemon = allPokemon.filter(element => element.id == aleatory)
    return res.status(200).json(randomPokemon)
});

app.get('/pokemon/:id', (req, res) => {
    const certainPokemon = allPokemon.filter(element => element.id == req.params.id)
    return res.status(200).json(certainPokemon)
});

app.get('/searchpokemon', (req, res) => {
    let foundPokemon = []
    if (req.query.name) {
        allPokemon.forEach(pokemon => {
            if (pokemon.name.includes(req.query.name)) {
                foundPokemon.push(pokemon)
            }
        })
    }
    return res.status(200).json(foundPokemon)
});

app.post('/pokemon/add', (req, res) => {
    allPokemon.push(req.body)
    return res.status(200).json(allPokemon)
});

app.put('/pokemon/:id', (req, res) => {
    allPokemon.forEach((element, index) => {
        if (element.id == req.params.id) {
            allPokemon[index] = { ...allPokemon[index], ...req.body }
            // allPokemon[index] = { ...allPokemon[index], name: "jonathan2" }
        }
    })
    // spread
    return res.status(200).json(allPokemon)
});

app.delete('/pokemon/:id', (req, res) => {
    const deletedPokemon = allPokemon.filter(element => element.id != req.params.id)
    return res.status(200).json(deletedPokemon)
});

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
