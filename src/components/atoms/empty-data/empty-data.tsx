import { Box, Text } from "@chakra-ui/react";
import { BaseBox } from "../base-box/base-box";

interface IEmptyData {
  data: string;
}
export const EmptyData = ({ data }: IEmptyData) => {
  return (
    <BaseBox>
      <Box p={3}>
        <Text textAlign="center">🤔</Text>
        <Text textAlign="center">No {data} to display</Text>
      </Box>
    </BaseBox>
  );
};
