const mongoose = require('mongoose');
require('dotenv').config();
const { Membre, Groupe, Commande, Materiel } = require('./models'); // Assurez-vous que le chemin du fichier de modèles est correct

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGODB_URL);

// Création des membres
const membres = [
    {
        idMembre: 1,
        nom: 'Nom1',
        prenom: 'Prenom1',
        adresseRue: 'Adresse1',
        adresseVille: 'Ville1',
        adresseCP: '12345',
        email: 'email1@example.com',
        typeMembre: 'actif', // ou 'client'
        login: 'login1',
        password: 'password1'
    },
    {
        idMembre: 2,
        nom: 'Nom2',
        prenom: 'Prenom2',
        adresseRue: 'Adresse2',
        adresseVille: 'Ville2',
        adresseCP: '54321',
        email: 'email2@example.com',
        typeMembre: 'client', // ou 'actif'
        login: 'login2',
        password: 'password2'
    },
    {
        idMembre: 3,
        nom: 'Nom3',
        prenom: 'Prenom3',
        adresseRue: 'Adresse3',
        adresseVille: 'Ville3',
        adresseCP: '67890',
        email: 'email3@example.com',
        typeMembre: 'actif', // ou 'client'
        login: 'login3',
        password: 'password3'
    }
];

// Création des matériels
const materiels = [
    {
        numeroSerie: '123456',
        marque: 'Marque1',
        modele: 'Modele1',
        typeMateriel: 'ecran', // ou 'clavier', 'souris', 'tour', 'enceinte', 'laptop'
        prix: 100
    },
    {
        numeroSerie: '789012',
        marque: 'Marque2',
        modele: 'Modele2',
        typeMateriel: 'ecran', // ou 'clavier', 'souris', 'tour', 'enceinte', 'laptop'
        prix: 150
    }
];

// Création du groupe
const groupe = new Groupe({
    numeroGroupe: 1,
    nom: 'Groupe1',
    ville: 'VilleGroupe1',
    codePostal: '11111',
    membres: [],
    materiels: []
});

// Création des commandes
const commandes = [
    {
        idMembreActif: membres[0]._id,
        idMembreClient: membres[1]._id,
        date: new Date(),
        listeMateriel: [materiels[0]._id],
        prixTotal: 100
    },
    {
        idMembreActif: membres[1]._id,
        idMembreClient: membres[2]._id,
        date: new Date(),
        listeMateriel: [materiels[1]._id],
        prixTotal: 150
    }
];

// Sauvegarde des membres
Membre.insertMany(membres)
    .then(savedMembers => {
        console.log('Membres ajoutés avec succès');
        // Ajout des membres au groupe
        groupe.membres = savedMembers.map(member => member._id);
        return groupe.save();
    })
    .then(savedGroup => {
        console.log('Groupe ajouté avec succès');
        // Sauvegarde des matériels
        return Materiel.insertMany(materiels);
    })
    .then(savedMaterials => {
        console.log('Matériels ajoutés avec succès');
        // Ajout des matériels au groupe
        groupe.materiels = savedMaterials.map(material => material._id);
        return groupe.save();
    })
    .then(savedGroupWithMaterials => {
        console.log('Matériels ajoutés au groupe avec succès');
        // Sauvegarde des commandes
        return Commande.insertMany(commandes);
    })
    .then(savedCommands => {
        console.log('Commandes ajoutées avec succès');
        console.log('Base de données initialisée avec succès');
        mongoose.connection.close(); // Fermeture de la connexion à la base de données
    })
    .catch(error => console.error('Erreur lors de l\'initialisation de la base de données:', error));
