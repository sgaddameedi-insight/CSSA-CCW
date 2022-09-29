import { withKnobs } from '@storybook/addon-knobs';
import MyFileInput from '@shared-ui/components/inputs/FileInput.vue';

export default {
  title: 'FileInput',
  decorators: [withKnobs],
};

export const FileInput = () => ({
  props: {},
  components: { MyFileInput },
  template: `<MyFileInput></MyFileInput>`,
});

FileInput.story = {
  name: 'FileInput',
};
