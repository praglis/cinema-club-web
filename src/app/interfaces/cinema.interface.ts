import {Address} from "./address.interface";

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
