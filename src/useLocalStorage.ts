type Config = {
    speed: number;
    memory: string[]
}

const KEY = 'config'

export const useLocalStorage = () => {
    const _get = (): Config => {
        const saved = localStorage.getItem(KEY)
        if (saved) {
            return JSON.parse(saved) as Config
        }
        return {
            speed: 15,
            memory: ['R UR 599 <BK>', 'TU <VA> E E', '', '', '', '', '', '', '', '']
        }
    }

    const _set = (config: Config) => {
        localStorage.setItem(KEY, JSON.stringify(config))
    }


    const setSpeed = (speed: number) => {
        _set({ ..._get(), speed })
    }

    const setMemory = (memory: string[]) => {
        _set({ ..._get(), memory })
    }

    const getSpeed = (): number => {
        return _get().speed
    }

    const getMemory = (): string[] => {
        return _get().memory
    }

    return { setMemory, setSpeed, getMemory, getSpeed }
}