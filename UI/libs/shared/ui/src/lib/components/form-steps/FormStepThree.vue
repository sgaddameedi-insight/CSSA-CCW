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
            :rules="[ v => !!v || 'Address line 1 cannot be blank']"
            :target="'addressLine1'"
            @input="(v,t) => {handleInput(v,t)}"
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
            @input="(v,t) => {handleInput(v,t)}"
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
            :rules="[ v => !!v || ' City cannot be blank']"
            @input="(v,t) => {handleInput(v,t)}"
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
            :rules="[ v => !!v || 'State cannot be blank']"
            @input="(v,t) => {handleInput(v,t)}"
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
            :rules="[ v => !!v || 'County cannot be blank']"
            @input="(v,t) => {handleInput(v,t)}"
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
            :rules="[ v => !!v || 'Zip cannot be blank']"
            @input="(v,t) => {handleInput(v,t)}"
          />
        </v-col>

        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <v-text-field
            v-model="address.country"
            label="Country"
            :rules="[ v => !!v || 'Country cannot be blank']"
          />
        </v-col>
      </v-row>

      <v-row>
        <PreviousAddressDialog :get-previous-address-from-dialog="getPreviousAddressFromDialog" />
      </v-row>
    </v-form>
  </div>
</template>

<script lang='ts'>

import { AddressInfo } from '@shared-ui/types/defualtTypes';
import { defineComponent, PropType } from 'vue';
import PreviousAddressDialog from '@shared-ui/components/dialogs/PreviousAddressDialog.vue';
import TextInput from '@shared-ui/components/inputs/TextInput.vue';

export default defineComponent( {
  name: 'FormStepThree',
  components: { TextInput, PreviousAddressDialog },
  props: {
    handleNextSection: {
      type: Function as PropType<() => void>,
      default: () => null,
    },
  },
  data(){
    return {
      address: {} as AddressInfo,
      previousAddress: [] as Array<AddressInfo>,
      valid: false
    }
  },
  methods:{
     getPreviousAddressFromDialog(address: AddressInfo){
       this.previousAddress.push(address)
     },
    handleInput(value, target){
        switch(target){
          case "addressLine1":
            this.address.addressLine1 = value
            break
          case "addressLine2":
            this.address.addressLine2 = value
            break
          case "city":
            this.address.city = value
            break
          case "state":
            this.address.state = value
            break
          case "zip":
            this.address.zip = value
            break
          case "county":
            this.address.county = value
            break
          case "country":
            this.address.country = value
            break
          default:
            return
        }
    }
  }
});
</script>

<style lang='scss' scoped>
.subHeader {
  font-size: 1.5rem;
}
</style>
