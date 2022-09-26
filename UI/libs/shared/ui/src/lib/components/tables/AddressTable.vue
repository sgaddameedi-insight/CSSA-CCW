<template>
  <v-simple-table class="my-3">
    <template #default>
      <thead>
        <tr>
          <th>Address line 1</th>
          <th>Address line 2</th>
          <th>City</th>
          <th>State </th>
          <th>County</th>
          <th>Zip</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(address, index) in addresses"
          :key="index"
        >
          <td>
            {{ address.addressLine1 }}
          </td>
          <td>
            {{ address.addressLine2 }}
          </td>
          <td>
            {{ address.city }}
          </td>
          <td>
            {{ address.state }}
          </td>
          <td>
            {{ address.county }}
          </td>
          <td>
            {{ address.zip }}
          </td>
          <td>
            {{ address.country }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { AddressInfo } from '@shared-ui/types/defualtTypes';

export default defineComponent({
  name: 'AddressTable',
  props:{
    addresses: {
     type: Array<AddressInfo>,
     default: () => []
    }
  }
});
</script>
