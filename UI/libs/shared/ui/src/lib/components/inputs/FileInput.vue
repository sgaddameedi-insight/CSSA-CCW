<template>
  <v-file-input
    ref="fileInput"
    v-model="file"
    :name="name"
    :rules="rules"
    :label="$t(label)"
    :show-size="1000"
    placeholder="Select your file"
    color="deep-purple accent-4"
    prepend-icon="mdi-paperclip"
    accept="image/png, image/jpeg"
    truncate-length="50"
    counter
    outlined
  >
    <template #selection="{ index, text }">
      <v-chip
        v-if="index < 2"
        color="deep-purple accent-4"
        dark
        label
        small
      >
        {{ text }}
      </v-chip>
    </template>
  </v-file-input>
</template>

<script setup lang="ts">
import { ref } from 'vue';

export interface FileInputProps {
  label: string;
  name: string;
  rules: string[];
}

const props = withDefaults(defineProps<FileInputProps>(), {
  label: '',
  name: '',
  rules: () => [],
});

const file = ref([]);
</script>
