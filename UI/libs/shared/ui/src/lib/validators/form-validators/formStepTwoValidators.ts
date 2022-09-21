import { Citizenship, DOB, Id } from '@shared-ui/types/defualtTypes';
type checkerObject = {
  id: Id;
  dob: DOB;
  citizenship: Citizenship;
};

export function validateForm(formData: checkerObject) {
  const errors: Array<string> = [];
  if (!formData.id.idNumber) {
    errors.push('Id number');
  }

  if (!formData.id.issuingState) {
    errors.push('Issuing State');
  }

  if (!formData.dob.DOB) {
    errors.push('Date of birth');
  }

  if (!formData.dob.birthCity) {
    errors.push('Birth city');
  }

  if (!formData.dob.birthState) {
    errors.push('Birth state');
  }

  if (!formData.dob.birthCountry) {
    errors.push('Birth country');
  }
  // This needs to be an exact match due to if nothing is selected it could still come over as a falsy value
  if (formData.citizenship.citizen !== true && formData.citizenship.citizen !== false) {
    errors.push('Citizen');
  }

  if (!formData.citizenship.militaryStatus) {
    errors.push('Military Status');
  }
  return errors;
}
