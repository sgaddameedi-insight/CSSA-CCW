import { store } from '@shared-ui/store';
import { DOB } from '@shared-ui/types/defualtTypes';

export async function addDOBAction(dob: DOB) {
  await store.dispatch('addDOB', dob);
}
