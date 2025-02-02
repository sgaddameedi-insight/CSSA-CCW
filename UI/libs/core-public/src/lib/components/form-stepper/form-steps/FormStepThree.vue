<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-row class="ml-5">
        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <TextInput
            :label="'Address line 1'"
            :rules="[v => !!v || 'Address line 1 cannot be blank']"
            :target="'addressLine1'"
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
            :label="'Address line 2'"
            :target="'addressLine2'"
            @input="
              (v, t) => {
                handleInput(v, t);
              }
            "
          />
        </v-col>
      </v-row>

      <v-row class="ml-5">
        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <TextInput
            :label="'City'"
            :target="'city'"
            :rules="[v => !!v || ' City cannot be blank']"
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
            :label="'State'"
            :target="'state'"
            :rules="[v => !!v || 'State cannot be blank']"
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
            :label="'County'"
            :target="'county'"
            :rules="[v => !!v || 'County cannot be blank']"
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
            :label="'Zip'"
            :target="'zip'"
            :rules="[v => !!v || 'Zip cannot be blank']"
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
            :label="'Country'"
            :target="'country'"
            :rules="[v => !!v || 'Country cannot be blank']"
            @input="
              (v, t) => {
                handleInput(v, t);
              }
            "
          />
        </v-col>
      </v-row>
      <v-divider />
      <v-subheader class="sub-header font-weight-bold">
        {{ $t(' Previous Address') }}
      </v-subheader>
      <div class="previous-address-container">
        <address-table :addresses="previousAddress" />
        <PreviousAddressDialog
          :get-previous-address-from-dialog="getPreviousAddressFromDialog"
        />
      </div>
      <FormButtonContainer
        :valid="valid"
        @submit="handleSubmit"
      />
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useActions } from 'vuex-composition-helpers';
import { AddressInfoType } from '@shared-ui/types/defaultTypes';
import PreviousAddressDialog from '../../dialogs/PreviousAddressDialog.vue';
import TextInput from '@shared-ui/components/inputs/TextInput.vue';
import AddressTable from '@shared-ui/components/tables/AddressTable.vue';
import FormButtonContainer from '@core-public/components/containers/FormButtonContainer.vue';

interface FormStepThreeProps {
  handleNextSection: () => void;
}

const props = withDefaults(defineProps<FormStepThreeProps>(), {
  handleNextSection: () => null,
});

const address = reactive({} as AddressInfoType);
const previousAddress = ref([] as Array<AddressInfoType>);
const valid = ref(false);

const { addCurrentAddressInfo, addPreviousAddress } = useActions([
  'addCurrentAddressInfo',
  'addPreviousAddress',
]);

function getPreviousAddressFromDialog(address: AddressInfoType) {
  previousAddress.value.push(address);
}

function handleInput(value, target) {
  switch (target) {
    case 'addressLine1':
      address.addressLine1 = value;
      break;
    case 'addressLine2':
      address.addressLine2 = value;
      break;
    case 'city':
      address.city = value;
      break;
    case 'state':
      address.state = value;
      break;
    case 'zip':
      address.zip = value;
      break;
    case 'county':
      address.county = value;
      break;
    case 'country':
      address.country = value;
      break;
    default:
      return;
  }
}

function handleSubmit() {
  addCurrentAddressInfo(address);
  addPreviousAddress(previousAddress);
  props.handleNextSection();
}
</script>

<style lang="scss" scoped>
.sub-header {
  font-size: 1.5rem;
}
.previous-address-container {
  display: flex;
  flex-direction: column;
  width: 90%;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
