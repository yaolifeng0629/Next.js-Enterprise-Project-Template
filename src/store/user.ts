import { produce } from 'immer';
import { create } from 'zustand';

interface UserInfo {
    name: string;
    age: number;
}

interface UserState {
    userInfo: UserInfo;
    token: string;
    updateUserInfo: (parmas: UserInfo) => void;
    updateAge: (params: number) => void;
    updateToken: (params: string) => void;
}

const useUserStore = create<UserState>((set) => ({
    userInfo: {
        name: 'zhangsan',
        age: 23
    },
    token: 'S1',
    updateUserInfo: (userInfo) => set({ userInfo }),
    updateAge: (age) =>
        set(
            produce((state) => {
                state.userInfo.age = age;
            })
        ),
    updateToken: (token) => set({ token })
}));

export default useUserStore;
