import { Box, Img, Text } from "@chakra-ui/react";

export const BottomLoading = () => {
    return (
        <Box position="absolute" right="0" bottom="15vh" px={4}>
            <Img src="/dino3.svg" w={10} />
            <Text>Carregando...</Text>
        </Box>
    )
}