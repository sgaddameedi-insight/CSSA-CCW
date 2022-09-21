import { PersonalInfo } from '@shared-ui/types/defualtTypes';

type CheckerObject = {
  personalInfo: PersonalInfo;
  ssnConfirm: string;
};

export function validateFormStepOne(formData: CheckerObject) {
  const errors: Array<string> = [];
  if (!formData.personalInfo.lastName) {
    errors.push('Last name');
  }

  if (!formData.personalInfo.firstName) {
    errors.push('First name');
  }

  if (!formData.personalInfo.middleName && !formData.personalInfo.noMiddleName) {
    errors.push('Middle name');
  }

  if (!formData.personalInfo.ssn) {
    errors.push('Social Security number');
  }

  if (formData.personalInfo.ssn !== formData.ssnConfirm) {
    errors.push(' Social Security numbers do not match');
  }

  if (!formData.personalInfo.maritalStatus) {
    errors.push('Marital status');
  }
  return errors;
}
