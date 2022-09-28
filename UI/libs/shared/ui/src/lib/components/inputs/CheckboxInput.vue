<template>
  <v-checkbox
    v-model="value"
    :label="$t(label)"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

export interface CheckboxInputProps {
  label: string;
  target: string;
}

const props = withDefaults(defineProps<CheckboxInputProps>(), {
  label: '',
  target: '',
});

const emit = defineEmits(['input']);
const value = ref(false);

function handleChange() {
  emit('input', value.value, props.target);
}
</script>
