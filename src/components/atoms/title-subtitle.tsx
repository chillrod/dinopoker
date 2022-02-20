import { Text } from "@chakra-ui/react";

interface ITitleSubtitle {
  title: string;
  subtitle: string;
}

export const TitleSubtitle = ({ title, subtitle }: ITitleSubtitle) => {
  return (
    <>
      <Text fontSize="sm">{title}</Text>
      <Text fontSize="lg" fontWeight="semibold">
        {subtitle}
      </Text>
    </>
  );
};
