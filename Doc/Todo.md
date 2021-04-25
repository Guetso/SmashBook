le 21/01/2021

- [x] mettre en place l'auth module pour tout utilisateur (nonAdmin) cf.auth.auth
- [X] Améliorer le signup dans signup.vue (optimisation de l'append avec une boucle (marche pas avec la boucle for in,pkoi ?) voir créer un helper)
- [X] Voir le problème de non sensibilité à la case lors du login
- [X] Possibilité d'effacer l'avatar sans le remplacer
- [] API - Supprimer l'image du serveur quand elle est manuellement supprimée par le joueur (actuellement elle ne se supprime que lorsque le joueur la remplace par une autre)
- [] Rendre l'avatar joueur sous forme de composant avec props pour la taille
- [X] Créer un store pour les perso
- [] Décomposer SetParticipant.vue ?
- [] Trop de ressources pour afficher les images du characterListDialog

POUR REMETTRE L'AUTH SUR /home :
 - Décommenter nuxt.config.js.router.middelware
 - Décommenter index.vue.isAdmin
 - Virer le lien 'GO' sur home.vue