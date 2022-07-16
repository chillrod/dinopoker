import { Flex, Grid, GridItem, Heading, Tag } from "@chakra-ui/react";
import { CornerDownRight } from "react-feather";

export const HeadText = ({
  head,
  tags = [],
}: {
  head: string;
  tags?: string[];
}) => {
  return (
    <Grid gap={3}>
      <GridItem alignSelf="center">
        <Flex alignItems="center">
          <CornerDownRight size={18}/>
          <Heading ml={2} fontSize="lg" fontWeight={600}>
            {head}
          </Heading>
        </Flex>
      </GridItem>
      {tags.map((tag, id) => (
        <GridItem key={id}>
          <Tag>{tag}</Tag>
        </GridItem>
      ))}
    </Grid>
  );
};
