<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-subheader class="subHeader font-weight-bold"> Id Information </v-subheader>
      <v-row>
        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <v-text-field
            v-model="id.idNumber"
            label="Id number"
            :rules="[v => !!v || 'Id  number is required']"
            required
          />
        </v-col>

        <v-col
          cols="6"
          md="5"
          sm="3"
        >
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
        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <v-date-picker
            v-model="DOBInfo.DOB"
            label="Date of birth"
          />
          <v-alert
            dense
            outlined
            type="error"
            v-if="!DOBInfo.DOB"
          >
            Date of birth cannot be blank!
          </v-alert>
        </v-col>

        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <v-text-field
            v-model="DOBInfo.birthCity"
            label="Birth city"
            :rules="[v => !!v || 'Birth city cannot be blank']"
            required
          />
          <v-text-field
            v-model="DOBInfo.birthState"
            label="Birth state"
            :rules="[v => !!v || 'Birth state cannot be blank']"
          />
          <v-text-field
            v-model="DOBInfo.birthCountry"
            label="Birth country"
            required
            :rules="[v => !!v || 'Birth country cannot be blank']"
          />
        </v-col>
      </v-row>

      <v-divider />
      <v-subheader class="subHeader font-weight-bold"> Citizenship Information </v-subheader>

      <v-row>
        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <v-radio-group
            class="ml-5"
            row
            v-model="citizenshipInfo.citizen"
            label="Citizen"
          >
            <v-radio
              label="Yes"
              :value="true"
            />

            <v-radio
              label="No"
              :value="false"
            />
          </v-radio-group>

          <v-alert
            dense
            outlined
            type="error"
            v-if="!citizenshipInfo.citizen"
          >
            Must select Yes or No!
          </v-alert>
        </v-col>

        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <v-select
            v-model="citizenshipInfo.militaryStatus"
            :items="items"
            label="Military Status"
          />

          <v-alert
            dense
            outlined
            type="error"
            v-if="!citizenshipInfo.militaryStatus"
          >
            Must select a status!
          </v-alert>
        </v-col>
      </v-row>
    </v-form>
    <v-divider />
    <div class="form-btn-container">
      <v-btn
        :disabled="!valid"
        color="secondary mr-2"
        @click="handleSubmit"
      >
        Continue
      </v-btn>
      <!-- TODO: this needs to save to save the current state to local storage or call the api to save in
      the db
       -->
      <v-btn color="info mr-2">Save and Exit</v-btn>
      <!-- TODO: Make this return to the home page with out saving the form at all -->
      <v-btn color="error mr-2"> Cancel</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex';
import { defineComponent, PropType } from 'vue';
import { Citizenship, DOB, Id } from '@shared-ui/types/defualtTypes';

export default defineComponent({
  name: 'FormStepTwo',
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
      valid: false,
    };
  },
  methods: {
    ...mapActions({
      addId: 'addId',
      addDOB: 'addDOB',
      addCitizenship: 'addCitizenshipInfo',
    }),
    handleSubmit() {
      this.addId(this.id);
      this.addDOB(this.DOBInfo);
      this.addCitizenship(this.citizenshipInfo);
      this.handleNextSection();
    },
  },
});
</script>

<style lang='scss' scoped>
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
