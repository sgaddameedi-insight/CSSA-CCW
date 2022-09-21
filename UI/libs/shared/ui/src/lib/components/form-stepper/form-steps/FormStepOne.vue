<template>
  <div>
    <v-form>
      <v-sub-header class="sub-header font-weight-bold"> Personal Information </v-sub-header>
      <v-row class="ml-5">
        <v-col cols="6" md="5" sm="3">
          <v-text-field
            v-model="personalInfo.lastName"
            label="Last name"
            :rules="[v => !!v || 'Last name is required']"
            required
          />
        </v-col>

        <v-col cols="6" md="5" sm="3">
          <v-text-field
            v-model="personalInfo.firstName"
            label="First name"
            :rules="[v => !!v || 'First name is required']"
            required
          />
        </v-col>

        <v-col cols="6" md="5" sm="3">
          <v-text-field
            v-model="personalInfo.middleName"
            label="Middle name"
            :rules="[
              v => (!!v && !personalInfo.noMiddleName) || 'Middle name is required or you must select no middle name',
            ]"
            required
          />
        </v-col>

        <v-col cols="6" md="5" sm="3">
          <v-text-field v-model="personalInfo.suffix" label="suffix" />
        </v-col>

        <v-col cols="6" md="5">
          <v-checkbox class="ml-3" v-model="personalInfo.noMiddleName" :label="'No middle name'" />
        </v-col>
      </v-row>
      <v-divider class="my-3" />

      <v-sub-header class="sub-header font-weight-bold"> Social Security Information </v-sub-header>

      <v-row class="ml-5">
        <v-col cols="7" md="5" m="3">
          <v-text-field v-model="personalInfo.ssn" label="SSN" :rules="[v => !!v || 'SSN is required']" required />
        </v-col>

        <v-col cols="7" md="5" sm="3">
          <v-text-field v-model="ssnConfirm" label="Confirm SSN" :rules="ssnConfirmError" required />
        </v-col>
      </v-row>

      <v-divider class="my-3" />
      <v-row class="ml-1">
        <v-sub-header class="sub-header font-weight-bold"> Marital status </v-sub-header>
        <v-col cols="16" md="5" sm="3">
          <v-radio-group class="ml-3 mt-0" row v-model="personalInfo.maritalStatus">
            <v-radio class="pb-1" label="Married" value="married" />
            <v-radio class="pb-1" label="Single" value="single" />
          </v-radio-group>
        </v-col>
      </v-row>
    </v-form>

    <v-divider />
    <v-sub-header class="sub-header font-weight-bold"> Aliases </v-sub-header>
    <div class="alias-components-container">
      <AliasTable :aliases="aliases" />
      <AliasDialog :save-alias="getAliasFromDialog" />
    </div>
    <div class="form-btn-container">
      <v-btn color="secondary mr-2" @click="handleSubmit"> Continue </v-btn>
      <!-- TODO: this needs to save to save the current state to local storage or call the api to save in
      the db
       -->
      <v-btn color="info mr-2"> Save and Exit </v-btn>
      <!-- TODO: Make this return to the home page with out saving the form at all -->
      <v-btn color="error mr-2"> Cancel </v-btn>
    </div>
    <FormErrorAlert v-if="errors.length > 0" :errors="errors" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import AliasDialog from '../../dialogs/AliasDialog';
import AliasTable from '../../tables/AliasTable';
import FormErrorAlert from '@shared-ui/components/alerts/FormErrorAlert.vue';
import { addPersonalInfoAction } from '@shared-ui/helpers/storeHelpers/personalInfoActions';
import { addAliasesAction } from '@shared-ui/helpers/storeHelpers/aliasActions';
import { Alias, PersonalInfo } from '@shared-ui/types/defualtTypes';
import { validateFormStepOne } from '@shared-ui/validators/form-validators/formStepOneValidators';

export default defineComponent({
  name: 'FormStepOne',
  components: { AliasTable, AliasDialog, FormErrorAlert },
  props: {
    handleNextSection: {
      type: Function as PropType<() => void>,
      default: () => null,
    },
  },
  data() {
    return {
      personalInfo: {} as PersonalInfo,
      ssnConfirm: '' as string,
      aliases: [] as Array<Alias>,
      errors: [] as Array<string>,
    };
  },
  computed: {
    ssnConfirmError(): Array<string> {
      const errors: Array<string> = [];
      if (this.ssnConfirm !== '' && this.ssnConfirm !== this.personalInfo.ssn) {
        errors.push("SSN's do not match");
      }
      if (this.ssnConfirm === '') {
        errors.push('SSN confirm can not be empty');
      }
      return errors;
    },
  },
  methods: {
    handleSubmit() {
      const formData = {
        personalInfo: this.personalInfo,
        ssnConfirm: this.ssnConfirm,
      };
      this.errors = validateFormStepOne(formData);
      if (this.errors.length <= 0) {
        addPersonalInfoAction(this.personalInfo);
        addAliasesAction(this.aliases);
        this.handleNextSection();
      }
    },

    getAliasFromDialog(alias) {
      this.aliases.unshift(alias);
    },
  },
});
</script>

<style lang="scss" scoped>
.sub-header {
  font-size: 1.5rem;
}

.form-btn-container {
  display: flex;
  width: 90%;
  justify-content: flex-end;
}
</style>
