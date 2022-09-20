import { store } from '@shared-ui/store';

export async function addAliasesAction(aliases) {
  store.dispatch('addAlias', aliases);
}
