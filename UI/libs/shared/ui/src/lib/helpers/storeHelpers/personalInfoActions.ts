import { store } from '@shared-ui/store';

export async function addPersonalInfoAction(personalInfo) {
  store.dispatch('addPersonalInfo', personalInfo);
}
