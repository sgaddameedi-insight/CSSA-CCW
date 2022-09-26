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
          <TextInput
            :label="'Id number'"
            :target="'idNumber'"
            @input="(v,t) => {handleInput(v,t)}"
            :rules="[v => !!v || 'Id  number is required']"
            required
          />
        </v-col>

        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <TextInput
            :label="' Issuing State'"
            :target="'issuingState'"
            :rules="[v => !!v || 'Issuing state is required']"
            @input="(v,t) => {handleInput(v,t)}"
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
          <TextInput
            :label="'Birth city'"
            :target="'birthCity'"
            :rules="[v => !!v || 'Birth city cannot be blank']"
            @input="(v,t) => {handleInput(v,t)}"
          />
          <TextInput
            :label="'Birth state'"
            :target="'birthState'"
            :rules="[v => !!v || 'Birth state cannot be blank']"
            @input="(v,t) => {handleInput(v,t)}"
          />
          <TextInput
            :label="'Birth country'"
            :target="'birthCountry'"
            :rules="[v => !!v || 'Birth country cannot be blank']"
            @input="(v,t) => {handleInput(v,t)}"
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
          class="pl-5"
        >
          <RadioGroupInput
            :label="'Citizen'"
            :layout="'row'"
            :options="[{label: 'Yes', value: true}, {label: 'No', value: false}]"
            :target="'citizen'"
            @input="(v,t) => {handleInput(v,t)}"
          />
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
      <v-btn color="info mr-2">
        Save and Exit
      </v-btn>
      <!-- TODO: Make this return to the home page with out saving the form at all -->
      <v-btn color="error mr-2">
        Cancel
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex';
import { defineComponent, PropType } from 'vue';
import { Citizenship, DOB, Id } from '@shared-ui/types/defualtTypes';
import TextInput from '@shared-ui/components/inputs/TextInput.vue';
import RadioGroupInput from '@shared-ui/components/inputs/RadioGroupInput.vue';

export default defineComponent({
  name: 'FormStepTwo',
  components: { RadioGroupInput, TextInput },
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
    handleInput(value, target){
      switch (target){
        case "idNumber":
          this.id.idNumber = value
          break
        case "issuingState":
          this.id.issuingState = value
          break
        case "birthCity":
          this.DOBInfo.birthCity = value
          break
        case "birthState":
          this.DOBInfo.birthState = value
          break
        case "birthCountry":
          this.DOBInfo.birthCountry = value
          break
        case "citizen":
          this.citizenshipInfo.citizen = value
          this.$forceUpdate()
          break
        default:
          return
      }
    },
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
