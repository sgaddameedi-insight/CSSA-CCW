import { withKnobs } from '@storybook/addon-knobs';
import MyBrandTitle from '@core-admin/components/BrandTitle';

export default {
  title: 'MyBrandTitle',
  decorators: [withKnobs],
};

export const BrandTitle = () => ({
  components: { MyBrandTitle },
  template: `<MyBrandTitle></MyBrandTitle>`,
});

BrandTitle.story = {
  name: 'BrandTitle',
};
