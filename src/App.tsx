import React, { useRef, useState } from 'react'
import './global.css'
import { Container, Stack, Text, HStack, Input, Box, Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useTone } from './useTone'
import { useTeletyper } from './useTeletyper'
import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

function App() {
  const tone = useTone()
  const teletyper = useTeletyper()
  const storage = useLocalStorage()
  const $sentText = useRef<HTMLParagraphElement>(null)

  const [memory, setMemory] = useState(storage.getMemory())

  const updateMemory = (value: string, index: number) => {
    setMemory(oldMemory => {
      const newMemory = oldMemory.slice(0);
      newMemory[index] = value.toUpperCase();

      storage.setMemory(newMemory)
      return newMemory
    })
  }

  const sendMemory = (index: number) => {
    const text = memory[index]
    if (teletyper.typedText.length > 0) {
      teletyper.onTypedTextChange(teletyper.typedText + ' ' + text)
      return
    }

    teletyper.onTypedTextChange(text)
  }

  const stop = () => {
    teletyper.onTypedTextChange('')
  }

  useEffect(() => {
    if($sentText.current == null) return
    $sentText.current.scrollLeft = $sentText.current?.scrollWidth!
  }, [teletyper.sentText])

  return (
    <Container pt={4}>
      <Stack spacing={4}>
        <Button
          size="lg"
          colorScheme="blue"
          onMouseDown={() => { tone.start() }}
          onMouseUp={() => { tone.stop() }}
          onMouseLeave={() => { tone.stop() }}
          onTouchStart={() => { tone.start() }}
          onTouchEnd={() => { tone.stop() }}
          onTouchCancel={() => { tone.stop() }}
        >
        </Button>
        <HStack>
          <Box w={8}>
            <Text fontSize="xl">{teletyper.speed}</Text><Text fontSize="xs" color="gray">WPM</Text>
          </Box>
          <Slider
            value={teletyper.speed}
            onChange={(value) => { teletyper.setSpeed(value) }}
            max={40}
            min={5}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Button colorScheme="red" onClick={stop}>STOP</Button>
        </HStack>
        <HStack spacing={0}>
          <Box w="40%">
            <Text ref={$sentText} color="gray" align="right" sx={{
              whiteSpace: 'nowrap',
              overflow: 'scroll',
              fontFamily: '"Menlo", "Courier", monospace',
              '&::-webkit-scrollbar': {
                display: 'none'
              }
            }}>{teletyper.sentText}</Text>
          </Box>
          <Box w="60%">
            <Input
              sx={{ fontFamily: '"Menlo", "Courier", monospace'}}
              variant="flushed"
              value={teletyper.typedText}
              onChange={(e) => { teletyper.onTypedTextChange(e.target.value) }} />
          </Box>
        </HStack>
        {memory.map((item, index) => {
          return (
            <InputGroup key={index}>

              <Input sx={{ fontFamily: '"Menlo", "Courier", monospace' }} pr="16" value={item} onChange={(e) => { updateMemory(e.target.value, index) }} />
              <InputRightElement width="16" p={1}>
                <Button colorScheme="blue" size="sm" variant="outline" onClick={() => { sendMemory(index) }}>SEND</Button>
              </InputRightElement>
            </InputGroup>)
        })}
      </Stack>
    </Container>
  )
}

export default App
