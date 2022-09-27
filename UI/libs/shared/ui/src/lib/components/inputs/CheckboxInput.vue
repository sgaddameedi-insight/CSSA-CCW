<template>
  <v-checkbox
    v-model="value"
    :label="label"
    @change="handleBlur"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CheckboxInput',
  data: () => ({
    value: false,
  }),
  props: {
    label: {
      type: String,
      default: '',
    },
    target: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleBlur() {
      this.$emit('input', `${this.value}`, this.target);
    },
  },
});
</script>
