<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-subheader class="subHeader font-weight-bold"> Personal Information</v-subheader>

      <v-row class="ml-5">
        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <TextInput
            :label="'Last name'"
            :target="'lastName'"
            :rules="[v => !!v || 'Last name is required']"
            @input="(v,t) => {
              handleInput(v, t)}"
          />
        </v-col>

        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <TextInput
            :label="'First name'"
            :target="'firstName'"
            :rules="[v => !!v || 'First name is required']"
            @input="(v,t) => {
              handleInput(v,t)
            }"
          />
        </v-col>

        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <TextInput
            v-if="!personalInfo.noMiddleName"
            :label="'Middle Name'"
            :target="'middleName'"
            :rules="[
              v => (!!v && !personalInfo.noMiddleName) || 'Middle name is required or you must select no middle name',
            ]"
            @input="(v,t) => {
              handleInput(v,t)
            }"
          />
        </v-col>


        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <TextInput
            :label="'Suffix'"
            :target="'suffix'"
            @input=" (v,t) => {
              handleInput(v,t)
            }"
          />
        </v-col>

        <v-col
          cols="6"
          md="5"
        >
          <CheckboxInput
            :target="'noMiddleName'"
            :label="'No middle name'"
            @input="(v,t) => {handleInput(v,t)}"
          />
        </v-col>
      </v-row>
      <v-divider class="my-3" />

      <v-subheader class="sub-header font-weight-bold"> Social Security Information </v-subheader>

      <v-row class="ml-5">
        <v-col
          cols="7"
          md="5"
          m="3"
        >
          <!-- TODO: Add further validation to this once we decide of SSN formatting -->
          <TextInput
            :label="'SSN'"
            :target="'SSN'"
            @input="(v,t) => {handleInput(v, t)}"
          />
        </v-col>

        <v-col
          cols="7"
          md="5"
          sm="3"
        >
          <TextInput
            :label="'Confirm SSN'"
            :target="'confirmSSN'"
            :rules="[v => !!v || 'Confirm ssn cannot be blank',
                     v => v === personalInfo.ssn || 'SSN\'s do not match'
            ]"
            @input="(v,t) => {handleInput(v,t)}"
          />
        </v-col>
      </v-row>

      <v-divider class="my-3" />
      <v-row class="ml-1">
        <v-subheader class="subHeader font-weight-bold"> Marital status </v-subheader>
        <v-col
          cols="16"
          md="5"
          sm="3"
        >
          <RadioGroupInput
            :label="'Marital status'"
            :options="[{label: 'Married', value:'married'}, {label:'Single', value:'single'}]"
            :hint="'Marital Status is required'"
            :layout="'row'"
            :target="'maritalStatus'"
            @input="(v,t) => { handleInput(v,t)}"
          />
        </v-col>
      </v-row>
    </v-form>

    <v-divider />
    <v-subheader class="sub-header font-weight-bold"> Aliases </v-subheader>
    <div class="alias-components-container">
      <AliasTable :aliases="aliases" />
      <AliasDialog :save-alias="getAliasFromDialog" />
    </div>
    <div class="form-btn-container">
      <v-btn
        color="success mr-2"
        @click="handleSubmit"
        :disabled="!valid"
      >
        Continue
      </v-btn>
      <!-- TODO: this needs to save to save the current state to local storage or call the api to save in
      the db
       -->

      <v-btn color="secondary mr-2">
        Save and Exit
      </v-btn>

      <!-- TODO: Make this return to the home page with out saving the form at all -->
      <v-btn color="error mr-2">
        Cancel
      </v-btn>
    </div>
    <FormErrorAlert
      v-if="errors.length > 0"
      :errors="errors"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { mapActions } from 'vuex';
import AliasDialog from '@core-public/components/dialogs/AliasDialog.vue';
import AliasTable from '@shared-ui/components/tables/AliasTable.vue';
import { Alias, PersonalInfo } from '@shared-ui/types/defualtTypes';
import TextInput from '@shared-ui/components/inputs/TextInput.vue';
import CheckboxInput from '@shared-ui/components/inputs/CheckboxInput.vue';
import RadioGroupInput from '@shared-ui/components/inputs/RadioGroupInput.vue';
import FormErrorAlert from '@shared-ui/components/alerts/FormErrorAlert.vue';

export default defineComponent({
  name: 'FormStepOne',
  components: { FormErrorAlert, RadioGroupInput, CheckboxInput, TextInput, AliasTable, AliasDialog },
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
      valid: false,
    };
  },
  computed: {
  },
  methods: {
    ...mapActions({
      addAlias: 'addAlias',
      addPersonalInfo: 'addPersonalInfo',
    }),

    handleSubmit() {
      if(!this.personalInfo.maritalStatus){
        this.errors.push("Marital Status")
      }else {
      this.addPersonalInfo(this.personalInfo);
      this.addAlias(this.aliases);
      this.handleNextSection();
      }
    },

    getAliasFromDialog(alias) {
      this.aliases.unshift(alias);
    },
    handleInput(value: string, target: string){
      switch (target) {
        case "lastName":
          this.personalInfo.lastName = value
          break
        case "firstName":
          this.personalInfo.firstName = value
          break
        case "middleName":
          this.personalInfo.middleName= value
          break
        case "suffix":
          this.personalInfo.suffix = value
          break
        case "noMiddleName":
          this.personalInfo.noMiddleName = value !== "false";
          this.$forceUpdate()
          break
        case "SSN":
          this.personalInfo.ssn = value
          break
        case 'confirmSSN':
          this.ssnConfirm = value
          break
        case "maritalStatus":
          this.personalInfo.maritalStatus = value
          break
        default:
          return
      }
    }
  },
});
</script>

<style lang="scss" scoped>

.subHeader {
  font-size: 1.5rem;
}

.form-btn-container {
  display: flex;
  width: 90%;
  justify-content: flex-end;
}
.alias-components-container{
  display: flex;
  flex-direction: column;
  width: 90%;
  justify-content: flex-start;
  align-items: flex-start; }
</style>
