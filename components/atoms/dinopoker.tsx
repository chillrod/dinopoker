import { Flex, Grid, GridItem, Heading, Tag, Text } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

import dino from "../../dino.json";

interface IDinoPoker {
  justify?: string;
  small?: boolean;
}

export const DinoPoker = ({ justify = "center", small }: IDinoPoker) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const { id } = router.query;

  return (
    <Grid justifyItems="start" gap={2} justifyContent={justify}>
      <GridItem>
        <Heading
          as={!small ? "h1" : "h2"}
          fontWeight={600}
          textAlign="center"
          size={small ? "md" : "lg"}
        >
          dino
          <Text fontWeight={300} as="span" color="dino.primary">
            planning.app
          </Text>
        </Heading>
      </GridItem>

      {id && (
        <GridItem>
          <Tag fontWeight={600} as="span" colorScheme="purple">
            {t("home.playing-planning-poker")}
          </Tag>
        </GridItem>
      )}
    </Grid>
  );
};
