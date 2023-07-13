export type filterInputCreateCustomer = {
  email: string;
  password: string;
  firstName: string;

  lastName: string;
  birthDate: Date;
};

export type filterInputCreateVendor = {
  email: string;
  password: string;
  firstName: string;

  lastName: string;
  birthDate: Date;
  cniImage: string;
  image: string;
  phoneNumber: number;
};
