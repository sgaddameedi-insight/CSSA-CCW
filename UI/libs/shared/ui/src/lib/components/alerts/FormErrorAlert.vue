<template>
  <v-alert class="mt-5" type="error" elevation="3" dismissible>
    Can not continue do to errors in the following fields
    <span v-for="(error, i) in errors" :key="i"> {{ error }}, </span>
  </v-alert>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormErrorAlert',
  props: {
    errors: {
      type: Array<string>,
      default: () => []
    }
  },
});
</script>

