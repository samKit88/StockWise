import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { InventoryType } from '../../../types/Inventory.types'
// import { IWorkspaceResponse } from "@/types/Workspace.type";
// import { InventoryResponse } from "../../types/inventoryTypes";
// import { InventoryType } from '../../types/Inventory.types'

export interface InventoryState {
  inventory?: InventoryType[] | null
  //   selectedInventory?: InventoryType | null;
  selectedInventory?: InventoryType | null
}

const initialState: InventoryState = {
  inventory: null,
  //   selectedWorkspace: null,
  selectedInventory: null,
}

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setInventory: (state, action: PayloadAction<InventoryType[]>) => {
      state.inventory = action.payload
    },
    // setSelectedWorkspace: (
    //   state,
    //   action: PayloadAction<IWorkspaceResponse>,
    // ) => {
    //   state.selectedWorkspace = action.payload;
    // },
    setSingleInventory: (state, action: PayloadAction<InventoryType>) => {
      state.selectedInventory = action.payload
    },
  },
})

export const { setInventory } = inventorySlice.actions

export default inventorySlice.reducer
