type Config = {
    speed: number;
    memory: string[];
    memoText: string;
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
            memory: ['R UR 599 <BK>', 'TU <VA> E E', '', '', '', '', '', '', '', ''],
            memoText: ''
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

    const setMemoText = (memoText: string) => {
        _set({ ..._get(), memoText })
    }

    const getSpeed = (): number => {
        return _get().speed
    }

    const getMemory = (): string[] => {
        return _get().memory
    }

    const getMemoText = (): string => {
        return _get().memoText
    }

    return { setMemory, setSpeed, setMemoText, getMemory, getSpeed, getMemoText }
}