import React from 'react'; // eslint-disable-line no-unused-vars
import { shallow } from 'enzyme';
import moment from 'moment';

import { getNewDateStateChange } from '../../utils/Calendar';

import Calendar from '../Calendar';

describe('Calendar', () => {
  let wrapper;

  beforeEach(() => {
    const theme = {
      Colors: {},
      Fonts: {},
      FontSizes: {},
      Spacing: {}
    };

    const mockCallback = jest.fn();

    wrapper = shallow(
      <Calendar
        onDateSelect={mockCallback}
        selectedDate={moment().unix()}
        theme={theme}
      />
    );
  });


  describe('rendering', () => {
    it('should mount and render 35 calendar days', () => {
      expect(wrapper.find('.calendar-day').length).toBe(35);
    });

    it('should only render one focused day', () => {
      expect(wrapper.find('#focused-day').length).toBe(1);
    });
  });


  describe('getNewDateStateChange', () => {
    const focusedDay = moment();
    const startDate = moment().startOf('month').startOf('week');
    const endDate = moment().endOf('month').endOf('week')

    it('should return an object with a focusedDay key when right key is pressed', () => {
      const result = {
        focusedDay: moment(focusedDay).add(1, 'days').startOf('day').unix()
      }

      expect(getNewDateStateChange({ code: 'right', focusedDay, startDate, endDate })).toEqual(result);
    });

    it('should return an object with a focusedDay key and a currentDate key when right key is pressed and newDate is outside of start and end date bounds', () => {
      const result = {
        focusedDay: moment(focusedDay).add(1, 'days').startOf('day').unix(),
        currentDate: moment(focusedDay).add(1, 'days').startOf('day').unix()
      }
      const endDateOutOfRange = focusedDay;

      expect(getNewDateStateChange({ code: 'right', focusedDay, startDate, endDateOutOfRange })).toEqual(result);
    });

    it('should return an object with a focusedDay key when left key is pressed', () => {
      const result = {
        focusedDay: moment(focusedDay).subtract(1, 'days').startOf('day').unix()
      }

      expect(getNewDateStateChange({ code: 'left', focusedDay, startDate, endDate })).toEqual(result);
    });

    it('should return an object with a focusedDay key and a currentDate key when left key is pressed and newDate is outside of start and end date bounds', () => {
      const result = {
        focusedDay: moment(focusedDay).subtract(1, 'days').startOf('day').unix(),
        currentDate: moment(focusedDay).subtract(1, 'days').startOf('day').unix(),
      }
      const startDateOutOfRange = focusedDay;

      expect(getNewDateStateChange({ code: 'left', focusedDay, startDateOutOfRange, endDate })).toEqual(result);
    });

    it('should return correct day when up key is pressed', () => {
      const result = {
        focusedDay: moment(focusedDay).subtract(7, 'days').startOf('day').unix()
      }

      expect(getNewDateStateChange({ code: 'up', focusedDay, startDate, endDate })).toEqual(result);
    });

    it('should return correct day when down key is pressed', () => {
      const result = {
        focusedDay: moment(focusedDay).add(7, 'days').startOf('day').unix()
      }

      expect(getNewDateStateChange({ code: 'down', focusedDay, startDate, endDate })).toEqual(result);
    });
  });
});
