import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@shared-ui/components/HelloWorld.vue';
import Vuetify from 'vuetify';

describe('HelloWorld.vue', () => {
  it('renders welcome message', () => {
    const wrapper = shallowMount(HelloWorld, {
      vuetify: new Vuetify(),
      propsData: {
        msg: 'UI Library',
      },
    });
    expect(wrapper.text()).toMatch('UI Library');
  });
});
