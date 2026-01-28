export type AdminUserInfo = {
  fullName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postCode: number;
  country: string;
  phone: number;
  fax: number;
  email: string;
};

export type BioUserInfo = {
  name: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: number;
  country: string;
  phoneNumber: number;
};

export type PatientUserInfo = {
patientId: string;
lastName: string;
firstName: string;
initial: string;
ICD9_ID: string;
ICD9_SubID: string;
YearDx: string;
address1: string;
address2: string;
city: string;
state: string;
postCode: number;
country: string;
phone: number;
birthDate: Date | null;
sex: string;
bloodType: string;
information: string;
};

export type DoctorUserInfo = {
clientAcct: number;
creditHold: string;
eLyte: string;
dateFirstEntered: string;
lastName: string;
practitioner: string;
type: string;
companyPractice: string;
address1: string;
address2: string;
city: string;
state: string;
postCode: number;
country: string;
phone: number;
fax: number;
email: string;
memo: string;
creditCard: string;
expDate: Date | string;
cvv: number;
terms: string;
priceCode: string;
};