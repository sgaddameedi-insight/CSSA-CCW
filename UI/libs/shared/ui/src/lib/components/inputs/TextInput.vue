<template>
  <v-text-field
    v-model="value"
    :label="$t(label)"
    :rules="rules"
    :name="name"
    @blur="handleBlur"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

export interface TextInputProps {
  label?: string;
  name?: string;
  rules?: string[];
  target?: string;
}

const props = withDefaults(defineProps<TextInputProps>(), {
  label: '',
  name: '',
  rules: () => [],
  target: '',
});

const emit = defineEmits(['input']);

function handleBlur(event) {
  emit('input', event.target.value, props.target);
}

const value = ref('');
</script>
