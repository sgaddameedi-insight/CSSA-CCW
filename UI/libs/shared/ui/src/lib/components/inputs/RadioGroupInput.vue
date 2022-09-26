<template>
  <div>
    <v-radio-group
      v-if="layout === 'row'"
      row
      ref="radioGroup"
      v-model="value"
      :label="label"
      :hint="hint"
      persistent-hint
      @change="handleChange"
      @blur="handleBlur"
    >
      <v-radio
        v-for='(option, i) in options'
        :key="i"
        :label="option.label"
        :value="option.value"
      />
    </v-radio-group>

    <v-radio-group
      v-if="layout !== 'row'"
      ref="radioGroup"
      v-model="value"
      :hint="hint"
      persistent-hint
      :label="label"
      @change="handleChange"
      @blur="handleBlur"
    >
      <v-radio
        v-for='(option, i) in options'
        :key="i"
        :label="option.label"
        :value="option.value"
      />
    </v-radio-group>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { RadioOptions } from '@shared-ui/types/defualtTypes';

export default defineComponent( {
  name: 'RadioGroupInput',
  data: () => ({
    value: ""
  }),
  props: {
    options: {
      type: Array<RadioOptions>,
      default: () => []
    },
    label: {
      type: String,
      default: ""
    },
    layout: {
      type: String,
      default: ""
    },
    hint: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: ''
    },
  },
  methods:{
    handleChange(){
      this.$emit("input", this.value, this.target)
    },
    handleBlur(){
      console.log(this.$refs.radioGroup)

      if(!this.value){
        console.log(this.$refs.radioGroup)
      }
    }
  }
});
</script>

