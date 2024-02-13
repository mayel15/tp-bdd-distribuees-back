# Membres de l'équipe

- Alaaeddin ALMAJJO [@aladinMJ](https://github.com/aladinMJ)
- Ayman DOULKOM [@ayman-h226](https://github.com/ayman-h226)
- Pape THIAM [@mayel15](https://github.com/mayel15)

# Front-end

La partie front end du projet est disponible ici:
`https://github.com/mayel15/tp-bdd-distribuees-front`

# Lancer le projet back-end

- Rassurez vous d'avoir `Git`, `Docker` et `Node` installés.

## Configuration

- Cloner le projet :
  `git clone https://github.com/mayel15/tp-bdd-distribuees-back.git`

- Installer les dependences
  `npm install`

## Lancer Docker

- Lancer Docker Desktop

- Exécuter le docker compose
  `docker-compose up -d`

## Démarrer le server

- Initialiser la base de données avec données aléatoires
  `npm run init:db`

- Lancer le serveur express pour exposer les API
  `npm run start`

- Et normalement le serveur doit écouter sur le port 3000 en localhost

- Maintenant le front end peut être démarer ici:
  `https://github.com/mayel15/tp-bdd-distribuees-front`
  