import { Box, FormControl, Heading, List, Stack, Text } from "@chakra-ui/react";
import { Input } from "../../atoms/input/input";
import { Button } from "../../atoms/button/button";
import { useState } from "react";
import { ToastProvider } from "../../../services/toast-provider";
import { emitter } from "../../../services/emitter/emitter";
import { IconButton } from "../../atoms/icon-button/icon-button";
import { Delete, Trash } from "react-feather";

export const WheelOrganize = () => {
  const [wheelMembers, setWheelMembers] = useState<string[]>([]);
  const [wheelMemberValue, setWheelMemberValue] = useState<string>("");

  const shareWheel = (members: string[]) => {
    if (members.length <= 0) {
      emitter.emit("EMIT_TOAST", {
        message: "Please add a team member",
        state: "error",
      });

      return;
    }

    const url = `${window.location.origin}/wheel?members=${members.join(",")}`;

    navigator.clipboard.writeText(url);

    emitter.emit("EMIT_TOAST", {
      message: "Link copied to clipboard",
      state: "success",
    });

    // const randomIndex = Math.floor(Math.random() * members.length);
    // const randomMember = members[randomIndex];

    // emitter.emit("EMIT_TOAST", {
    //   message: `The team member to organize the standup meeting is: ${randomMember}`,
    //   state: "success",
    // });
  };

  const addWheelMembers = (member: string) => {
    if (!member.length) {
      emitter.emit("EMIT_TOAST", {
        message: "Please add a team member",
        state: "error",
      });

      return;
    }

    if (wheelMembers.includes(member)) {
      emitter.emit("EMIT_TOAST", {
        message: "This team member is already added",
        state: "error",
      });

      return;
    }

    setWheelMembers([...wheelMembers, member]);
  };

  return (
    <Stack spacing={6}>
      <Heading>Start adding the team members below</Heading>
      <FormControl isInvalid={wheelMemberValue.length <= 0}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Input
            value={wheelMemberValue}
            placeholder="Add team member"
            onChange={(event) => setWheelMemberValue(event.target.value)}
          />
          <Button onClick={() => addWheelMembers(wheelMemberValue)}>Add</Button>
        </Stack>
      </FormControl>
      {wheelMembers.length > 0 && (
        <>
          <Box>
            <Stack spacing={2}>
              <Text color="dino.primary" fontSize="2xl" fontWeight="bold">
                Team members added: {wheelMembers.length}
              </Text>
              {wheelMembers.map((member, index) => (
                <Box
                  key={index}
                  bg="dino.secondary"
                  borderRadius="md"
                  p={4}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text noOfLines={1}>{member}</Text>
                  <IconButton
                    icon={<Trash />}
                    ariaLabel="Delete member"
                    onClick={() =>
                      setWheelMembers(wheelMembers.filter((m) => m !== member))
                    }
                  />
                </Box>
              ))}
            </Stack>
          </Box>
          <Button onClick={() => shareWheel(wheelMembers)}>Share</Button>
        </>
      )}
    </Stack>
  );
};
