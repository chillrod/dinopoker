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
  Text
} from "@chakra-ui/react";

import languages from "../../../config/locale/languages";

import { Button } from "../../atoms/button/button";
import { IconButton } from "../../atoms/icon-button/icon-button";
import { Select } from "../../atoms/select/select";

import useTranslation from "next-translate/useTranslation";

import Link from "next/link";
import { Globe } from "react-feather";

export const MenuChangeLanguage = () => {
  const { t, lang } = useTranslation("common");

  const [currentLanguage, setCurrentLanguage] = useState(lang);

  const handleChangei18Language = (
    language: ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrentLanguage(language.target.value);
  };

  return (
    <Popover isLazy>
      <PopoverTrigger>
        <span>
          <IconButton
            bg="dino.primary"
            color="dino.base4"
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
                <FormLabel>{t("components.languages-select")}</FormLabel>
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
            <Link href="/" locale={currentLanguage} key={currentLanguage}>
              <Button bg="dino.primary">{t("components.confirm")}</Button>
            </Link>
          </Grid>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
