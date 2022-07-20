import { Grid, GridItem, Heading, Tag, Text } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";


interface IDinoScrum {
  justify?: string;
  small?: boolean;
}

export const DinoScrum = ({ justify = "center", small }: IDinoScrum) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const { id } = router.query;

  return (
    <Grid justifyItems="start" gap={2} justifyContent={justify}>
      <GridItem>
        <Heading fontWeight={600} textAlign="center" size={['sm', 'lg', 'xl']}>
          {"dino"}
          <Text fontWeight={300} as="span" color="dino.primary">
            {"scrum.app"}
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
