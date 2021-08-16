import { useEffect, useState } from "react"
import { useLocalStorage } from "./useLocalStorage"

export const useMemoText = () => {
    const [text, _setText] = useState('')
    const storage = useLocalStorage()

    useEffect(() => {
        _setText(storage.getMemoText())
    }, [])

    const setText = (text: string) => {
        const upprered = text.toUpperCase()
        _setText(upprered)
        storage.setMemoText(upprered)
    }


    return { setText, text }
}