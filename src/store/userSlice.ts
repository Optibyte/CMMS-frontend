import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoleWithPermissions {
    id: number;
    name: string;
    code: string;
}

interface UserState {
    id: string | null;
    username: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    mobileNumber: string | null;
    role: RoleWithPermissions | null;
    permissions: string[] | null;
    createdAt: string | null;
    updatedAt: string | null;
    isDeleted: boolean;
    accessToken: string | null;
}

const initialState: UserState = {
    id: null,
    username: null,
    email: null,
    firstName: null,
    lastName: null,
    mobileNumber: null,
    role: null,
    permissions: null,
    createdAt: null,
    updatedAt: null,
    isDeleted: false,
    accessToken: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            return { ...state, ...action.payload };
        },
        clearUser: () => initialState,
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
