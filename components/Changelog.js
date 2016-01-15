const React = require('react');

const Changelog = React.createClass({
  render () {
    return (
      <div>
        <h1>Change Log</h1>

        <h3>1.6.2</h3>
        <ul>
          <li>Button: Add icon prop and outline types (<a href='https://github.com/mxenabled/mx-react-components/pull/146'>#146</a>)</li>
        </ul>

        <h3>1.6.0</h3>
        <ul>
          <li>Add Button component (<a href='https://github.com/mxenabled/mx-react-components/pull/144'>#144</a>)</li>
          <li>Expose Style constants (<a href='https://github.com/mxenabled/mx-react-components/pull/144'>#144</a>)</li>
          <li>Loader - allow editing of loading text (<a href='https://github.com/mxenabled/mx-react-components/pull/136'>#136</a>)</li>
          <li>RangeSelector - clicking on the track now moves the closes toggle (<a href='https://github.com/mxenabled/mx-react-components/pull/133'>#133</a>)</li>
          <li>Select - using up/down keys now scrolls options (<a href='https://github.com/mxenabled/mx-react-components/pull/128'>#128</a>)</li>
        </ul>
        <p>New Contributors: <a href='http://github.com/lukeschunk'>lukeschunk</a></p>

        <h3>1.5.6</h3>
        <ul>
          <li>Changes scrim color for the `Modal` component (<a href='https://github.com/mxenabled/mx-react-components/pull/143'>#143</a>)</li>
        </ul>

        <h3>1.5.5</h3>
        <ul>
          <li>Minor style changes to the `Modal` component (<a href='https://github.com/mxenabled/mx-react-components/pull/138'>#138</a>)</li>
        </ul>

        <h3>1.5.4</h3>
        <ul>
          <li>Bug fixes for `TimeBasedLineChart` component (<a href='https://github.com/mxenabled/mx-react-components/pull/137'>#137</a>)</li>
        </ul>

        <h3>1.5.3</h3>
        <ul>
          <li>Add new `contentFooter` prop to Modal component to allow for content in footer (<a href='https://github.com/mxenabled/mx-react-components/pull/135'>#135</a>)</li>
        </ul>

        <h3>1.5.2</h3>
        <ul>
          <li>Icon: `calendar` and `chart` icons added (<a href='https://github.com/mxenabled/mx-react-components/pull/134'>#134</a>)</li>
        </ul>

        <h3>1.5.1</h3>
        <ul>
          <li>Fix TimeBasedLineChart bugs (<a href='https://github.com/mxenabled/mx-react-components/pull/132'>#132</a>)</li>
        </ul>

        <h3>1.5.0</h3>
        <ul>
          <li>TimeBasedLineChart: `zeroState` prop added, default `margins` updated, `style` prop is no longer used (<a href='https://github.com/mxenabled/mx-react-components/pull/131'>#131</a>)</li>
          <li>Icon: `calendar-plus` icon added (<a href='https://github.com/mxenabled/mx-react-components/pull/130'>#130</a>)</li>
        </ul>

        <h3>1.4.10</h3>
        <ul>
          <li>Update Babel dependency. (<a href='https://github.com/mxenabled/mx-react-components/commit/0093a46c25991b04dbbb747d97c82b33a28be370'>see commit</a>)</li>
        </ul>

        <h3>1.4.9</h3>
        <ul>
          <li>Modal Component: Hide tooltip icon/label if no tooltip (<a href='https://github.com/mxenabled/mx-react-components/pull/129'>#129</a>)</li>
        </ul>

        <h3>1.4.8</h3>
        <ul>
          <li>Add selectedDateColor prop to DatePicker component (<a href='https://github.com/mxenabled/mx-react-components/pull/126'>#126</a>)</li>
        </ul>

        <h3>1.4.7</h3>
        <ul>
          <li>Add new contentStyle prop to Modal component (<a href='https://github.com/mxenabled/mx-react-components/pull/125'>#125</a>)</li>
        </ul>

        <h3>1.4.2 - 1.4.6</h3>
        <ul>
          <li>Bug Fixes to SelectFullScreen and DatePickerFullScreen components (<a href='https://github.com/mxenabled/mx-react-components/commits/master'>Commit History</a>)</li>
        </ul>

        <h3>1.4.1</h3>
        <ul>
          <li>New DatePickerFullScreen component (<a href='https://github.com/mxenabled/mx-react-components/pull/122'>#122</a>)</li>
          <li>New SelectFullScreen component (<a href='https://github.com/mxenabled/mx-react-components/pull/123'>#123</a>)</li>
        </ul>

        <h3>1.4.0</h3>
        <ul>
          <li>Modal component positioning and text alignment fix (<a href='https://github.com/mxenabled/mx-react-components/pull/120'>#120</a>)</li>
        </ul>

        <h3>1.3.1</h3>
        <ul>
          <li>Modal - Update the way we center Modal content, add an isRelative prop (<a href='https://github.com/mxenabled/mx-react-components/pull/119'>#119</a>)</li>
          <li>TimeBasedLineChart - Don't render zero axis if to close to another tick. (<a href='https://github.com/mxenabled/mx-react-components/pull/118'>#118</a>)</li>
        </ul>

        <h3>1.3.0</h3>
        <ul>
          <li>Modal - Introduce new features/props to component (<a href='https://github.com/mxenabled/mx-react-components/pull/115'>#115</a>)</li>
        </ul>

        <h3>1.2.8</h3>
        <ul>
          <li>DatePicker - revert UTC date changes (<a href='https://github.com/mxenabled/mx-react-components/pull/110'>#110</a>)</li>
        </ul>

        <h3>1.2.7</h3>
        <ul>
          <li>DatePicker bug fixes (<a href='https://github.com/mxenabled/mx-react-components/pull/109'>#109</a>)</li>
        </ul>

        <h3>1.2.6</h3>
        <ul>
          <li>Refactor DatePicker component to add functionality (<a href='https://github.com/mxenabled/mx-react-components/pull/107'>#107</a>)</li>
          <li>Correct styling for Select component caret icon to match other components (<a href='https://github.com/mxenabled/mx-react-components/pull/108'>#108</a>)</li>
        </ul>

        <h3>1.2.5</h3>
        <ul>
          <li>Fix invalid date error in demo app for DatePicker. (<a href='https://github.com/mxenabled/mx-react-components/commit/a1d99cfeccd146ebc1b338faad003c5171806e00'>see commit</a>)</li>
          <li>Fix formatting issue with DatePicker. (<a href='https://github.com/mxenabled/mx-react-components/pull/105'>#105</a>)</li>
          <li>Add selectedDateWrapperStyle and calendarWrapperStyle props to DatePicker. (<a href='https://github.com/mxenabled/mx-react-components/pull/106'>#106</a>)</li>
        </ul>

        <h3>1.2.4</h3>
        <ul>
          <li>Add new attention-solid and link icons to the icon component. (<a href='https://github.com/mxenabled/mx-react-components/pull/103'>#103</a>)</li>
        </ul>

        <h3>1.2.3</h3>
        <ul>
          <li>Fix issue where the click event was not being triggered on the select component in IE 10/11. (<a href='https://github.com/mxenabled/mx-react-components/pull/79'>#79</a>)</li>
          <li>Fix CSS warning regarding unsupported CSS value of 'normal'. (<a href='https://github.com/mxenabled/mx-react-components/pull/80'>#80</a>)</li>
          <li>Change defaultDate and minimumDate props in DatePicker component to expect a unix timestamp. (<a href='https://github.com/mxenabled/mx-react-components/pull/92'>#92</a>)</li>
          <li>Remove duplicate caret icon in the DatePicker component. (<a href='https://github.com/mxenabled/mx-react-components/pull/93'>#93</a>)</li>
          <li>Fix issue in the TypeAhead component where a blank string was added if the string input did not match a valid option. (<a href='https://github.com/mxenabled/mx-react-components/pull/94'>#94</a>)</li>
          <li>Remove fontSize prop from the DatePicker component and allow it to be passed in the styles prop. (<a href='https://github.com/mxenabled/mx-react-components/pull/95'>#95</a>)</li>
          <li>Rename hoverCallBack prop to onDataPointHover in the TimeBasedLineChart component. (<a href='https://github.com/mxenabled/mx-react-components/pull/97'>#97</a>)</li>
          <li>Change TimeBasedLineChart component boxSizing to content-box on the wrapping element so the padding is not added to the width/height params. (<a href='https://github.com/mxenabled/mx-react-components/pull/98'>#98</a>)</li>
          <li>Change TimeBasedLineChart component default topMargin to 30px. (<a href='https://github.com/mxenabled/mx-react-components/pull/99'>#99</a>)</li>
          <li>Restrict rangeType prop to either 'day' or 'month' in the TimeBasedLineChart component. (<a href='https://github.com/mxenabled/mx-react-components/pull/100'>#100</a>)</li>
        </ul>

        <h3>1.2.2</h3>
        <ul>
          <li>Flip tooltip on middle date rather than break point date in TimeBasedLineChart (<a href='https://github.com/mxenabled/mx-react-components/pull/76'>#76</a>)</li>
          <li>Remove 100% height from DatePicker, add 40px bottom margin for spacing (<a href='https://github.com/mxenabled/mx-react-components/commit/58eda17c263895e80304919f4e1b874e0c33b67b'>see commit</a>)</li>
          <li>Add 1 interval buffer between start and end toggles in RangeSelector (<a href='https://github.com/mxenabled/mx-react-components/commit/52246399464bfe301594477406df1338e9329a65'>see commit</a>)</li>
          <li>Apply props.style onto wrapping component in TimeBasedLineChart (<a href='https://github.com/mxenabled/mx-react-components/commit/0b70105e10b80218da470b395a168549ee05d636'>see commit</a>)</li>
        </ul>

        <h3>1.2.1</h3>
        <ul>
          <li>Add css classes to Icon component (<a href='https://github.com/mxenabled/mx-react-components/pull/71'>#71</a>)</li>
          <li>Add css classes to DonutChart component (<a href='https://github.com/mxenabled/mx-react-components/pull/72'>#72</a>)</li>
          <li>Add simpler default tool tip to TimeBasedLineChart component (<a href='https://github.com/mxenabled/mx-react-components/pull/73'>#73</a>)</li>
          <li>Fix various bugs in TimeBasedLineChart component (<a href='https://github.com/mxenabled/mx-react-components/pull/74'>#74</a>)</li>
        </ul>
        <p>New Contributors: <a href='http://github.com/guilhermefloriani'>guilhermefloriani</a></p>

        <h3>1.2.0</h3>
        <ul>
          <li>Add new DatePicker component (<a href='https://github.com/mxenabled/mx-react-components/pull/57'>#57</a>, docs coming soon)</li>
          <li>Add new TimeBasedLineChart component (<a href='https://github.com/mxenabled/mx-react-components/pull/63'>#63</a>, docs coming soon)</li>
          <li>Increase space between RangeSelector group label and selected line (<a href='https://github.com/mxenabled/mx-react-components/pull/61'>#61</a>)</li>
          <li>Add css classes to Select component (<a href='https://github.com/mxenabled/mx-react-components/pull/62'>#62</a>)</li>
          <li>BREAKING CHANGE: renamed `range` prop to `upperBound` on RangeSelector component (<a href='https://github.com/mxenabled/mx-react-components/pull/64'>#64</a>)</li>
          <li>Add ability to set the lower bound (positive or negative) of the RangeSelector (<a href='https://github.com/mxenabled/mx-react-components/pull/64'>#64</a>)</li>
        </ul>
        <p>New Contributors: <a href='http://github.com/tumentumurchudur'>tumentumurchudur</a>, <a href='http://github.com/shubhekshajalan'>shubhekshajalan</a></p>

        <h3>1.1.0</h3>
        <ul>
          <li>Add new ToggleSwitch component</li>
          <li>Fix issue with DonutChart click events (<a href='https://github.com/mxenabled/mx-react-components/pull/51'>#51</a>)</li>
          <li>Add css classes to Spin component (<a href='https://github.com/mxenabled/mx-react-components/pull/52'>#52</a>)</li>
          <li>Add css classes to RangeSelector component (<a href='https://github.com/mxenabled/mx-react-components/pull/54'>#54</a>)</li>
          <li>Fix issue with the RangeSelelctor when resizing the window (<a href='https://github.com/mxenabled/mx-react-components/pull/55'>#55</a>)</li>
        </ul>
        <p>New Contributors: <a href='http://github.com/psigns'>psigns</a>, <a href='http://github.com/tegon'>tegon</a></p>

        <h3>1.0.0</h3>
        <ul>
          <li>Upgrade to React 0.14 (see <a href='http://facebook.github.io/react/blog/2015/10/07/react-v0.14.html'>React v0.14</a>)</li>
        </ul>

        <h3>0.4.1</h3>
        <ul>
          <li>Add MIT License</li>
          <li>Add CONTRIBUTING.md</li>
          <li>Add css classes to TypeAhead and Loader components</li>
          <li>Update default styling and props of DonutChart</li>
          <li>Add `dropdownStyle` prop to DonutChart</li>
        </ul>
        <p>New Contributors: <a href='http://github.com/httpete-ire'>httpete-ire</a>, <a href='http://github.com/wpmk2'>wpmk2</a>, <a href='http://github.com/tkarling'>tkarling</a></p>

        <h3>0.3.0</h3>
        <ul>
          <li>Add new Modal component</li>
          <li>Add touch events to RangeSelector</li>
          <li>Use default select on mobile devices for the Select component</li>
          <li>Update demo to be responsive</li>
        </ul>

        <h3>0.2.0</h3>
        <ul>
          <li>Add TypeAhead component</li>
          <li>Add npm scripts: `demo` and `release`</li>
          <li>Add support for TravisCi</li>
          <li>Exclude the `dist` directory from repo</li>
        </ul>

      </div>
    );
  }
});

module.exports = Changelog;