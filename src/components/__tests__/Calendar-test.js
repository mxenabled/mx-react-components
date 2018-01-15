import React from 'react'; // eslint-disable-line no-unused-vars
import { shallow } from 'enzyme';
import moment from 'moment';
import keycode from 'keycode';

import Calendar from '../Calendar';

describe('Calendar', () => {
  let wrapper

  beforeEach(() => {
    const theme = {
      Colors: {},
      Fonts: {},
      FontSizes: {},
      Spacing: {},
    }

    const mockCallback = jest.fn()

    wrapper = shallow(
      <Calendar
        onDateSelect={mockCallback}
        selectedDate={moment().unix()}
        theme={theme}
      />
    )
  })


  describe('rendering', () => {
    it('should mount and render 35 calendar days', () => {
      expect(wrapper.find('.calendar-day').length).toBe(35)
    })

    it('should only render one focused day', () => {
      expect(wrapper.find('#focused-day').length).toBe(1)
    })
  })

  describe('events', () => {

    it('should set state correctly on left arrow keyDown', () => {
      wrapper.find('#focused-day').simulate('keyDown', {keyCode: 37})
      wrapper.update()

      //events & setState are async so the state isn't changing by the time the assertion runs...
      const currentDate = wrapper.state().currentDate;
      expect(currentDate).toBe(moment().subtract(1, 'days').startOf('day').unix())
    })
  })

});
