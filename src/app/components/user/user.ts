export class User {
  id: number;
  firstName: string;
  phoneNo: number;
  email: string;
  constructor(id: number, firstName: string, phoneNo: number, email: string) {
    this.id = id;
    this.firstName = firstName;
    this.phoneNo = phoneNo;
    this.email = email;
  }
}
