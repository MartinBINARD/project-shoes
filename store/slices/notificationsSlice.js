import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seenNotificationsIds: []
};

export const notificationsSlice = createSlice({
  name: "nofications",
  initialState,
  reducers: {
    addSeenNotifications: (state, action) => {
      state.seenNotificationsIds = [...state.seenNotificationsIds, action.payload];
    }
  }
});

export const { addSeenNotifications } = notificationsSlice.actions
export default notificationsSlice.reducer;