import { Address } from './address.interface';

export interface User {
  id: number;
  username: string;
  enrolmentDate: Date;
  points: number;

  name: string;
  surname: string;
  birthday: Date;
  email: string;
  phoneNo: string;
  address: Address;
}
