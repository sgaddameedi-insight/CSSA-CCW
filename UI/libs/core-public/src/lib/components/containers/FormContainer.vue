<template>
  <v-container
    fluid
    class="blue-grey lighten-3 elevation-3 rounded form-container"
  >
    <FormWrapper />
  </v-container>
</template>

<script setup lang="ts">
import FormWrapper from '@core-public/components/wrappers/FormWrapper.vue';
</script>

<style lang="scss" scoped>
.form-container {
  min-height: 50%;
}
</style>
