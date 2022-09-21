import { store } from '@shared-ui/store';

export async function addAliasesAction(aliases) {
  await store.dispatch('addAlias', aliases);
}
