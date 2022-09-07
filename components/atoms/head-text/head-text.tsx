import { Flex, Grid, GridItem, Heading, Stack, Tag } from "@chakra-ui/react";
import { CornerDownRight } from "react-feather";

export const HeadText = ({
  head,
  tags = [],
}: {
  head: string;
  tags?: string[];
}) => {
  return (
    <Stack spacing={3}>
      <Flex alignItems="center">
        <CornerDownRight size={18} />
        <Heading ml={2} fontSize={['lg', 'lg', 'xl', '2xl']} fontWeight={600}>
          {head}
        </Heading>
      </Flex>
      {tags.map((tag, id) => (
        <GridItem key={id}>
          <Tag
            fontSize={['lg', 'lg', 'lg', 'lg']}
          >{tag}</Tag>
        </GridItem>
      ))}
    </Stack>
  );
};
