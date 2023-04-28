import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";

interface UIState {
    feedsDialog: boolean;
    profileDialog: boolean;
    settingsDialog: boolean;
}

const initialState: UIState = {
    feedsDialog: false,
    profileDialog: false,
    settingsDialog: false,
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        showDialog: (state, action: PayloadAction<string>) => {
            // Hide all the other dialogs.
            for (const dialog in state) {
                if (dialog !== action.payload) state[dialog as keyof UIState] = false;
            }
            // Show the requested one.
            state[action.payload as keyof UIState] = true;
        },
        hideDialog: (state, action: PayloadAction<string>) => {
            state[action.payload as keyof UIState] = false;
        },
        hideAllDialogs: (state) => {
            for (const dialog in state) {
                state[dialog as keyof UIState] = false;
            }
        }
    },
})

export const { showDialog, hideDialog, hideAllDialogs } = uiSlice.actions;

export const selectFeedsDialog = (state: RootState) => state.ui.feedsDialog;
export const selectProfileDialog = (state: RootState) => state.ui.profileDialog;
export const settingsDialog = (state: RootState) => state.ui.settingsDialog;

export default uiSlice.reducer;