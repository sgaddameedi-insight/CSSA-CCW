import { store } from '@shared-ui/store';
import { Id } from '@shared-ui/types/defualtTypes';

export async function addIdAction(id: Id) {
  await store.dispatch('addId', id);
}
