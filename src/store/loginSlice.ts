import { StateCreator } from "zustand"

export type loginSliceType = {
    authSlice: (auth: any) => Promise<void>
}


export const createLoginSlice : StateCreator<loginSliceType> = (set) =>({

    authSlice: async (user) => {
        
    }
})