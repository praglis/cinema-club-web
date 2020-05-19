export interface CinemaInterface {
  id: number;
  infoCD: string;
  infoRD: string;
  name: string;
  phoneNo: string;
  additionalPhoneNos: string;
  address: Address;
  rating: number;
  numberOfVotes: number;
}

export interface Address {
  id: number;
  country: string;
  state: string;
  city: string;
  streetName: string;
  houseNumber: string;
}
