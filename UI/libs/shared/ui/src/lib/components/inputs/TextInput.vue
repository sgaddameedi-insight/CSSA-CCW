<template>
  <v-text-field
    v-model="value"
    :label="label"
    :rules="rules"
    @blur="handleBlur"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TextInput',
  data: () => ({
    value: '',
  }),
  props: {
    label: {
      type: String,
      default: '',
    },
    rules: {
      type: Array<any>,
      default: () => [],
    },
    target: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleBlur(event) {
      this.$emit('input', event.target.value, this.target);
    },
  },
});
</script>
