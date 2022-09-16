<template>
  <div class="home">
    <img alt="Vue logo" src="@shared-ui/assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript Admin App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@shared-ui/components/HelloWorld';

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
});
</script>
