<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-subheader class="subHeader font-weight-bold">
        {{ $t('personal info') }}
      </v-subheader>

      <v-row class="ml-5">
        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <TextInput
            :label="'Last Name '"
            :target="'lastName'"
            :rules="[v => !!v || 'Last name is required']"
            @input="
              (v, t) => {
                handleInput(v, t);
              }
            "
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
            @input="
              (v, t) => {
                handleInput(v, t);
              }
            "
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
              v =>
                (!!v && !personalInfo.noMiddleName) ||
                'Middle name is required or you must select no middle name',
            ]"
            @input="
              (v, t) => {
                handleInput(v, t);
              }
            "
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
            @input="
              (v, t) => {
                handleInput(v, t);
              }
            "
          />
        </v-col>

        <v-col
          cols="6"
          md="5"
        >
          <CheckboxInput
            :target="'noMiddleName'"
            :label="'No middle name'"
            @input="
              (v, t) => {
                handleInput(v, t);
              }
            "
          />
        </v-col>
      </v-row>
      <v-divider class="my-3" />

      <v-subheader class="sub-header font-weight-bold">
        {{ $t('Social Security Information') }}
      </v-subheader>

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
            @input="
              (v, t) => {
                handleInput(v, t);
              }
            "
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
            :rules="[
              v => !!v || 'Confirm ssn cannot be blank',
              v => v === personalInfo.ssn || 'SSN\'s do not match',
            ]"
            @input="
              (v, t) => {
                handleInput(v, t);
              }
            "
          />
        </v-col>
      </v-row>

      <v-divider class="my-3" />
      <v-row class="ml-1">
        <v-subheader class="subHeader font-weight-bold">
          {{ $t('marital status') }}
        </v-subheader>
        <v-col
          cols="16"
          md="5"
          sm="3"
        >
          <RadioGroupInput
            :label="'Marital status'"
            :options="[
              { label: 'Married', value: 'married' },
              { label: 'Single', value: 'single' },
            ]"
            :hint="'Marital Status is required'"
            :layout="'row'"
            :target="'maritalStatus'"
            @input="
              (v, t) => {
                handleInput(v, t);
              }
            "
          />
        </v-col>
      </v-row>
    </v-form>

    <v-divider />
    <v-subheader class="sub-header font-weight-bold">
      {{ $t('aliases') }}
    </v-subheader>
    <div class="alias-components-container">
      <AliasTable :aliases="aliases" />
      <AliasDialog :save-alias="getAliasFromDialog" />
    </div>
    <FormButtonContainer
      :valid="valid"
      @submit="handleSubmit"
    />
    <FormErrorAlert
      v-if="errors.length > 0"
      :errors="errors"
    />
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, ref } from 'vue';
import { useActions } from 'vuex-composition-helpers';
import AliasDialog from '@core-public/components/dialogs/AliasDialog.vue';
import AliasTable from '@shared-ui/components/tables/AliasTable.vue';
import { AliasType, PersonalInfoType } from '@shared-ui/types/defaultTypes';
import TextInput from '@shared-ui/components/inputs/TextInput.vue';
import CheckboxInput from '@shared-ui/components/inputs/CheckboxInput.vue';
import RadioGroupInput from '@shared-ui/components/inputs/RadioGroupInput.vue';
import FormErrorAlert from '@shared-ui/components/alerts/FormErrorAlert.vue';
import FormButtonContainer from '@core-public/components/containers/FormButtonContainer.vue';

export interface FormStepOneProps {
  handleNextSection: () => void;
}

const props = withDefaults(defineProps<FormStepOneProps>(), {
  handleNextSection: () => null,
});

const personalInfo = reactive({} as PersonalInfoType);
const aliases = ref([] as Array<AliasType>);
const errors = ref([] as Array<string>);
const valid = ref(false);
let ssnConfirm = ref('');

const { addAlias, addPersonalInfo } = useActions([
  'addAlias',
  'addPersonalInfo',
]);

const instance = getCurrentInstance();

function handleSubmit() {
  if (!personalInfo.maritalStatus) {
    errors.value.push('Marital Status');
  } else {
    addPersonalInfo(personalInfo);
    addAlias(aliases.value);
    props.handleNextSection();
  }
}

function getAliasFromDialog(alias) {
  aliases.value.unshift(alias);
}

function handleInput(value: string, target: string) {
  switch (target) {
    case 'lastName':
      personalInfo.lastName = value;
      break;
    case 'firstName':
      personalInfo.firstName = value;
      break;
    case 'middleName':
      personalInfo.middleName = value;
      break;
    case 'suffix':
      personalInfo.suffix = value;
      break;
    case 'noMiddleName':
      personalInfo.noMiddleName = value !== 'false';
      instance?.proxy?.$forceUpdate();
      break;
    case 'SSN':
      personalInfo.ssn = value;
      break;
    case 'confirmSSN':
      ssnConfirm.value = value;
      break;
    case 'maritalStatus':
      personalInfo.maritalStatus = value;
      break;
    default:
      return;
  }
}
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
.alias-components-container {
  display: flex;
  flex-direction: column;
  width: 90%;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
