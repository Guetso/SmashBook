le 21/01/2021

- [x] mettre en place l'auth module pour tout utilisateur (nonAdmin) cf.auth.auth
- [X] Améliorer le signup dans signup.vue (optimisation de l'append avec une boucle (marche pas avec la boucle for in,pkoi ?) voir créer un helper)
- [X] Voir le problème de non sensibilité à la case lors du login

POUR REMETTRE L'AUTH SUR /home :
 - Décommenter nuxt.config.js.router.middelware
 - Décommenter index.vue.isAdmin
 - Virer le lien 'GO' sur home.vue