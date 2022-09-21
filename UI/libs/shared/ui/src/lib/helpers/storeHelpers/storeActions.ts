import { store } from '@shared-ui/store';
import { Id, DOB, Citizenship, Alias, PersonalInfo } from '@shared-ui/types/defualtTypes';

/**
 * Alias Section
 */
export async function addAliasesAction(aliases: Array<Alias>) {
  await store.dispatch('addAlias', aliases);
}

/**
 *  Citizenship Section
 */
export async function addCitizenshipAction(citizenship: Citizenship) {
  await store.dispatch('addCitizenshipInfo', citizenship);
}

/**
 * DOB Section
 */
export async function addDOBAction(dob: DOB) {
  await store.dispatch('addDOB', dob);
}

/**
 * Id section
 */
export async function addIdAction(id: Id) {
  await store.dispatch('addId', id);
}

/**
 * Personal section
 */
export async function addPersonalInfoAction(personalInfo: PersonalInfo) {
  store.dispatch('addPersonalInfo', personalInfo);
}
