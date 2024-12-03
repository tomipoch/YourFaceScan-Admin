import { create } from 'zustand' //Funcion que permite crear el state
import { devtools } from 'zustand/middleware'
import { createLoginSlice, loginType } from './loginSlice'

export const useAppStore = create<loginType>(devtools((...a) => ({
    ...createLoginSlice(...a),
})))