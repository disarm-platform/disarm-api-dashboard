import List from '@/views/List.vue';
import { shallowMount } from '@vue/test-utils';

describe('List.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(List, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
