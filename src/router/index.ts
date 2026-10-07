import { createRouter, createWebHistory } from "@ionic/vue-router";

import IdentificacaoPage from "../views/IdentificacaoPage.vue";

import TabsPage from "../views/TabsPage.vue";
import HomePage from "../views/HomePage.vue";
import PartidasPage from "../views/PartidasPage.vue";
import SalaPage from "../views/SalaPage.vue";
import PartidaPage from "../views/PartidaPage.vue";
import HistoricoPage from "../views/HistoricoPage.vue";
import DetalhesPartidaPage from "../views/DetalhesPartidaPage.vue";

import ResultadoPage from "../views/ResultadoPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    /*
     * ROTA INICIAL
     */
    {
      path: "/",
      redirect: "/identificacao",
    },

    /*
     * IDENTIFICAÇÃO
     *
     * Essa página acontece antes das abas.
     */
    {
      path: "/identificacao",
      component: IdentificacaoPage,
    },

    /*
     * TABS PRINCIPAIS
     */
    {
      path: "/tabs",
      component: TabsPage,

      children: [
        /*
         * Quando entrar em /tabs,
         * vai para a aba inicial.
         */
        {
          path: "",
          redirect: "/tabs/home",
        },

        /*
         * ==========================
         * ABA INÍCIO
         * ==========================
         */
        {
          path: "home",
          component: HomePage,
        },

        /*
         * ==========================
         * ABA PARTIDAS
         * ==========================
         */
        {
          path: "partidas",
          component: PartidasPage,
        },

        /*
         * SALA
         *
         * Continua dentro da aba Partidas.
         */
        {
          path: "partidas/sala",
          component: SalaPage,
        },

        /*
         * PARTIDA EM ANDAMENTO
         *
         * Continua dentro da aba Partidas.
         */
        {
          path: "partidas/partida",
          component: PartidaPage,
        },

        /*
         * ==========================
         * ABA HISTÓRICO
         * ==========================
         */
        {
          path: "historico",
          component: HistoricoPage,
        },

        /*
         * DETALHES DA PARTIDA
         *
         * Continua dentro da aba Histórico.
         */
        {
          path: "historico/:id",
          component: DetalhesPartidaPage,
        },
      ],
    },

    /*
     * RESULTADO
     *
     * Fica fora das abas.
     */
    {
      path: "/resultado",
      component: ResultadoPage,
    },
  ],
});

export default router;