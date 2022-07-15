import {
  Stat as StatComponent,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

export const Stat = ({
  label,
  data,
  dataType,
  dataUnit,
}: {
  label: string;
  data: number | string;
  dataType?: "increase" | "decrease";
  dataUnit?: string;
}) => {
  return (
    <StatComponent>
      <StatLabel>{label}</StatLabel>
      <StatNumber>{data}</StatNumber>
      {dataType && (
        <StatHelpText>
          <StatArrow type={dataType} />
          {dataUnit}
        </StatHelpText>
      )}
    </StatComponent>
  );
};
