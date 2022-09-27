export type Alias = {
  prevLastName: string;
  prevFirstName: string;
  prevMiddleName: string;
  cityWhereChanged: string;
  stateWhereChanged: string;
  courtFileNumber: string;
};

export type Id = {
  idNumber: string;
  issuingState: string;
};

export type DOB = {
  DOB: string;
  birthCity: string;
  birthState: string;
  birthCountry: string;
  currentAge: 0;
};

export type Citizenship = {
  citizen: boolean;
  militaryStatus: string;
};

export type PersonalInfo = {
  lastName: string;
  firstName: string;
  middleName: string;
  noMiddleName: boolean;
  suffix: string;
  ssn: string;
  maritalStatus: string;
};

export type AddressInfo = {
  addressLine1: string;
  addressLine2: string;
  city: string;
  county: string;
  state: string;
  zip: string;
  country: string;
};

export type RadioOptions = {
  label: string;
  value: string | boolean;
};