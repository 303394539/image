import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Image from '../src';

describe('Placeholder', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Default placeholder', () => {
    const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
    const wrapper = mount(<Image src={src} placeholder />);

    expect(wrapper.find('.rc-image-placeholder').get(0)).toBeFalsy();
    expect(wrapper.find('.rc-image-img-placeholder').prop('src')).toBe(src);
  });

  it('Set correct', () => {
    const placeholder = 'placeholder';
    const wrapper = mount(
      <Image
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        placeholder={placeholder}
      />,
    );
    expect(wrapper.find('.rc-image-placeholder').text()).toBe(placeholder);

    act(() => {
      wrapper.find('.rc-image-img').simulate('load');
      jest.runAllTimers();
      wrapper.update();
    });

    expect(wrapper.find('.rc-image-placeholder').get(0)).toBeUndefined();
  });
});
