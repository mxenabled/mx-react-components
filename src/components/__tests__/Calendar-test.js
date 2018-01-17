import React from 'react'; // eslint-disable-line no-unused-vars
import { shallow } from 'enzyme';
import moment from 'moment';
import keycode from 'keycode';
import { calculateDayByKey } from '../../enhancers/calendar-enhancers';

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


  describe('calculateDayByKey', () => {
    const focusedDay = moment().unix();

    it('should return correct day when right key is pressed', () => {
      expect(calculateDayByKey('right', focusedDay)).toEqual(moment.unix(focusedDay).add(1, 'days').startOf('day'))
    })

    it('should return correct day when left key is pressed', () => {
      expect(calculateDayByKey('left', focusedDay)).toEqual(moment.unix(focusedDay).subtract(1, 'days').startOf('day'))
    })

    it('should return correct day when up key is pressed', () => {
      expect(calculateDayByKey('up', focusedDay)).toEqual(moment.unix(focusedDay).subtract(7, 'days').startOf('day'))
    })

    it('should return correct day when down key is pressed', () => {
      expect(calculateDayByKey('down', focusedDay)).toEqual(moment.unix(focusedDay).add(7, 'days').startOf('day'))
    })

  })

});
