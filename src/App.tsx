import React, { useRef, useState } from "react";
import "./global.css";
import {
  Container,
  Stack,
  Text,
  HStack,
  Input,
  Textarea,
  Box,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useTone } from "./useTone";
import { useTeletyper } from "./useTeletyper";
import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { monospaceFontFamily } from "./constants";
import { useMemoText } from "./useMemoText";

function App() {
  const tone = useTone();
  const teletyper = useTeletyper();
  const storage = useLocalStorage();
  const memoText = useMemoText();
  const $sentText = useRef<HTMLParagraphElement>(null);

  const [memory, setMemory] = useState(storage.getMemory());

  const updateMemory = (value: string, index: number) => {
    setMemory((oldMemory) => {
      const newMemory = oldMemory.slice(0);
      newMemory[index] = value.toUpperCase();

      storage.setMemory(newMemory);
      return newMemory;
    });
  };

  const sendMemory = (index: number) => {
    const text = memory[index];
    if (teletyper.sendingText.length > 0) {
      teletyper.addSend(text);
      return;
    }

    teletyper.send(text);
  };

  const stop = () => {
    teletyper.send("");
  };

  useEffect(() => {
    if ($sentText.current == null) return;
    $sentText.current.scrollLeft = $sentText.current?.scrollWidth!;
  }, [teletyper.sentText]);

  return (
    <Container pt={2}>
      <Stack spacing={4}>
        <Textarea
          placeholder="MEMO"
          size="xs"
          resize="vertical"
          variant="flushed"
          value={memoText.text}
          onChange={(e) => memoText.setText(e.target.value)}
        />
        <HStack spacing={4}>
          <Box w={8}>
            <Text fontSize="xl" align="center">
              {teletyper.speed}
            </Text>
            <Text fontSize="xs" color="gray">
              WPM
            </Text>
          </Box>
          <Slider
            value={teletyper.speed}
            onChange={(value) => {
              teletyper.setSpeed(value);
            }}
            max={40}
            min={5}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Button
            w={24}
            colorScheme="blue"
            onMouseDown={() => {
              tone.start();
            }}
            onMouseUp={() => {
              tone.stop();
            }}
            onMouseLeave={() => {
              tone.stop();
            }}
            onTouchStart={() => {
              tone.start();
            }}
            onTouchEnd={() => {
              tone.stop();
            }}
            onTouchCancel={() => {
              tone.stop();
            }}
          ></Button>
          <Button w={24} colorScheme="red" onClick={stop}>
            STOP
          </Button>
        </HStack>
        <HStack spacing={0}>
          <Box w="50%">
            <Text
              ref={$sentText}
              color="gray"
              align="right"
              sx={{
                opacity: 0.5,
                marginBottom: "1px",
                whiteSpace: "nowrap",
                overflow: "scroll",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                ...monospaceFontFamily,
              }}
            >
              {teletyper.sentText}
            </Text>
          </Box>
          <Box w="50%">
            <Input
              sx={monospaceFontFamily}
              variant="flushed"
              value={teletyper.sendingText}
              onChange={(e) => {
                teletyper.send(e.target.value);
              }}
            />
          </Box>
        </HStack>
        {memory.map((item, index) => {
          return (
            <InputGroup key={index}>
              <Input
                sx={monospaceFontFamily}
                pr="16"
                value={item}
                onChange={(e) => {
                  updateMemory(e.target.value, index);
                }}
              />
              <InputRightElement width="16" p={1}>
                <Button
                  borderRadius="3"
                  colorScheme="blue"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    sendMemory(index);
                  }}
                >
                  SEND
                </Button>
              </InputRightElement>
            </InputGroup>
          );
        })}
      </Stack>
    </Container>
  );
}

export default App;
