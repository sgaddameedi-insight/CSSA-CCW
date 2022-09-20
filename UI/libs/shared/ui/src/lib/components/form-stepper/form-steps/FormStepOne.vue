<template>
  <div>
    <v-form>
      <v-row>
        <v-col cols="6" md="5" sm="3">
          <v-text-field
            v-model="personalInfo.lastName"
            label="Last name"
            :rules="[v => !!v || 'Last name is required']"
            required
          >
          </v-text-field>
        </v-col>

        <v-col cols="6" md="5" sm="3">
          <v-text-field
            v-model="personalInfo.firstName"
            label="First name"
            :rules="[v => !!v || 'First name is required']"
            required
          >
          </v-text-field>
        </v-col>

        <v-col cols="6" md="5" sm="3">
          <v-text-field
            v-model="personalInfo.middleName"
            label="Middle name"
            :rules="[
              v => (!!v && !personalInfo.noMiddleName) || 'Middle name is required or you must select no middle name',
            ]"
            required
          >
          </v-text-field>
        </v-col>

        <v-col cols="6" md="5" sm="3">
          <v-text-field v-model="personalInfo.suffix" label="suffix"> </v-text-field>
        </v-col>

        <v-col cols="6" md="5">
          <v-checkbox class="ml-3" v-model="personalInfo.noMiddleName" :label="'No middle name'"> </v-checkbox>
        </v-col>
      </v-row>
      <v-divider class="my-3" />
      <v-row>
        <v-col cols="6" md="5" sm="3">
          <v-text-field v-model="personalInfo.ssn" label="SSN" :rules="[v => !!v || 'SSN is required']" required>
          </v-text-field>
        </v-col>

        <v-col cols="6" md="5" sm="3">
          <v-text-field v-model="ssnConfirm" label="Confirm SSN" :rules="ssnConfirmError" required> </v-text-field>
        </v-col>
        <v-col cols="6" md="5" sm="3">
          <v-radio-group class="ml-3" v-model="personalInfo.maritalStatus">
            <v-radio label="Married" value="married" />
            <v-radio label="Single" value="single" />
          </v-radio-group>
        </v-col>
      </v-row>
    </v-form>
    <v-btn color="secondary" @click="handleSubmit"> continue </v-btn>
  </div>
</template>

<script>
export default {
  name: 'FormStepOne',
  props: {
    handleNextSection: Function,
  },
  data() {
    return {
      personalInfo: {
        lastName: '',
        firstName: '',
        middleName: '',
        noMiddleName: false,
        suffix: '',
        ssn: '',
        maritalStatus: '',
      },
      ssnConfirm: '',
    };
  },
  computed: {
    ssnConfirmError() {
      const errors = [];
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
      if (!this.checkForAnyErrors()) {
        console.log(this.personalInfo);
        this.handleNextSection();
      }
      // TODO: Make this into some sort of a alert call.
      console.log('error');
    },
    checkForAnyErrors() {
      return !(
        this.personalInfo.lastName &&
        this.personalInfo.firstName &&
        (this.personalInfo.middleName || this.personalInfo.noMiddleName) &&
        this.personalInfo.ssn &&
        this.personalInfo.ssn === this.ssnConfirm &&
        this.personalInfo.maritalStatus
      );
    },
  },
};
</script>

<style scoped></style>
