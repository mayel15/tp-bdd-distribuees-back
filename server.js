const { Commande, Materiel, Membre, Groupe } = require('./models');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

try {
    mongoose.connect("mongodb://localhost:27017/projet-bdd")
} catch (err) {
    console.log("connection to the database failed")
}

// listening server
app.listen(process.env.PORT, () => {
    console.log(`Server Started at http://localhost:${process.env.PORT}`)
})


// get the homepage of the server : OK
app.get('/', (req, res) => {
    res.status(200).send({ message: "Bienvenue dans le serveur de TP BDD Distribuees" })
})

// add a new materiel 
app.post('/api/materiel/add', (req, res) => {
    var nouveauMateriel;
    Materiel.findOne({ numeroSerie: req.body.numeroSerie }).then((materiel) => {
        if (!materiel) {
            nouveauMateriel = new Materiel(req.body);
            nouveauMateriel.save().then(() => {
                console.log({ message: "new material added successfully", })
            })
        } else {
            nouveauMateriel = materiel;
            console.log("The materiel already exists")
        }
    })
})

// add a new member
app.post('/api/membre/signup', (req, res) => {
    Membre.findOne({login: req.body.login, password: req.body.password}).then((membre) => {
        if (!membre){
            const nouveauMembre = new Membre(req.body)
            nouveauMembre.save()
            return res.status(200).send(nouveauMembre)
        }
        else{
            return res.status(200).send({message: "error :( the member already exists"})
        }       
    })
})

// create a group
app.post('/api/groupe/create', (req, res) => {
    Groupe.findOne({numeroGroupe: req.body.numeroGroupe}).then((groupe) => {
        if (!groupe){
            const nouveauGroupe = new Groupe(req.body)
            nouveauGroupe.save()
            return res.status(200).send(nouveauGroupe)
        }
        else{
            return res.status(200).send({message: "error :( the group already exists"})
        }       
    })
})

// login with an account
app.post('/api/membre/login', (req, res) => {
    Membre.findOne({login: req.body.login, password: req.body.password}).then((membre) => {
        return (!membre)
            ? res.status(404).send({ message: "bad credentials" })
            : res.status(200).send({ message: `${membre.prenom} is connected`})          
    })
})


// commander a material 
app.post('/api/materiel/commande', (req, res) => {
    Commande.findOne({id: req.body.login}).then((commande) => {
        if (!commande){
            const nouvelleCommande = new Commande(req.body)
            nouvelleCommande.save()
            return res.status(200).send(nouvelleCommande)
        }
        else{
            return res.status(200).send({message: "error :( the commande already exists"})
        }       
    })
})


// get all the members
app.get('/api/membres', (req, res) => {
    Membre.find().then((membre) => {
        return (!membre)
            ? res.status(404).send({ message: "membre not found" })
            : res.status(200).send(membre)
    })
})

// get all the materiels
app.get('/api/materiels', (req, res) => {
    Materiel.find().then((materiel) => {
        return (!materiel)
            ? res.status(404).send({ message: "membre not found" })
            : res.status(200).send(materiel)
    })
})

// get all the members
app.get('/api/groupes', (req, res) => {
    Groupe.find().then((groupe) => {
        return (!groupe)
            ? res.status(404).send({ message: "groupe not found" })
            : res.status(200).send(groupe)
    })
})

// get all the members
app.get('/api/commandes', (req, res) => {
    Commande.find().then((commande) => {
        return (!commande)
            ? res.status(404).send({ message: "commande not found" })
            : res.status(200).send(commande)
    })
})

// get a particular resource : OK
app.get('/api/resources/:id', (req, res) => {
    Resource.findById(req.params.id).then((resource) => {
        return (!resource)
            ? res.status(404).send({ message: "resource not found" })
            : res.status(200).send(resource)
    })
})