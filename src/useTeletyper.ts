import { useEffect, useRef, useState } from "react"
import { MORSE_TABLE } from "./constants";
import { useLocalStorage } from "./useLocalStorage";
import { useTone } from "./useTone";

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const wpmToOneElementDuration = (wpm: number): number => {
    return 60000 / (wpm * 50)
}

const getSound = async (char: string, speed: number, isConcatChars: boolean, tone: ReturnType<typeof useTone>) => {
    const code = MORSE_TABLE[char as keyof typeof MORSE_TABLE]
    const oneElementMs = wpmToOneElementDuration(speed)

    if (code == null) {
        await sleep(oneElementMs * 3)
        return
    }

    const codeSliced = code.split('')

    for (const dashOrDot of codeSliced) {
        if (dashOrDot === '.') {
            tone.start()
            await sleep(oneElementMs)
        }
        if (dashOrDot === '-') {
            tone.start()
            await sleep(oneElementMs * 3)
        }
        tone.stop()
        await sleep(oneElementMs)
    }

    await await sleep(oneElementMs * (isConcatChars ? 0 : 2))
}

export const useTeletyper = () => {
    const storage = useLocalStorage()
    const [speed, _setSpeed] = useState(storage.getSpeed())
    const [sendingText, setTypedText] = useState('')
    const [typing, setTypingState] = useState(false)
    const [sentText, setSentText] = useState('')

    const refText = useRef('')
    const tone = useTone()

    const isConcatChars = useRef(false)

    const setSpeed = (speed: number) => {
        _setSpeed(speed)
        storage.setSpeed(speed)
    }

    const send = (newText: string) => {
        setTypedText(newText.toUpperCase())
        refText.current = newText.toUpperCase()
        if (!typing) {
            type()
        }
    }

    const addSend = (addText: string) => {
        setTypedText(oldText => oldText + ' ' + addText)
        refText.current = refText + ' ' + addText
        if (!typing) {
            type()
        }
    }

    const type = async () => {
        if (refText.current.length === 0) {
            setTypingState(false)
            setSentText(text => text + ' ')
            return
        }
        setTypingState(true)

        const sendChar = refText.current.slice(0, 1)

        switch (sendChar) {
            case '<':
                isConcatChars.current = true;
                await sleep(10)
                break;
            case '>':
                isConcatChars.current = false;
                await sleep(10)
                break;
            default:
                await getSound(sendChar, speed, isConcatChars.current, tone)
        }

        setSentText(text => text + sendChar)
        setTypedText(text => {
            const sliced = text.slice(1);
            refText.current = text.slice(1);
            return sliced
        })

        type()
    }

    return { sendingText, sentText, send, addSend, speed, setSpeed }
}