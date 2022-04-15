# stage

- Démonstration
*[vidéo](https://drive.google.com/file/d/1kv-kgXud7ZwZUKSJlGFbprmVZiK0G768/view?usp=sharing)*

----------------------------

#ERREURS:

Si jamais erreurs nodemon:
faire dans chaque service/api ou il y a l'erreur: npm install

si prblm avec react (not found) => aller dans react et : npm install

quand on clone le projet:
npm install dans authentification/api, api_gateway_back/api, react

si erreurs dans le font => le docker detecte et affichera les erreurs, donc peut être mieux de lancer le serveur react en npm start et pas le docker, regler les soucis et la lancer le docker
----------------------------

#POUR LANCER LE SERVEUR
docker-compose up
ATTENDRE que react affiche compile pour voir la page web.
Pour eteindre le serveur (OBLIGATOIRE CAR SANS CA, SI VOUS REFAITES UN docker-compose up IL PEUT Y AVOIR DES SOUCIS):
docker-compose down
----------------------------


#PORTS
port pour nodejs: 3333
port pour reactjs: 3000
port de la base de données: 8080
----------------------------



#MEMO
commandes_db=> le fichier db affiche les données dans localhost:8080, on peut le supprimer si ya des soucis, et on relance le serveur il se recreer avec la new dtb.sql





----------------------------

#DOCKER INSTALLATION:
WINDOWS:
Il peut y avoir des erreurs:
Hyper V pas activé :
-soit utiliser l'élément proposé par docker pour remplacer hyper v
-soit: l'activer dans "activer ou desactiver les fonctionnalités de windows" et cocher HyperV
SI CA NE VA TOUJOURS PAS:
    aller dans le powershell de windows en administrateur et entrer:
    bcdedit /set hypervisorlaunchtype auto
SI CA NE VA TOUJOURS PAS:
regarder sur internet avec le message d'erreur, il y a peut etre dautres commandes
IL FAUT AUSSI PEUT ETRE: activer dans le bios du pc la visualization intel (regarder sur internet)
SI VOTRE DOCKER FONCTIONNE PLUS D'UN COUP SANS RAISONS ALORS QU'IL FONCTIONNAIT: 
C'est parceque vous aviez executer un docker-compose up et vous aviez fermé l'application docker
ducoup aller dans l'application docker => supprimer le container de l'application, et refaire un docker-compose up

