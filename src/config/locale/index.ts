import i18n from "i18next";

import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      home: {
        "to-start": "To start",
        "choose-color-mood": "Choose color mood",
        "room-configuration": "Room configuration",
        name: "Name",
        "or-join-a-room": "Or join a room",
        "room-name": "Room name",
        "create-room": "Create room",
      },
    },
  },
  pt: {
    translation: {
      home: {
        "to-start": "Para começar",
        "choose-color-mood": "Escolha o estilo de cor",
        "room-configuration": "Configuração da sala",
        name: "Nome",
        "or-join-a-room": "Ou entre em uma sala",
        "room-name": "Nome da sala",
        "create-room": "Criar sala",
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });
