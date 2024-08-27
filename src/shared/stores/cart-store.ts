import { create } from 'zustand';


interface AddressActions {
}

interface AddressStates {
}

interface AddressStore extends AddressStates, AddressActions {}

const initialStates: AddressStates = {
  selectedAddress: null,

};

export const addressStore = create<AddressStore>((set, get) => ({
  ...initialStates,
  resetStates: () => set(initialStates),
}));
