import { store } from '@shared-ui/store';
import { Citizenship } from '@shared-ui/types/defualtTypes';

export async function addCitizenshipAction(citizenship: Citizenship) {
  await store.dispatch('addCitizenshipInfo', citizenship);
}
