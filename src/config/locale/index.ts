import i18n from "i18next";

import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      components: {
        "open-menu": "Open Menu",
        "close-menu": "Close Menu",
        messages: "Messages",
        "no-data": "No {{messages}}",
        "change-language": "Change Language",
        languages: "Languages",
        "save-action": "Save",
        "confirm-action": "Confirm",
        "cancel-action": "Cancel",
        "are-you-sure-you-want-to": "Are you sure you want to",
        next: "Next",
        previous: "Previous",
      },
      round: {
        "reveal-vote": "Reveal Vote",
        "restart-votes": "Restart Votes",
        "not-voted-yet": "Not voted yet",
        "voted-but-is-a-secret": "Voted but is a secret",
        "restart-action": "Restart Room",
        "leave-action": "Leave Room",
        "danger-reset-players": "Danger! Reset players",
      },
      home: {
        "select-your-avatar-and-join-or-create-a-room":
          "Select your avatar and join or create a room",
        "type-your-name": "Type your name",
        "select-gameplay-option": "Select your gameplay option",
        "create-a-room": "Create a room",
        "or-join-a-room": "Or Join a room",
      },
    },
  },
  pt: {
    translation: {
      components: {
        "open-menu": "Abrir menu",
        "close-menu": "Fechar menu",
        messages: "Mensagens",
        "no-data": "Nenhum dado {{ messages}}",
        "change-language": "Mudar idioma",
        languages: "Idiomas",
        "save-action": "Salvar",
        "confirm-action": "Confirmar",
        "cancel-action": "Cancelar",
        "are-you-sure-you-want-to": "Você tem certeza que deseja",
        next: "Próximo",
        previous: "Anterior",
      },

      round: {
        "reveal-vote": "Revelar voto",
        "restart-votes": "Reiniciar votos",
        "not-voted-yet": "Não votou ainda",
        "voted-but-is-a-secret": "Votou! Mas é um segredo",
        "restart-action": "Reiniciar sala",
        "leave-action": "Sair da sala",
        "danger-reset-players": "Perigo - Reiniciar jogadores",
      },

      home: {
        "select-your-avatar-and-join-or-create-a-room":
          "Selecione seu avatar e se junte à uma sala, ou crie",
        "type-your-name": "Digite seu nome",
        "select-gameplay-option": "Selecione sua opçao de gameplay",
        "create-a-room": "Criar uma sala",
        "or-join-a-room": "Ou entre em uma",
      },
    },
  },
  ch: {
    translation: {
      components: {
        "open-menu": "打开菜单",
        "close-menu": "关闭菜单",
        messages: "消息",
        "no-data": "没有数据显示, {{messages}}",
        "change-language": "更改语言",
        languages: "语言",
        "save-action": "保存",
        "confirm-action": "确认",
        "cancel-action": "取消",
        "are-you-sure-you-want-to": "你确定你想要",
        next: "下一个",
        previous: "上一个",
      },
      round: {
        "reveal-vote": "揭晓投票",
        "restart-votes": "重新开始投票",
        "not-voted-yet": "还没有投票",
        "voted-but-is-a-secret": " 投票！但是是一个秘密",
        "restart-action": "重新开始房间",
        "leave-action": "离开房间",
        "danger-reset-players": "危险 - 重置玩家",
      },
      home: {},
    },
  },
  es: {
    translation: {
      components: {
        "open-menu": "Abrir menu",
        "close-menu": "Cerrar menu",
        messages: "Mensajes",
        "no-data": "No hay {{messages}} ",
        "change-language": "Cambiar idioma",
        languages: "Idiomas",
        "save-action": "Guardar",
        "confirm-action": "Confirmar",
        "cancel-action": "Cancelar",
        "are-you-sure-you-want-to": "¿Estás seguro que quieres",
        next: "Siguiente",
        previous: "Anterior",
      },
      round: {
        "reveal-vote": "Revelar voto",
        "restart-votes": "Reiniciar votos",
        "not-voted-yet": "No ha votado aún",
        "voted-but-is-a-secret": "Votó! Pero es un secreto",
        "restart-action": "Reiniciar sala",
        "leave-action": "Salir de la sala",
        "danger-reset-players": "Peligro - Reiniciar jugadores",
      },
      home: {},
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    // lng: localStorage.getItem("i18nextLng") || "pt", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    lng: "pt", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });
