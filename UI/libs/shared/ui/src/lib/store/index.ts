import Vue from 'vue';
import Vuex from 'vuex';
import { publicApplicationModule } from './publicApplicationModule';
import aliasModule from './modules/alias';
import applicationModule from './modules/application';
import citizenshipModule from './modules/citizenship';
import contactModule from './modules/contact';
import currentAddressModule from './modules/currentAddress';
import differentMailingModule from './modules/differentMailing';
import DOBModule from './modules/DOB';
import employmentModule from './modules/employment';
import idModule from './modules/id';
import personalInfoModule from './modules/personalInfo';
import previousAddressModule from './modules/previousAddress';
import userModule from './modules/user';
import weaponsModule from './modules/weapons';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    publicApplication: publicApplicationModule,
    alias: aliasModule,
    application: applicationModule,
    citizenship: citizenshipModule,
    contact: contactModule,
    currentAddress: currentAddressModule,
    differentMailing: differentMailingModule,
    DOB: DOBModule,
    employment: employmentModule,
    id: idModule,
    personalInfo: personalInfoModule,
    previousAddress: previousAddressModule,
    user: userModule,
    weapons: weaponsModule,
  },
});
