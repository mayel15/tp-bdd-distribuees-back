const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const membreSchema = new Schema({
    idMembre: Number,
    nom: String,
    prenom: String,
    adresseRue: String,
    adresseVille: String,
    adresseCP: String,
    email: String,
    typeMembre: {
      type: String,
      enum: ['actif', 'client']
    },
    login: String,
    password: String,
    groupe: { type: Schema.Types.ObjectId, ref: 'Groupe' }
});

const groupeSchema = new Schema({
    numeroGroupe: Number,
    nom: String,
    ville: String,
    codePostal: String,
    membres: [{ type: Schema.Types.ObjectId, ref: 'Membre' }],
    materiels: [{ type: Schema.Types.ObjectId, ref: 'Materiel' }]
});

const commandeSchema = new Schema({
  idMembreActif: { type: Schema.Types.ObjectId, ref: 'Membre' },
  idMembreClient: { type: Schema.Types.ObjectId, ref: 'Membre' },
  date: Date,
  listeMateriel: [{ type: Schema.Types.ObjectId, ref: 'Materiel' }],
  prixTotal: Number
});

const materielSchema = new Schema({
  numeroSerie: String,
  marque: String,
  modele: String,
  typeMateriel: {
    type: String,
    enum: ['ecran', 'clavier', 'souris', 'tour', 'enceinte', 'laptop']
  },
  prix: Number,
  groupe: { type: Schema.Types.ObjectId, ref: 'Groupe' }
});

// creation des models
const Membre = mongoose.model('Membre', membreSchema);
const Groupe = mongoose.model('Groupe', groupeSchema);
const Commande = mongoose.model('Commande', commandeSchema);
const Materiel = mongoose.model('Materiel', materielSchema);

// export des schemas
module.exports = {
    Membre,
    Groupe,
    Commande,
    Materiel
}