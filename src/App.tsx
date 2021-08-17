import React, { useRef, useState, useEffect } from "react";
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
import { monospaceFontFamily } from "./constants";
import { useMemoText } from "./useMemoText";
import { useMemory } from "./useMemory";

function App() {
  const tone = useTone();
  const teletyper = useTeletyper();
  const memoText = useMemoText();
  const memory = useMemory(teletyper);
  const $sentText = useRef<HTMLParagraphElement>(null);

  const stop = () => {
    teletyper.send("");
  };

  useEffect(() => {
    if ($sentText.current == null) return;
    $sentText.current.scrollLeft = $sentText.current.scrollWidth!;
  }, [teletyper.sentText]);

  const isSending = teletyper.sendingText.length > 0;

  return (
    <Container pt={2}>
      <Stack spacing={4}>
        <Textarea
          maxLength={8000}
          placeholder="MEMO"
          resize="vertical"
          variant="flushed"
          value={memoText.text}
          sx={monospaceFontFamily}
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
            size="lg"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          {isSending ? (
            <Button w={36} colorScheme="red" size="lg" onClick={stop}>
              STOP
            </Button>
          ) : (
            <Button
              size="lg"
              w={36}
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
            />
          )}
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
              maxLength={1000}
              sx={monospaceFontFamily}
              variant="flushed"
              value={teletyper.sendingText}
              onChange={(e) => {
                teletyper.send(e.target.value);
              }}
            />
          </Box>
        </HStack>
        {memory.content.map((item, index) => {
          return (
            <InputGroup key={index}>
              <Input
                sx={monospaceFontFamily}
                pr="16"
                value={item}
                onChange={(e) => {
                  memory.update(e.target.value, index);
                }}
              />
              <InputRightElement width="16" p={1}>
                <Button
                  borderRadius="3"
                  colorScheme="blue"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    memory.send(index);
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
