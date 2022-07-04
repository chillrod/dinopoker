import i18n from "i18next";

import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      home: {
        title:
          "Select your avatar, create your planningpoker room or join a existing one.",
        "type-your-name": "Type your name",
        "type-your-name-placeholder": "Example: Pepito",
        "select-gameplay-option": "Select a gameplay option",
        "create-room": "Create a room",
        "join-room": "Join a room",
      },

      components: {
        next: "Next",
        previous: "Previous",
        "change-language": "Change language",
        "languages-select": "Select a language",
        confirm: "Confirm",
        cancel: "Cancel",
        "open-menu": "Open menu",
      },

      poker: {
        poker: {
          vote: "Vote",
          "not-voted": "Not voted",
          voted: "Voted",
        },
        actions: {
          "room-action": "Actions",
          "teams-action": "Teams",
          "raise-hand": "Raise hand",
          "team-one": "Team 1",
          "team-two": "Team 2",
          "no-team": "No team",
          "reveal-votes": "Reveal votes",
          "restart-votes": "Restart votes",
          "revealing-in": "Revealing in...",
          "team-1-note": "Team 1 note",
          "team-2-note": "Team 2 note",
          "team-average": "Team average",
        },
      },
    },
  },
  pt: {
    translation: {
      home: {
        title:
          "Selecione seu avatar, crie sua sala de planningpoker ou entre em uma existente.",
        "type-your-name": "Digite seu nome",
        "type-your-name-placeholder": "Exemplo: Pepito",
        "select-gameplay-option": "Selecione uma opção de jogo",
        "create-room": "Criar uma sala",
        "join-room": "Entrar em uma sala",
      },

      components: {
        next: "Próximo",
        previous: "Anterior",
        "change-language": "Mudar idioma",
        "languages-select": "Selecione um idioma",
        confirm: "Confirmar",
        cancel: "Cancelar",
        "open-menu": "Abrir menu",
      },

      poker: {
        poker: {
          vote: "Voto",
          "not-voted": "Não votado",
          voted: "Votado",
        },
        actions: {
          "room-action": "Ações",
          "teams-action": "Times",
          "raise-hand": "Levantar a mão",
          "team-one": "Time Backend",
          "team-two": "Time Frontend",
          "no-team": "Sem time",
          "reveal-votes": "Revelar votos",
          "restart-votes": "Reiniciar votos",
          "revealing-in": "Revelando em...",
          "team-1-note": "Nota do Backend",
          "team-2-note": "Nota do Frontend",
          "team-average": "Média da equipe",
        },
      },
    },
  },
  es: {
    translation: {
      home: {
        title:
          "Seleccione su avatar, cree su sala de planningpoker o entre en una existente.",
        "type-your-name": "Escribe tu nombre",
        "type-your-name-placeholder": "Ejemplo: Pepito",
        "select-gameplay-option": "Seleccione una opción de juego",
        "create-room": "Crear una sala",
        "join-room": "Entrar en una sala",
      },

      components: {
        next: "Siguiente",
        previous: "Anterior",
        "change-language": "Cambiar idioma",
        "languages-select": "Seleccione un idioma",
        confirm: "Confirmar",
        cancel: "Cancelar",
        "open-menu": "Abrir menu",
      },

      poker: {
        poker: {
          vote: "Voto",
          "not-voted": "No votado",
          voted: "Votado",
        },
        actions: {
          "room-action": "Acciones",
          "teams-action": "Equipos",
          "raise-hand": "Levantar la mano",
          "team-one": "Equipo 1",
          "team-two": "Equipo 2",
          "no-team": "Sin equipo",
          "reveal-votes": "Revelar votos",
          "restart-votes": "Reiniciar votos",
          "revealing-in": "Revelando en...",
          "team-1-note": "Nota del Equipo 1",
          "team-2-note": "Nota del Equipo 2",
          "team-average": "Media del equipo",
        },
      },
    },
  },
  ch: {
    translation: {
      home: {
        title: "选择你的头像，创建你的计划排骨房间或加入一个现有的。",
        "type-your-name": "输入你的名字",
        "type-your-name-placeholder": "例如：Pepito",
        "select-gameplay-option": "选择一个游戏选项",
        "create-room": "创建一个房间",
        "join-room": "加入一个房间",
      },

      components: {
        next: "下一个",
        previous: "上一个",
        "change-language": "更改语言",
        "languages-select": "选择一种语言",
        confirm: "确认",
        cancel: "取消",
        "open-menu": "打开菜单",
      },

      poker: {
        poker: {
          vote: "投票",
          "not-voted": "未投票",
          voted: "已投票",
        },
        actions: {
          "room-action": "动作",
          "teams-action": "团队",
          "raise-hand": "提高手",
          "team-one": "团队1",
          "team-two": "团队2",
          "no-team": "无团队",
          "reveal-votes": "显示投票",
          "restart-votes": "重新开始投票",
          "revealing-in": "正在显示...",
          "team-1-note": "团队1笔记",
          "team-2-note": "团队2笔记",
          "team-average": "团队平均",
        },
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("i18nextLng") || "pt", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });
