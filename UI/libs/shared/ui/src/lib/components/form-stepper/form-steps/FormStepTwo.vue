<template>
  <div>
    <v-form>
      <v-subheader class="subHeader font-weight-bold"> Id Information </v-subheader>
      <v-row>
        <v-col cols="6" md="5" sm="3">
          <v-text-field
            v-model="id.idNumber"
            label="Id number"
            :rules="[v => !!v || 'Id  number is required']"
            required
          />
        </v-col>

        <v-col cols="6" md="5" sm="3">
          <v-text-field
            v-model="id.issuingState"
            label=" Issuing State"
            :rules="[v => !!v || 'Issuing state is required']"
            required
          />
        </v-col>
      </v-row>
      <v-divider />
      <v-subheader class="subHeader font-weight-bold"> Date of birth </v-subheader>

      <v-row>
        <v-col cols="6" md="5" sm="3">
          <v-date-picker v-model="DOBInfo.DOB" label="Date of birth" />
          <!-- TODO: need a error block here if the data picker is invalid -->
        </v-col>
        <v-col cols="6" md="5" sm="3">
          <v-text-field v-model="DOBInfo.birthCity" label="Birth city" required />
          <v-text-field v-model="DOBInfo.birthState" label="Birth state" />
          <v-text-field v-model="DOBInfo.birthCountry" label="Birth country" required />
        </v-col>
      </v-row>

      <v-divider />
      <v-subheader class="subHeader font-weight-bold"> Citizenship Information </v-subheader>
      <v-row>
        <v-col cols="6" md="5" sm="3">
          <v-radio-group class="ml-5" v-model="citizenshipInfo.citizen" label="Citizen">
            <v-radio label="Yes" :value="true" />

            <v-radio label="No" :value="false" />
          </v-radio-group>
        </v-col>
        <v-col cols="6" md="5" sm="3">
          <v-select v-model="citizenshipInfo.militaryStatus" :items="items" label="Military Status"> </v-select>
        </v-col>
      </v-row>
    </v-form>
    <v-divider />
    <div class="form-btn-container">
      <v-btn color="secondary mr-2" @click="handleSubmit"> Continue </v-btn>
      <!-- TODO: this needs to save to save the current state to local storage or call the api to save in
      the db
       -->
      <v-btn color="info mr-2">Save and Exit</v-btn>
      <!-- TODO: Make this return to the home page with out saving the form at all -->
      <v-btn color="error mr-2"> Cancel</v-btn>
    </div>
    <FormErrorAlert v-if="errors.length > 0" :errors="errors" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Citizenship, DOB, Id } from '@shared-ui/types/defualtTypes';
import { validateForm } from '@shared-ui/validators/form-validators/formStepTwoValidators';
import FormErrorAlert from '@shared-ui/components/alerts/FormErrorAlert.vue';
import { addIdAction } from '@shared-ui/helpers/storeHelpers/idActions';
import { addCitizenshipAction } from '@shared-ui/helpers/storeHelpers/citizenActions';
import { addDOBAction } from '@shared-ui/helpers/storeHelpers/DOBActions';

export default defineComponent({
  name: 'FormStepTwo',
  components: { FormErrorAlert },
  props: {
    handleNextSection: {
      type: Function as PropType<() => void>,
      default: () => null,
    },
  },
  data() {
    return {
      id: {} as Id,
      DOBInfo: {} as DOB,
      citizenshipInfo: {} as Citizenship,
      items: ['Active', 'Reserve', 'Discharged', 'Retired', 'N/A'],
      errors: [] as Array<string>,
    };
  },
  methods: {
    handleSubmit() {
      const formData = {
        id: this.id,
        dob: this.DOBInfo,
        citizenship: this.citizenshipInfo,
      };
      this.errors = validateForm(formData);
      if (this.errors.length <= 0) {
        addIdAction(this.id);
        addDOBAction(this.DOBInfo);
        addCitizenshipAction(this.citizenshipInfo);
        this.handleNextSection();
      }
    },
  },
});
</script>

<style scoped>
.subHeader {
  font-size: 1.5rem;
}

.form-btn-container {
  width: 90%;
  margin-top: 0.5rem;
  display: flex;
  justify-content: flex-end;
}
</style>
