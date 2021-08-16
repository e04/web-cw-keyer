import { useCallback, useEffect } from "react"
import * as Tone from 'tone'
import { useRef } from 'react'

Tone.context.lookAhead = 0
export const useTone = () => {
    const ampEnv = useRef<Tone.AmplitudeEnvelope | null>(null)
    const osc = useRef<Tone.Oscillator | null>(null)

    useEffect(() => {
        ampEnv.current = new Tone.AmplitudeEnvelope({
            attack: 0.002,
            decay: 0,
            sustain: 0,
            release: 0.02
        }).toDestination();
        osc.current = new Tone.Oscillator(800, "sine").connect(ampEnv.current)
        return () => {
            ampEnv.current?.dispose()
            osc.current?.dispose()
        }
    }, [])

    const start = useCallback(() => {
        osc.current?.start()
        ampEnv.current?.triggerAttack()
    }, [])

    const stop = useCallback(() => {
        ampEnv.current?.triggerRelease()
    }, [])

    return { start, stop }
}