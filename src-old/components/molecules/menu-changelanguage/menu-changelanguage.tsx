import { ChangeEvent, useState } from "react";

import {
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";

import languages from "../../../config/locale/languages";

import { Button } from "../../atoms/button/button";
import { IconButton } from "../../atoms/icon-button/icon-button";
import { Select } from "../../atoms/select/select";

import i18n from "i18next";
import { useTranslation } from "react-i18next";

import { Globe } from "react-feather";

export const MenuChangeLanguage = () => {
  const { t } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const handleChangei18Language = (
    language: ChangeEvent<HTMLSelectElement>
  ) => {
    localStorage.setItem("i18nextLng", language.target.value);

    setCurrentLanguage(language.target.value);
  };

  const handleChangeLanguage = () => {
    i18n.changeLanguage(currentLanguage);
  };

  return (
    <Popover isLazy>
      <PopoverTrigger>
        <span>
          <IconButton
            color="dino.base1"
            icon={<Globe />}
            ariaLabel={t("components.change-language")}
          ></IconButton>
        </span>
      </PopoverTrigger>
      <PopoverContent
        maxW="15em"
        p={2}
        bg="dino.base4"
        borderRadius="md"
        outline="none"
        border="none"
      >
        <PopoverHeader border="none">
          <Grid alignItems="center">
            <Text color="dino.text" fontWeight={600}>
              {t("components.change-language")}
            </Text>
            <PopoverCloseButton
              bg="dino.base2"
              borderRadius="full"
              color="dino.text"
            />
          </Grid>
        </PopoverHeader>
        <PopoverBody>
          <FormControl>
            <Grid gap={3}>
              <GridItem>
                <FormLabel>{t("components.languages")}</FormLabel>
                <Select
                  selected={currentLanguage}
                  onChange={(event) => handleChangei18Language(event)}
                  options={languages}
                />
              </GridItem>
            </Grid>
          </FormControl>
        </PopoverBody>
        <PopoverFooter border="none">
          <Grid width="100%">
            <Button onClick={() => handleChangeLanguage()} action="confirm">
              {t("components.save-action")}
            </Button>
          </Grid>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
