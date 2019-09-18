const React = require('react');

class Changelog extends React.Component {
  render () {
    return (
      <div>
        <h1>Change Log</h1>

        <h2>MX React Components V 6.5.0</h2>

        <h3>6.5.2</h3>
        <ul>
          <li>DateRangePicker - Render Props for custom trigger element. (<a href='https://github.com/mxenabled/mx-react-components/issues/841'>#841</a>)</li>
        </ul>

        <h3>6.5.0</h3>
        <ul>
          <li>MessageBox - Added the ability to set `aria-live` on parent element and `role` on content div. (<a href='https://github.com/mxenabled/mx-react-components/issues/840'>#840</a>)</li>
        </ul>

        <h2>MX React Components V 6.4.0</h2>

        <h3>6.4.0</h3>
        <ul>
          <li>MessageBox - Added the ability to add children. (<a href='https://github.com/mxenabled/mx-react-components/issues/839'>#839</a>)</li>
          <li>DisplayInput - Added the ability to add styles to parent container. (<a href='https://github.com/mxenabled/mx-react-components/issues/839'>#839</a>)</li>
        </ul>
        
        <h2>MX React Components V 6.3.0</h2>

        <h3>6.3.0</h3>
        <ul>
          <li>Fix Index.js file to work on case sensitive file systems. (<a href='https://github.com/mxenabled/mx-react-components/issues/835'>#835</a>)</li>
          <li>Replace findDOMNode calls with refs. (<a href='https://github.com/mxenabled/mx-react-components/issues/835'>#835</a>)</li>
          <li>Fix npm audit vulnerability. (<a href='https://github.com/mxenabled/mx-react-components/issues/837'>#837</a>) (<a href='https://github.com/mxenabled/mx-react-components/issues/838'>#838</a>)</li>
        </ul>

        <h2>MX React Components V 6.2.0</h2>

        <h3>6.2.0</h3>
        <ul>
          <li>Spin - Corrected default state for direction prop and corrected spin direction based on spin direction prop. (<a href='https://github.com/mxenabled/mx-react-components/issues/834'>#834</a>)</li>
        </ul>

        <h2>MX React Components V 6.1.0</h2>

          <h3>6.1.12</h3>
          <ul>
            <li>Select - Add ability to search dropdown options via withSearch prop. (<a href='https://github.com/mxenabled/mx-react-components/issues/832'>#832</a>)</li>
          </ul>

          <h3>6.1.11</h3>
          <ul>
            <li>Modal - Revert tabindex change due to Focus Trap error</li>
          </ul>

          <h3>6.1.10</h3>
          <ul>
            <li>Modal - Revert tabindex change due to Focus Trap error</li>
          </ul>

          <h3>6.1.9</h3>
          <ul>
            <li>DateRangePicker - Remove style override for focus state. (<a href='https://github.com/mxenabled/mx-react-components/pull/833'>#833</a>)</li>
            <li>Modal - General a11y improvements, remove default role and extraneous button properties. (<a href='https://github.com/mxenabled/mx-react-components/pull/833'>#833</a>)</li>
          </ul>

          <h3>6.1.8</h3>
          <ul>
            <li>DateRangePicker - Remove menu role for JAWS a11y issue. (<a href='https://github.com/mxenabled/mx-react-components/pull/831'>#831</a>)</li>
          </ul>

          <h3>6.1.7</h3>
          <ul>
            <li>Tab - Semantic HTML for Accessibility and default button style overrides. (<a href='https://github.com/mxenabled/mx-react-components/pull/828'>#828</a>)</li>
          </ul>

          <h3>6.1.6</h3>
          <ul>
            <li>DateRangePicker - Accessibility fix for colliding aria labels. (<a href='https://github.com/mxenabled/mx-react-components/pull/827'>#827</a>)</li>
          </ul>

          <h3>6.1.5</h3>
          <ul>
            <li>Select - Accessibility fix for focus state. (<a href='https://github.com/mxenabled/mx-react-components/pull/815'>#815</a>)</li>
            <li>DisplayInput - Accessibility fix for error state (<a href='https://github.com/mxenabled/mx-react-components/pull/823'>#823</a>)</li>
            <li>NPM Audit - Updated dependcies reported as having vulnerabilities (<a href='https://github.com/mxenabled/mx-react-components/pull/825'>#825</a>)</li>
          </ul>

          <h3>6.1.4</h3>
          <ul>
            <li>Drawer - Event propagation fix. Spin - Clear interval on unmount. (<a href='https://github.com/mxenabled/mx-react-components/pull/817'>#817</a>)</li>
            <li>DonutChart - Add new prop toggleDataLabelOnHover. See docs for details. (<a href='https://github.com/mxenabled/mx-react-components/pull/819'>#819</a>)</li>
            <li>SimpleSelect - Event propagation fix (<a href='https://github.com/mxenabled/mx-react-components/pull/820'>#820</a>)</li>
            <li>DateRangePicker - DefaultRanges a11y improvements (<a href='https://github.com/mxenabled/mx-react-components/pull/821'>#821</a>)</li>
          </ul>

          <h3>6.1.3</h3>
          <ul>
            <li>Split doc and dist package.json (<a href='https://github.com/mxenabled/mx-react-components/pull/812'>#812</a>)</li>
            <li>Export svg paths used in the Icon component for external use. (<a href='https://github.com/mxenabled/mx-react-components/pull/809'>#809</a>)</li>
            <li>Remove use of `useGlobalKeyHandler = true` in `SimpleSelect` and `Select`. (<a href='https://github.com/mxenabled/mx-react-components/pull/802'>#802</a>)</li>
          </ul>

          <h3>6.1.2</h3>
          <ul>
            <li>Move doc dependcies to dev (<a href='https://github.com/mxenabled/mx-react-components/pull/807'>#807</a>)</li>
          </ul>

          <h3>6.1.1</h3>
          <ul>
            <li>Fix doc releasing and bundle size (<a href='https://github.com/mxenabled/mx-react-components/pull/805'>#805</a>)</li>
          </ul>

        <h3>6.1.0</h3>
        <ul>
          <li>Update Babel and Webpack (<a href='https://github.com/mxenabled/mx-react-components/pull/801'>#801</a>)</li>
        </ul>

        <h3>6.0.1</h3>
        <ul>
          <li>MessageBox - Updates prop type (<a href='https://github.com/mxenabled/mx-react-components/pull/799'>#799</a>)</li>
        </ul>

        <h3>6.0.0</h3>
        <ul>
          <li>MessageBox - BREAKING CHANGES to update MessageBox component. Review the documentation (<a href='https://github.com/mxenabled/mx-react-components/pull/754'>#754</a>)</li>
          <li>DatePickerFullScren - Removes unsupported DatePickerFullScreen component (<a href='https://github.com/mxenabled/mx-react-components/pull/780'>#780</a>)</li>
          <li>RajaIcon - Removes unsupported RajaIcon component (<a href='https://github.com/mxenabled/mx-react-components/pull/781'>#781</a>)</li>
          <li>Icon - Removes outdated icons from Icon component (<a href='https://github.com/mxenabled/mx-react-components/pull/782'>#782</a>)</li>
          <li>Removes deprecated props in Button, ButtonGroup, Calendar, and DatePicker components (<a href='https://github.com/mxenabled/mx-react-components/pull/783'>#783</a>)</li>
          <li>Removes deprecated props in DateRangePicker, DefaultRanges, and SelectionPane components (<a href='https://github.com/mxenabled/mx-react-components/pull/784'>#784</a>)</li>
          <li>Removes deprecated props in DateTimePicker, DisplayInput, and Drawer components (<a href='https://github.com/mxenabled/mx-react-components/pull/785'>#785</a>)</li>
          <li>Removes deprecated props in Menu, Modal, and PaginationButtons components (<a href='https://github.com/mxenabled/mx-react-components/pull/786'>#786</a>)</li>
          <li>Removes deprecated props in RadioButton, RangeSelector, and Select components (<a href='https://github.com/mxenabled/mx-react-components/pull/787'>#787</a>)</li>
          <li>Removes deprecated props in SimpleInput, SimpleSelect, and SimpleSlider components (<a href='https://github.com/mxenabled/mx-react-components/pull/788'>#788</a>)</li>
          <li>Removes deprecated props in Tabs, and TextArea components. Updates mergeTheme style utils (<a href='https://github.com/mxenabled/mx-react-components/pull/789'>#789</a>)</li>
          <li>Removes deprecated props in SearchInput component (<a href='https://github.com/mxenabled/mx-react-components/pull/790'>#790</a>)</li>
          <li>Docs - Thorough audit of all component Docs (<a href='https://github.com/mxenabled/mx-react-components/pull/792'>#792</a>)</li>
          <li>Adds FocusTrap to export (<a href='https://github.com/mxenabled/mx-react-components/pull/793'>#793</a>)</li>
          <li>DateRangePicker - Fixes spacing (<a href='https://github.com/mxenabled/mx-react-components/pull/795'>#795</a>)</li>
          <li>Style - Updates shadows to the new spec (<a href='https://github.com/mxenabled/mx-react-components/pull/796'>#796</a>)</li>
          <li>Docs - Fixed typos found in docs (<a href='https://github.com/mxenabled/mx-react-components/pull/798'>#798</a>)</li>
        </ul>

        <h3>5.2.26</h3>
        <ul>
          <li>Fix Firefox/IE 11 bug in Select introduced in 5.2.25 (<a href='https://github.com/mxenabled/mx-react-components/pull/794'>#794</a>)</li>
        </ul>

        <h3>5.2.25</h3>
        <ul>
          <li>Icon Background Color (<a href='https://github.com/mxenabled/mx-react-components/pull/777'>#777</a>)</li>
          <li>DisplayInput - Fix a11y disable bug (<a href='https://github.com/mxenabled/mx-react-components/pull/779'>#779</a>)</li>
          <li>Select - a11y polish (<a href='https://github.com/mxenabled/mx-react-components/pull/776'>#776</a>)</li>
          <li>Tabs - a11y polish (<a href='https://github.com/mxenabled/mx-react-components/pull/768'>#768</a>)</li>
          <li>Tabs - Theme bug fix (<a href='https://github.com/mxenabled/mx-react-components/pull/791'>#791</a>)</li>
        </ul>

        <h3>5.2.24</h3>
        <ul>
          <li>Focus Trap Fix For Mobile (<a href='https://github.com/mxenabled/mx-react-components/pull/772'>#772</a>)</li>
          <li>New Waffle Icon (<a href='https://github.com/mxenabled/mx-react-components/pull/773'>#773</a>)</li>
          <li>Updates moment.js to fix vulnerability (<a href='https://github.com/mxenabled/mx-react-components/pull/774'>#774</a>)</li>
        </ul>

        <h3>5.2.22</h3>
        <ul>
          <li>Search Input Typo:(<a href='https://github.com/mxenabled/mx-react-components/pull/764'>#766</a>)</li>
        </ul>

        <h3>5.2.21</h3>
        <ul>
          <li>User Error publishing 5.2.20</li>
        </ul>

        <h3>5.2.20</h3>
        <ul>
          <li>SearchInput - Remove use of deprecated Simple Input props (<a href='https://github.com/mxenabled/mx-react-components/pull/764'>#763</a>)</li>
        </ul>

        <h3>5.2.19</h3>
        <ul>
          <li>Button - Fix react prop type warning (<a href='https://github.com/mxenabled/mx-react-components/pull/763'>#763</a>)</li>
          <li>DateRangePicker - Bug Fixes, a11y polish, code cleanup (<a href='https://github.com/mxenabled/mx-react-components/pull/758'>#758</a>)</li>
          <li>SimpleSelect - Fix esc key event listner (<a href='https://github.com/mxenabled/mx-react-components/pull/756'>#756</a>)</li>
          <li>Button - Allow more controll over styling (<a href='https://github.com/mxenabled/mx-react-components/pull/755'>#755</a>)</li>
        </ul>

        <h3>5.2.18</h3>
        <ul>
          <li>DateTimePicker - Bug Fix (<a href='https://github.com/mxenabled/mx-react-components/pull/753'>#753</a>)</li>
          <li>DateRangePicker - Default Date Ranges now a11y (<a href='https://github.com/mxenabled/mx-react-components/pull/752'>#752</a>)</li>
        </ul>

        <h3>5.2.17</h3>
        <ul>
          <li>Drawer - New props animateOnClose and closeButtonAriaLabel(See updated Drawer docs) (<a href='https://github.com/mxenabled/mx-react-components/pull/750'>#750</a>)</li>
          <li>DateRangePicker - CSS styling bug fix (<a href='https://github.com/mxenabled/mx-react-components/pull/751'>#751</a>)</li>
        </ul>

        <h3>5.2.16</h3>
        <ul>
          <li>updated secondary button styling to match ADA AA standards (<a href='https://github.com/mxenabled/mx-react-components/pull/748'>#748</a>)</li>
        </ul>

        <h3>5.2.15</h3>
        <ul>
          <li>a11y tweaks to the DateRangePicker component (<a href='https://github.com/mxenabled/mx-react-components/pull/747'>#747</a>)</li>
        </ul>

        <h3>5.2.14</h3>
        <ul>
          <li>Reverts broken changes in 5.2.13 release but keeps accessibility fix in DisplayInput (<a href='https://github.com/mxenabled/mx-react-components/pull/746'>#746</a>)</li>
        </ul>

        <h3>Broken/Unpublished 5.2.13</h3>
        <ul>
          <li>Fixes accessibility issue in DisplayInput component (<a href='https://github.com/mxenabled/mx-react-components/pull/745'>#745</a>)</li>
          <li>Replaces FocusTrap library with new component RestrictFocusToChildren(See docs for more details) (<a href='https://github.com/mxenabled/mx-react-components/pull/744'>#744</a>)</li>
        </ul>

        <h3>5.2.12</h3>
        <ul>
          <li>Add more class names various components (<a href='https://github.com/mxenabled/mx-react-components/pull/743'>#743</a>)</li>
        </ul>

        <h3>5.2.11</h3>
        <ul>
          <li>Add top-level classes to all components (<a href='https://github.com/mxenabled/mx-react-components/pull/742'>#742</a>)</li>
        </ul>

        <h3>5.2.10</h3>
        <ul>
          <li>Corrects Drawer title header level for accessibility (<a href='https://github.com/mxenabled/mx-react-components/pull/741'>#741</a>)</li>
        </ul>

        <h3>5.2.9</h3>
        <ul>
          <li>Fix bug with Drawer introduced in 5.2.8 (<a href='https://github.com/mxenabled/mx-react-components/pull/740'>#740</a>)</li>
        </ul>

        <h3>5.2.8</h3>
        <ul>
          <li>Accessibility improvements - Calendar, DateRangePicker, and Drawer (<a href='https://github.com/mxenabled/mx-react-components/pull/739'>#739</a>)</li>
        </ul>

        <h3>5.2.7</h3>
        <ul>
          <li>Accessibility improvements - SimpleSelect (<a href='https://github.com/mxenabled/mx-react-components/pull/738'>#738</a>)</li>
        </ul>

        <h3>5.2.6</h3>
        <ul>
          <li>Accessibility improvements - Modal (<a href='https://github.com/mxenabled/mx-react-components/pull/735'>#735</a>)</li>
          <li>Accessibility improvements - Drawer (<a href='https://github.com/mxenabled/mx-react-components/pull/736'>#736</a>)</li>
        </ul>

        <h3>5.2.5</h3>
        <ul>
          <li>The primaryColor prop should take precedence (<a href='https://github.com/mxenabled/mx-react-components/pull/737'>#737</a>)</li>
        </ul>

        <h3>5.2.4</h3>
        <ul>
          <li>Select component children function handler and elementRef fix (<a href='https://github.com/mxenabled/mx-react-components/pull/734'>#734</a>)</li>
        </ul>

        <h3>5.2.3</h3>
        <ul>
          <li>Accessibility improvements to DateRangePicker component (<a href='https://github.com/mxenabled/mx-react-components/pull/731'>#731</a>)</li>
          <li>Adds new props to Modal component to control focus on mount and focus trap (<a href='https://github.com/mxenabled/mx-react-components/pull/733'>#733</a>)</li>
        </ul>

        <h3>5.2.2</h3>
        <ul>
          <li>Ensure withTheme wrapped components work with ref (<a href='https://github.com/mxenabled/mx-react-components/pull/732'>#732</a>)</li>
        </ul>

        <h3>5.2.1</h3>
        <ul>
          <li>Accessibility improvements to Calendar component used in DatePicker component (<a href='https://github.com/mxenabled/mx-react-components/pull/730'>#730</a>)</li>
        </ul>

        <h3>5.2.0</h3>
        <ul>
          <li>New ThemeProvider component for easier theming (<a href='https://github.com/mxenabled/mx-react-components/pull/721'>#721</a>)</li>
          <li>Fix regression with styling of the Modal footer buttons (<a href='https://github.com/mxenabled/mx-react-components/pull/729'>#729</a>)</li>
        </ul>

        <h3>5.1.33</h3>
        <ul>
          <li>Fix state issues in DateRangePicker component (<a href='https://github.com/mxenabled/mx-react-components/pull/728'>#728</a>)</li>
        </ul>

        <h3>5.1.32</h3>
        <ul>
          <li>Theme cancel and apply buttons in DateRangePicker component (<a href='https://github.com/mxenabled/mx-react-components/pull/727'>#727</a>)</li>
        </ul>

        <h3>5.1.31</h3>
        <ul>
          <li>Slight Design refresh of DateRangePicker component(<a href='https://github.com/mxenabled/mx-react-components/pull/724'>#724</a>)</li>
          <li>Fix request animation frame console error(<a href='https://github.com/mxenabled/mx-react-components/pull/725'>#725</a>)</li>
          <li>Fix regression in Button component hover state(<a href='https://github.com/mxenabled/mx-react-components/pull/726'>#726</a>)</li>
        </ul>

        <h3>5.1.30</h3>
        <ul>
          <li>Update to SimpleInput component and new Icons(<a href='https://github.com/mxenabled/mx-react-components/pull/722'>#722</a>)</li>
        </ul>

        <h3>5.1.28</h3>
        <ul>
          <li>Check for component before getting offsetWidth in RangeSelector(<a href='https://github.com/mxenabled/mx-react-components/pull/720'>#720</a>)</li>
        </ul>

        <h3>5.1.27</h3>
        <ul>
          <li>Fixes issue with focus trap library in Drawer and Modal components(<a href='https://github.com/mxenabled/mx-react-components/pull/719'>#719</a>)</li>
        </ul>

        <h3>5.1.26</h3>
        <ul>
          <li>Adds focusTrapProps prop to Drawer component(<a href='https://github.com/mxenabled/mx-react-components/pull/716'>#716</a>)</li>
        </ul>

        <h3>5.1.25</h3>
        <ul>
          <li>Adds onKeyUp prop to Drawer component(<a href='https://github.com/mxenabled/mx-react-components/pull/715'>#715</a>)</li>
        </ul>

        <h3>5.1.24</h3>
        <ul>
          <li>Accessibility fix for Drawer component close button(<a href='https://github.com/mxenabled/mx-react-components/pull/714'>#714</a>)</li>
        </ul>

        <h3>5.1.23</h3>
        <ul>
          <li>Removes Radium from button component, adds glamor as dep(<a href='https://github.com/mxenabled/mx-react-components/pull/713'>#713</a>)</li>
        </ul>

        <h3>5.1.22</h3>
        <ul>
          <li>Accessibility Fix and functionality additions to Drawer component(<a href='https://github.com/mxenabled/mx-react-components/pull/711'>#711</a>)</li>
          <li>Fixes closeOnScrimClick prop warning for Drawer component(<a href='https://github.com/mxenabled/mx-react-components/pull/710'>#710</a>)</li>
        </ul>
        <h3>5.1.21</h3>
        <ul>
          <li>Accessibility Fixes to Calendar component(<a href='https://github.com/mxenabled/mx-react-components/pull/707'>#707</a>)</li>
        </ul>

        <h3>5.1.20</h3>
        <ul>
          <li>Remove getComputedStyles from RangeSelector(<a href='https://github.com/mxenabled/mx-react-components/pull/706'>#706</a>)</li>
        </ul>

        <h3>5.1.19</h3>
        <ul>
          <li>Fix "Last Year" default option for DateRangePicker(<a href='https://github.com/mxenabled/mx-react-components/pull/704'>#704</a>)</li>
          <li>Added e.preventDefault before onScrimClick prop - note if users were relyinig on the event being passed to the callback, this will be a breaking change.(<a href='https://github.com/mxenabled/mx-react-components/pull/703'>#703</a>)</li>
          <li>Update SimpleInput docs(<a href='https://github.com/mxenabled/mx-react-components/pull/702'>#702</a>)</li>
          <li>Adds refs to focusable components(<a href='https://github.com/mxenabled/mx-react-components/pull/699'>#699</a>)</li>
        </ul>
        <p>New Contributors: <a href='https://github.com/markstewy'>markstewy</a></p>

        <h3>5.1.18</h3>
        <ul>
          <li>Fixed tests for Calendar (<a href='https://github.com/mxenabled/mx-react-components/pull/700'>#700</a>)</li>
          <li>Fix breaking func in date time picker. (<a href='https://github.com/mxenabled/mx-react-components/pull/698'>#698</a>)</li>
          <li>Only Prevent Default on up or down arrow keypress in calendar. (<a href='https://github.com/mxenabled/mx-react-components/pull/697'>#697</a>)</li>
        </ul>

        <h3>5.1.17</h3>
        <ul>
          <li>Change calendar day tag to anchor tag for accessibility, focasability (<a href='https://github.com/mxenabled/mx-react-components/pull/696'>#696</a>)</li>
        </ul>

        <h3>5.1.16</h3>
        <ul>
          <li>Fixes a bug with the way the Calendar is exported (<a href='https://github.com/mxenabled/mx-react-components/pull/695'>#695</a>)</li>
        </ul>

        <h3>5.1.15</h3>
        <ul>
          <li>Improved Calendar accessibility and keyboard navagability (<a href='https://github.com/mxenabled/mx-react-components/pull/691'>#691</a>)</li>
        </ul>

        <h3>5.1.14</h3>
        <ul>
          <li>Merging Modal Styles with Styles prop (<a href='https://github.com/mxenabled/mx-react-components/pull/694'>#694</a>)</li>
        </ul>

        <h3>5.1.13</h3>
        <ul>
          <li>Fix regression in header style when there is no item on the right (<a href='https://github.com/mxenabled/mx-react-components/pull/693'>#693</a>)</li>
        </ul>

        <h3>5.1.12</h3>
        <ul>
          <li>Change back icon in Drawer. Update header styles (<a href='https://github.com/mxenabled/mx-react-components/pull/692'>#692</a>)</li>
        </ul>

        <h3>5.1.11</h3>
        <ul>
          <li>Allow clicking on elements outside focus trap (<a href='https://github.com/mxenabled/mx-react-components/pull/690'>#690</a>)</li>
        </ul>

        <h3>5.1.10</h3>
        <ul>
          <li>Modal Accessibility Improvements (<a href='https://github.com/mxenabled/mx-react-components/pull/686'>#686</a>)</li>
        </ul>

        <h3>5.1.9</h3>
        <ul>
          <li>Tweaks to SimpleSelect component to make accessibility easier (<a href='https://github.com/mxenabled/mx-react-components/pull/688'>#688</a>)</li>
        </ul>

        <h3>5.1.8</h3>
        <ul>
          <li>Adds new prop focusOnLoad to Drawer component (<a href='https://github.com/mxenabled/mx-react-components/pull/684'>#684</a>)</li>
        </ul>

        <h3>5.1.7</h3>
        <ul>
          <li>Removes the need to use elementProps on the Button and ButtonGroup components. Still supports elementProps for backwards compatibility. (<a href='https://github.com/mxenabled/mx-react-components/pull/683'>#683</a>)</li>
        </ul>

        <h3>5.1.6</h3>
        <ul>
          <li>Adds elementProps prop to Button component (<a href='https://github.com/mxenabled/mx-react-components/pull/681'>#681</a>)</li>
        </ul>

        <h3>5.1.5</h3>
        <ul>
          <li>DateRangePicker Accessibility updates (<a href='https://github.com/mxenabled/mx-react-components/pull/680'>#680</a>)</li>
        </ul>

        <h3>5.1.4</h3>
        <ul>
          <li>Setup Jest for testing.  (<a href='https://github.com/mxenabled/mx-react-components/pull/678'>#678</a>)</li>
        </ul>

        <h3>5.1.3</h3>
        <ul>
          <li>Added new lock icon.  (<a href='https://github.com/mxenabled/mx-react-components/pull/679'>#679</a>)</li>
        </ul>

        <h3>5.1.2</h3>
        <ul>
          <li>Previous attempt to update focus-trap-react didn't work.  This should resolve the issue.  (<a href='https://github.com/mxenabled/mx-react-components/pull/676'>#676</a>)</li>
        </ul>

        <h3>5.1.1</h3>
        <ul>
          <li>Updates focus-trap-react library to fix IE 11 error with Modal and returning focus (<a href='https://github.com/mxenabled/mx-react-components/pull/675'>#675</a>)</li>
        </ul>

        <h3>5.1.0</h3>
        <ul>
          <li>New 'pill' style added to the Tabs component (<a href='https://github.com/mxenabled/mx-react-components/pull/672'>#672</a>)</li>
        </ul>

        <h3>5.0.11</h3>
        <ul>
          <li>DisplayInput column uses full row if there's no label or hint(<a href='https://github.com/mxenabled/mx-react-components/pull/674'>#674</a>)</li>
        </ul>

        <h3>5.0.10</h3>
        <ul>
          <li>Fixes ToggleSwitch in ie11(<a href='https://github.com/mxenabled/mx-react-components/pull/673'>#673</a>)</li>
        </ul>

        <h3>5.0.9</h3>
        <ul>
          <li>Properly set Icon default props (<a href='https://github.com/mxenabled/mx-react-components/pull/670'>#670</a>)</li>
        </ul>

        <h3>5.0.8</h3>
        <ul>
          <li>React 16 Upgrade (<a href='https://github.com/mxenabled/mx-react-components/pull/666'>#666</a>)</li>
        </ul>

        <h3>5.0.7</h3>
        <ul>
          <li>Locks down Moment.js to version 2.18.1 due to this issue <a href='https://github.com/moment/moment/issues/4216'>https://github.com/moment/moment/issues/4216</a></li>
        </ul>

        <h3>5.0.6</h3>
        <ul>
          <li>Remove DonutChart label click handler (<a href='https://github.com/mxenabled/mx-react-components/pull/666'>#666</a>)</li>
          <li>Use a tags in certain instances in DateRangePicker for accessibility (<a href='https://github.com/mxenabled/mx-react-components/pull/665'>#665</a>)</li>
          <li>Change column widths for DisplayInput (<a href='https://github.com/mxenabled/mx-react-components/pull/664'>#664</a>)</li>
        </ul>

        <h3>5.0.5</h3>
        <ul>
          <li>Made DateRangePicker more accessible by adding keyboard navigation support (<a href='https://github.com/mxenabled/mx-react-components/pull/662'>#662</a>)</li>
        </ul>

        <h3>5.0.4</h3>
        <ul>
          <li>State to manage which default range the user clicked on (<a href='https://github.com/mxenabled/mx-react-components/pull/659'>#659</a>)</li>
          <li>Fix Drawer header size (<a href='https://github.com/mxenabled/mx-react-components/pull/661'>#661</a>)</li>
        </ul>

        <h3>5.0.3</h3>
        <ul>
          <li>Fix file upload validation (<a href='https://github.com/mxenabled/mx-react-components/pull/660'>#660</a>)</li>
        </ul>

        <h3>5.0.2</h3>
        <ul>
          <li>Bug fix in TimeBasedLineChart (<a href='https://github.com/mxenabled/mx-react-components/pull/658'>#658</a>)</li>
        </ul>

        <h3>5.0.1</h3>
        <ul>
          <li>DateRangePicker - Updating to use _merge and a nested object for styles prop (<a href='https://github.com/mxenabled/mx-react-components/pull/653'>#653</a>)</li>
          <li>DisplayInput - Updating to use _merge and a nested object for styles prop (<a href='https://github.com/mxenabled/mx-react-components/pull/656'>#656</a>)</li>
        </ul>

        <h3>v5 Release Notes</h3>
        <ul>
          <li>
            Updates to React 15.5
          </li>
          <li>
            Updates to ES6 Classes
          </li>
          <li>
            Adds ability to apply theme to components
          </li>
          <li>
            Adds ability to set default timezone for moment within package
          </li>
          <li>
            Makes several components more accessible
          </li>
          <li>
            Adds many new icons to the Icon component
          </li>
          <li>
            D3 Chart components revamped to work better with React and be more reusable
          </li>
          <li>
            Revamps DateRangePicker component to be more responsive and user friendly
          </li>
          <li>
            Adds new component Menu(<a href='https://github.com/mxenabled/mx-react-components/pull/436'>#436</a>)
          </li>
          <li>
            Adds new component MessageBox(<a href='https://github.com/mxenabled/mx-react-components/pull/490'>#490</a>)
          </li>
          <li>
            Adds new component NotifyOnScrollThreshold(<a href='https://github.com/mxenabled/mx-react-components/pull/496'>#496</a>)
          </li>
          <li>
            Adds new component PaginationButtons(<a href='https://github.com/mxenabled/mx-react-components/pull/491'>#491</a>)
          </li>
          <li>
            Adds new component SimpleSlider(<a href='https://github.com/mxenabled/mx-react-components/pull/466'>#466</a>)
          </li>
          <li>
            Adds new component TextArea(<a href='https://github.com/mxenabled/mx-react-components/pull/435'>#435</a>)
          </li>
          <li>
            Various bug fixes
          </li>
          <li>
            Various style polishing
          </li>
          <li>
            Updates and changes to Style constants(<a href='https://github.com/mxenabled/mx-react-components/blob/master/src/constants/Style.js'>Style.js</a>)
          </li>
        </ul>

        <h3>v5 Breaking Changes</h3>
        <ul>
          <li>
            Changes parts of the DateRangePicker and TimeBasedLineChart APIs. Date props are now functions instead of values (<a href='https://github.com/mxenabled/mx-react-components/pull/652'>#652</a>).
          </li>
          <li>
            Fixes React unknown prop warnings on various components(<a href='https://github.com/mxenabled/mx-react-components/pull/426'>#426</a>)
          </li>
          <li>
            Removes xsmall breakpoint in style constants (<a href='https://github.com/mxenabled/mx-react-components/pull/597'>#597</a>).
          </li>
          <li>
            Updates the medium breakpoint to 768px to align better with the ipad and other tablets.(<a href='https://github.com/mxenabled/mx-react-components/pull/461'>#461</a>)
          </li>
        </ul>

        <h3>v5 Complete Change log</h3>
        <ul>
          <li>
            Changes parts of the DateRangePicker and TimeBasedLineChart APIs. Date props are now functions instead of values (<a href='https://github.com/mxenabled/mx-react-components/pull/652'>#652</a>).
          </li>
          <li>
            Re adds componentWillReceiveProps to DateRangePicker (<a href='https://github.com/mxenabled/mx-react-components/pull/651'>#651</a>).
          </li>
          <li>
            Remove old DateRangePicker code (<a href='https://github.com/mxenabled/mx-react-components/pull/643'>#643</a>).
          </li>
          <li>
            Fix Moment UTC bug in DateRangePicker (<a href='https://github.com/mxenabled/mx-react-components/pull/649'>#649</a>).
          </li>
          <li>
            Fix for common height issues in Drawer component. (<a href='https://github.com/mxenabled/mx-react-components/pull/646'>#646</a>).
          </li>
          <li>
            Adds mechanism for setting default moment time zone (<a href='https://github.com/mxenabled/mx-react-components/pull/645'>#645</a>).
          </li>
          <li>
            Adds new submit-feedback icon to Icon component (<a href='https://github.com/mxenabled/mx-react-components/pull/644'>#644</a>).
          </li>
          <li>
            Adds two callback props to Drawer, onOpen and beforeClose (<a href='https://github.com/mxenabled/mx-react-components/pull/639'>#639</a>).
          </li>
          <li>
            Implements shouldComponentUpdate in Icon component (<a href='https://github.com/mxenabled/mx-react-components/pull/640'>#640</a>).
          </li>
          <li>
            Polish DateRangePicker UI & styling (<a href='https://github.com/mxenabled/mx-react-components/pull/641'>#641</a>).
          </li>
          <li>
            Updates position styling for DateRangePicker mobile bug(<a href='https://github.com/mxenabled/mx-react-components/pull/637'>#637</a>).
          </li>
          <li>
            Adds a test DateRangePicker (<a href='https://github.com/mxenabled/mx-react-components/pull/635'>#635</a>).
          </li>
          <li>
            DateRangePicker - Only show calendar icon at larger resolutions (<a href='https://github.com/mxenabled/mx-react-components/pull/636'>#636</a>).
          </li>
          <li>
            Adds default focusable=false and aria-hidden=true to svg in Icon (<a href='https://github.com/mxenabled/mx-react-components/pull/634'>#634</a>).
          </li>
          <li>
            Adds focusable=false attribute to SVGs in buttons (<a href='https://github.com/mxenabled/mx-react-components/pull/633'>#633</a>).
          </li>
          <li>
            Fixes overlaping x axis labels in TimeBasedLineChart (<a href='https://github.com/mxenabled/mx-react-components/pull/631'>#631</a>).
          </li>
          <li>
            Removes xsmall breakpoint in style constants (<a href='https://github.com/mxenabled/mx-react-components/pull/597'>#597</a>).
          </li>
          <li>
            Fixes bug with the file type and extension validation in FileUpload (<a href='https://github.com/mxenabled/mx-react-components/pull/630'>#630</a>).
          </li>
          <li>
            Allows extensions to be used in `allowedFileTypes` of FileUpload (<a href='https://github.com/mxenabled/mx-react-components/pull/629'>#629</a>).
          </li>
          <li>
            Adds default error messages with file and/or image validation fails on FileUpload (<a href='https://github.com/mxenabled/mx-react-components/pull/629'>#629</a>).
          </li>
          <li>
            Allows for customizing the input type of DisplayInput (<a href='https://github.com/mxenabled/mx-react-components/pull/593'>#593</a>).
          </li>
          <li>
            Fixes display issues with the Calendar component (<a href='https://github.com/mxenabled/mx-react-components/pull/590'>#590</a>).
          </li>
          <li>
            Adds buttonRef for calling focus etc. on the Button component (<a href='https://github.com/mxenabled/mx-react-components/pull/584'>#584</a>).
          </li>
          <li>
            Fixes DateRangePicker month title (<a href='https://github.com/mxenabled/mx-react-components/pull/580'>#580</a>).
          </li>
          <li>
            Fixes Select scrim click (<a href='https://github.com/mxenabled/mx-react-components/pull/578'>#578</a>).
          </li>
          <li>
            Fixes select isSelected highlighting (<a href='https://github.com/mxenabled/mx-react-components/pull/579'>#579</a>).
          </li>
          <li>
            Fixes typo in Select component (<a href='https://github.com/mxenabled/mx-react-components/pull/577'>#577</a>).
          </li>
          <li>
            Select accessibility updates (<a href='https://github.com/mxenabled/mx-react-components/pull/571'>#571</a>).
          </li>
          <li>
            Adds OTHER as a category color in Style constants  (<a href='https://github.com/mxenabled/mx-react-components/pull/576'>#576</a>).
          </li>
          <li>
            Defaults DateRangePicker to last date (<a href='https://github.com/mxenabled/mx-react-components/pull/572'>#572</a>).
          </li>
          <li>
            Adds new appliances icon (<a href='https://github.com/mxenabled/mx-react-components/pull/568'>#568</a>).
          </li>
          <li>
            Updates package.json scripts using yarn (<a href='https://github.com/mxenabled/mx-react-components/pull/569'>#569</a>).
          </li>
          <li>
            DisplayInput fix for custom id (<a href='https://github.com/mxenabled/mx-react-components/pull/570'>#570</a>).
          </li>
          <li>
            Upgrades to React 15.5 (<a href='https://github.com/mxenabled/mx-react-components/pull/560'>#560</a>).
          </li>
          <li>
            Converts DonutChart from createClass to ES6 class (<a href='https://github.com/mxenabled/mx-react-components/pull/550'>#550</a>).
          </li>
          <li>
            Converts Drawer from createClass to ES6 class (<a href='https://github.com/mxenabled/mx-react-components/pull/551'>#551</a>).
          </li>
          <li>
            Converts FileUpload from createClass to ES6 class (<a href='https://github.com/mxenabled/mx-react-components/pull/552'>#552</a>).
          </li>
          <li>
            Converts Gauge from createClass to ES6 class (<a href='https://github.com/mxenabled/mx-react-components/pull/553'>#553</a>).
          </li>
          <li>
            Converts HeaderMenu from createClass to ES6 class (<a href='https://github.com/mxenabled/mx-react-components/pull/562'>#562</a>).
          </li>
          <li>
            Converts Loader from createClass to ES6 class (<a href='https://github.com/mxenabled/mx-react-components/pull/564'>#564</a>).
          </li>
          <li>
            Remaining Components converted from creatClass to ES6 classes (<a href='https://github.com/mxenabled/mx-react-components/pull/565'>#565</a>).
          </li>
          <li>
            Converted docs from creatClass to ES6 classes (<a href='https://github.com/mxenabled/mx-react-components/pull/566'>#566</a>).
          </li>
          <li>
            Rename ariaLabel to aria-label to match React's naming conventions (<a href='https://github.com/mxenabled/mx-react-components/pull/561'>#561</a>).
          </li>
          <li>
            Add esc key handling to SimpleSelect (<a href='https://github.com/mxenabled/mx-react-components/pull/558'>#558</a>).
            Use a label tag for the DisplayInput label (<a href='https://github.com/mxenabled/mx-react-components/pull/559'>#559</a>).
          </li>
          <li>
            SimpleSelect accessibility using Listbox/Option (<a href='https://github.com/mxenabled/mx-react-components/pull/556'>#556</a>)
            (<a href='https://github.com/mxenabled/mx-react-components/pull/557'>#557</a>).
          </li>
          <li>
            SimpleSelect accessibility using Listbox/Option (<a href='https://github.com/mxenabled/mx-react-components/pull/556'>#556</a>).
          </li>
          <li>
            DisplayInput children styles (<a href='https://github.com/mxenabled/mx-react-components/pull/555'>#555</a>).
          </li>
          <li>
            Adds displayValue as argument to onDateSelect call in DateRangePicker (<a href='https://github.com/mxenabled/mx-react-components/pull/554'>#554</a>).
          </li>
          <li>
            Adds ariaLabel prop on Modal (<a href='https://github.com/mxenabled/mx-react-components/pull/548'>#548</a>).
          </li>
          <li>
            Makes Modal always have focusable content (<a href='https://github.com/mxenabled/mx-react-components/pull/547'>#547</a>)
          </li>
          <li>
            Traps focus in Modal, adds focus trap library (<a href='https://github.com/mxenabled/mx-react-components/pull/537'>#537</a>)
          </li>
          <li>
            Traps focus in Drawer (<a href='https://github.com/mxenabled/mx-react-components/pull/543'>#543</a>)
          </li>
          <li>
            Fix issue with onBlur in SimpleInput (<a href='https://github.com/mxenabled/mx-react-components/pull/545'>#545</a>)
          </li>
          <li>
            Allows button component to be passed children with "visuallyHidden" class for accessibility (<a href='https://github.com/mxenabled/mx-react-components/pull/541'>#541</a>)
          </li>
          <li>
            Adds minBarHeight prop to the BarChart component (<a href='https://github.com/mxenabled/mx-react-components/pull/535'>#535</a>)
          </li>
          <li>
            Moves style deprecated warning to a util (<a href='https://github.com/mxenabled/mx-react-components/pull/540'>#540</a>)
          </li>
          <li>
            SimpleInput shift+tab accessibility fix (<a href='https://github.com/mxenabled/mx-react-components/pull/536'>#536</a>)
          </li>
          <li>
            Add aria-label and tabIndex to the drawer for accessibility. (<a href='https://github.com/mxenabled/mx-react-components/pull/532'>#533</a>)
          </li>
          <li>
            Add threshold to BarChart (<a href='https://github.com/mxenabled/mx-react-components/pull/533'>#533</a>)
          </li>
          <li>
            DisplayInput - prevent input text clipping (<a href='https://github.com/mxenabled/mx-react-components/pull/531'>#531</a>)
          </li>
          <li>
            Fixes DateRangePicker options wrapper width (<a href='https://github.com/mxenabled/mx-react-components/pull/530'>#530</a>)
          </li>
          <li>
            Makes Modal More accessible (<a href='https://github.com/mxenabled/mx-react-components/pull/528'>#528</a>)
          </li>
          <li>
            Create Class conversion (<a href='https://github.com/mxenabled/mx-react-components/pull/520'>#520</a>)
          </li>
          <li>
            Changed fontsize in message box component to MEDIUM (<a href='https://github.com/mxenabled/mx-react-components/pull/517'>#517yarn</a>)
          </li>
          <li>
            Adds a styles prop to the Container component (<a href='https://github.com/mxenabled/mx-react-components/pull/527'>#527</a>)
          </li>
          <li>
            Style Polish and Fixes for default range options in DateRangePicker (<a href='https://github.com/mxenabled/mx-react-components/pull/526'>#526</a>)
          </li>
          <li>
            Fixes overflow rule in Safari to allow the display of modals inside a Drawer (<a href='https://github.com/mxenabled/mx-react-components/pull/523'>#523</a>)
          </li>
          <li>
            Adds Needle Icon Component (<a href='https://github.com/mxenabled/mx-react-components/pull/522'>#522</a>)
          </li>
          <li>
            Fixes border bug in ButtonGroup in Safari (<a href='https://github.com/mxenabled/mx-react-components/pull/521'>#521</a>)
          </li>
          <li>
            Makes all input text Charcoal (<a href='https://github.com/mxenabled/mx-react-components/pull/516'>#516</a>)
          </li>
          <li>
            CreateClass to Class Conversion - ButtonGroup (<a href='https://github.com/mxenabled/mx-react-components/pull/509'>#509</a>)
          </li>
          <li>
            CreateClass to Class Conversion - Calendar (<a href='https://github.com/mxenabled/mx-react-components/pull/510'>#510</a>)
          </li>
          <li>
            Added primary color prop for Select Component (<a href='https://github.com/mxenabled/mx-react-components/pull/513'>#513</a>)
          </li>
          <li>
            Updated Gray Colors for Greater Accessibility and Contrast (<a href='https://github.com/mxenabled/mx-react-components/pull/515'>#515</a>)
          </li>
          <li>
            Style polish to DateRangePicker (<a href='https://github.com/mxenabled/mx-react-components/pull/511'>#511</a>)
          </li>
          <li>
            Converts Button component from createClass to ES6 class (<a href='https://github.com/mxenabled/mx-react-components/pull/506'>#506</a>)
          </li>
          <li>
            Large refactor of the bar chart (<a href='https://github.com/mxenabled/mx-react-components/pull/502'>#502</a>)
          </li>
          <li>
            Button/ButtonGroup refactor for accessibility (aria) (<a href='https://github.com/mxenabled/mx-react-components/pull/508'>#508</a>)
          </li>
          <li>
            SimpleSelect supports props.children over props.items (<a href='https://github.com/mxenabled/mx-react-components/pull/507'>#507</a>)
          </li>
          <li>
            Responsive Date Range Picker (<a href='https://github.com/mxenabled/mx-react-components/pull/505'>#505</a>)
          </li>
          <li>
            Adds a backgroundColor prop to the select component (<a href='https://github.com/mxenabled/mx-react-components/pull/503'>#503</a>)
          </li>
          <li>
            Add linearGradient helper to Styles (<a href='https://github.com/mxenabled/mx-react-components/pull/501'>#501</a>)
          </li>
          <li>
            Change MessageBox header to semibold (<a href='https://github.com/mxenabled/mx-react-components/pull/500'>#500</a>)
          </li>
          <li>
            Add navConfig back into Drawer component to keep backward compatibility. (<a href='https://github.com/mxenabled/mx-react-components/pull/498'>#498</a>)
          </li>
          <li>
            Allows you to pass component to Drawer header. (<a href='https://github.com/mxenabled/mx-react-components/pull/497'>#497</a>)
          </li>
          <li>
            Added NotifyOnScrollThreshold Component. (<a href='https://github.com/mxenabled/mx-react-components/pull/496'>#496</a>)
          </li>
          <li>
            Added PaginationButtons Component. (<a href='https://github.com/mxenabled/mx-react-components/pull/491'>#491</a>)
          </li>
          <li>
            Added support for disabled buttons in ButtonGroups Component. (<a href='https://github.com/mxenabled/mx-react-components/pull/494'>#494</a>)
          </li>
          <li>
            TimeBasedLineChart bug fixes and style polish(<a href='https://github.com/mxenabled/mx-react-components/pull/493'>#493</a>)
          </li>
          <li>
            Fixes issue in Drawer component with new version of Radium(<a href='https://github.com/mxenabled/mx-react-components/pull/492'>#492</a>)
          </li>
          <li>
            Adds new component MessageBox(<a href='https://github.com/mxenabled/mx-react-components/pull/490'>#490</a>)
          </li>
          <li>
            Adds Yarn, Updates Radium, and fixes docs issues(<a href='https://github.com/mxenabled/mx-react-components/pull/489'>#489</a>)
          </li>
          <li>
            Added another icon. (<a href='https://github.com/mxenabled/mx-react-components/pull/488'>#488</a>)
          </li>
          <li>
            Added more icons. (<a href='https://github.com/mxenabled/mx-react-components/pull/486'>#486</a>)
          </li>
          <li>
            Update to Style Color Constants(<a href='https://github.com/mxenabled/mx-react-components/pull/484'>#484</a>)
          </li>
          <li>
            Button Component: New primaryInverse type(<a href='https://github.com/mxenabled/mx-react-components/pull/483'>#483</a>)
          </li>
          <li>
            Fix for y range and tick values in D3 chart utils(<a href='https://github.com/mxenabled/mx-react-components/pull/479'>#479</a>)
          </li>
          <li>
            Update SimpleSlider Component.(<a href='https://github.com/mxenabled/mx-react-components/pull/476'>#476</a>)
          </li>
          <li>
            Chart utils getDataMinMaxValues function fix(<a href='https://github.com/mxenabled/mx-react-components/pull/478'>#478</a>)
          </li>
          <li>
            Adds ability to have an overlay for circles in D3 CircleGroup component(<a href='https://github.com/mxenabled/mx-react-components/pull/477'>#477</a>)
          </li>

          <li>
            Make Button more accessible.(<a href='https://github.com/mxenabled/mx-react-components/pull/475'>#475</a>)
          </li>
          <li>
            Add `scrimClickOnSelect` prop to SimpleSelect.(<a href='https://github.com/mxenabled/mx-react-components/pull/473'>#473</a>)
          </li>
          <li>
            Added `bell`, `net-worth2`, and `pointer` icons.(<a href='https://github.com/mxenabled/mx-react-components/pull/472'>#472</a>)
          </li>
          <li>
            Adds new SimpleSlider component(<a href='https://github.com/mxenabled/mx-react-components/pull/466'>#466</a>)
          </li>
          <li>
            Update SimpleSelect to use stlyes object.(<a href='https://github.com/mxenabled/mx-react-components/pull/471'>#471</a>)
          </li>
          <li>
            More changes to CirlceGroup.(<a href='https://github.com/mxenabled/mx-react-components/pull/470'>#470</a>)
          </li>
          <li>
            Minor fixes to CirlceGroup.(<a href='https://github.com/mxenabled/mx-react-components/pull/469'>#469</a>)
          </li>
          <li>
            Convert refs from strings to callbacks.(<a href='https://github.com/mxenabled/mx-react-components/pull/468'>#468</a>)
          </li>
          <li>
            Fixes layout of DatePicker on small screens.(<a href='https://github.com/mxenabled/mx-react-components/pull/467'>#467</a>)
          </li>
          <li>
            Add Pause icon.(<a href='https://github.com/mxenabled/mx-react-components/pull/465'>#465</a>)
          </li>
          <li>
            Add brand color to icon in Tabs.(<a href='https://github.com/mxenabled/mx-react-components/pull/463'>#463</a>)
          </li>
          <li>
            Expose D3 elements.(<a href='https://github.com/mxenabled/mx-react-components/pull/462'>#462</a>)
          </li>
          <li>
            Updates the medium breakpoint to 768px to align better with the ipad and other tablets.(<a href='https://github.com/mxenabled/mx-react-components/pull/461'>#461</a>)
          </li>

          <li>
            Adds styles prop to the Drawer and TextArea components to enable greater CSS control.(<a href='https://github.com/mxenabled/mx-react-components/pull/459'>#459</a>)
          </li>
          <li>
            Adds a check to see if the handleResetClick prop is passed down, if not, hide the x icon.(<a href='https://github.com/mxenabled/mx-react-components/pull/451'>#451</a>)
          </li>
          <li>
            Switches refs in RangeSelector to the accepted pattern.(<a href='https://github.com/mxenabled/mx-react-components/pull/454'>#454</a>)
          </li>
          <li>
            Adds docs for BarChart component.(<a href='https://github.com/mxenabled/mx-react-components/pull/456'>#456</a>)
          </li>
          <li>
            Adds two props to the drawer component and adds the Drawer to the docs.(<a href='https://github.com/mxenabled/mx-react-components/pull/457'>#457</a>)
          </li>
          <li>
            Fixes DateRangePicker next click function (<a href='https://github.com/mxenabled/mx-react-components/pull/453'>#453</a>)
          </li>
          <li>
            Adds new component Menu(<a href='https://github.com/mxenabled/mx-react-components/pull/436'>#436</a>)
          </li>
          <li>
            Adds new component TextArea(<a href='https://github.com/mxenabled/mx-react-components/pull/435'>#435</a>)
          </li>
          <li>
            Adds letter spacing to the modal title(<a href='https://github.com/mxenabled/mx-react-components/pull/450'>#450</a>)
          </li>
          <li>
            Fix hover on Tooltip and on the footer tooltip in Modal.(<a href='https://github.com/mxenabled/mx-react-components/pull/449'>#449</a>)
          </li>
          <li>
            Add reset for input on FileUpload on new props.(<a href='https://github.com/mxenabled/mx-react-components/pull/447'>#447</a>)
          </li>
          <li>
            Add validation for image dimensions in FileUploader.(<a href='https://github.com/mxenabled/mx-react-components/pull/444'>#444</a>)
          </li>
          <li>
            Restyle search input and add reset icon.(<a href='https://github.com/mxenabled/mx-react-components/pull/443'>#443</a>)
          </li>
          <li>
            Fix close icon on Modals.(<a href='https://github.com/mxenabled/mx-react-components/pull/437'>#437</a>)
          </li>
          <li>
            Update Icons with new elememtns prop.(<a href='https://github.com/mxenabled/mx-react-components/pull/440'>#440</a>)
          </li>
          <li>
            Moves docs from gh-pages branch to /docs folder in master branch(<a href='https://github.com/mxenabled/mx-react-components/pull/432'>#432</a>)
          </li>
          <li>
            SearchInput: Fixes React unknown prop warning(<a href='https://github.com/mxenabled/mx-react-components/pull/434'>#434</a>)
          </li>
          <li>
            BarChart: Fixes scaling issue(<a href='https://github.com/mxenabled/mx-react-components/pull/433'>#433</a>)
          </li>
          <li>
            Reverts Radium back to 0.14.0(<a href='https://github.com/mxenabled/mx-react-components/pull/431'>#431</a>)
          </li>
          <li>
            Tabs: Fixes brand color for caret icon(<a href='https://github.com/mxenabled/mx-react-components/pull/425'>#425</a>)
          </li>
          <li>
            BREAKING CHANGE: Fixes React unknown prop warnings on various components(<a href='https://github.com/mxenabled/mx-react-components/pull/426'>#426</a>)
          </li>
          <li>
            Demo App - Fix radium style error on Tabs(<a href='https://github.com/mxenabled/mx-react-components/pull/427'>#427</a>)
          </li>
          <li>
            Update to Radium 0.18.1(<a href='https://github.com/mxenabled/mx-react-components/pull/428'>#428</a>)
          </li>
          <li>
            SimpleInput: Use callback for reference to Input(<a href='https://github.com/mxenabled/mx-react-components/pull/429'>#429</a>)
          </li>
        </ul>

        <h3>4.4.37</h3>
        <ul>
          <li>
            Added a prop that allows users to focus their cursor in the text field on load in the SimpleInput and SearchInput components (<a href='https://github.com/mxenabled/mx-react-components/pull/422'>#422</a>)
          </li>
        </ul>

        <h3>4.4.35</h3>
        <ul>
          <li>Added spending to the Icon component (<a href='https://github.com/mxenabled/mx-react-components/pull/414'>#414</a>)</li>
        </ul>

        <h3>4.4.34</h3>
        <ul>
          <li>Allow DisplayInput to be "focused" programmatically (<a href='https://github.com/mxenabled/mx-react-components/pull/417'>#417</a>)</li>
        </ul>

        <h3>4.4.33</h3>
        <ul>
          <li>Updates to React 15.3.1 - <a href='https://github.com/facebook/react/releases/tag/v15.3.1'>React 15.3.1 details</a> (<a href='https://github.com/mxenabled/mx-react-components/pull/418'>#418</a>)</li>
        </ul>

        <h3>4.4.31</h3>
        <ul>
          <li>DateRangePicker - Fixes isRelative prop usage (<a href='https://github.com/mxenabled/mx-react-components/pull/416'>#416</a>)</li>
        </ul>

        <h3>4.4.3</h3>
        <ul>
          <li>DateRangePicker - adds new prop isRelative (<a href='https://github.com/mxenabled/mx-react-components/pull/406'>#406</a>)</li>
        </ul>

        <h3>4.4.2</h3>
        <ul>
          <li>Drawer.close needs to return a Promise (<a href='https://github.com/mxenabled/mx-react-components/pull/412'>#412</a>)</li>
        </ul>

        <h3>4.4.1</h3>
        <ul>
          <li>Select Component - Strips out Native select element and adds new optionTextStyle prop (<a href='https://github.com/mxenabled/mx-react-components/pull/407'>#407</a>)</li>
        </ul>

        <h3>4.4.0</h3>
        <ul>
          <li>Allow for different Drawer sizes (<a href='https://github.com/mxenabled/mx-react-components/pull/409'>#409</a>)</li>
          <li>Reposition the Drawer when the window is resized (<a href='https://github.com/mxenabled/mx-react-components/pull/408'>#408</a>)</li>
          <li>Make the close fn public for closing the Drawer externally (<a href='https://github.com/mxenabled/mx-react-components/pull/405'>#405</a>)</li>
        </ul>

        <h3>4.3.0</h3>
        <ul>
          <li>Moves padding to parent so it can be overwritten in date range picker. (<a href='https://github.com/mxenabled/mx-react-components/pull/402'>#402</a>)</li>
          <li>Disables hover prop for buttons when in a mobile viewport. (<a href='https://github.com/mxenabled/mx-react-components/pull/378'>#378</a>)</li>
        </ul>

        <h3>4.2.23</h3>
        <ul>
          <li>Tabs Component - Fixes error with hoover in mobile. (<a href='https://github.com/mxenabled/mx-react-components/pull/398'>#398</a>)</li>
        </ul>

        <h3>4.2.22</h3>
        <ul>
          <li>DateRangePicker - Adds new prop to close calendar on succesful range selection if set to true. (<a href='https://github.com/mxenabled/mx-react-components/pull/397'>#397</a>)</li>
        </ul>

        <h3>4.2.21</h3>
        <ul>
          <li>Tabs Component - Adds new Tabs component. See docs for details. (<a href='https://github.com/mxenabled/mx-react-components/pull/395'>#395</a>)</li>
        </ul>


        <h3>4.2.19</h3>
        <ul>
          <li>Donut Chart - Preventing too many opening and selection animations from occurring (<a href='https://github.com/mxenabled/mx-react-components/pull/390'>#390</a>)</li>
          <li>Donut Chart - Ensuring opening animation occurs for all present arcs on chart (<a href='https://github.com/mxenabled/mx-react-components/pull/386'>#386</a>)</li>
          <li>Documents - opening browser automatically during npm run dev command</li>
        </ul>

        <h3>4.2.17</h3>
        <ul>
          <li>New Icon - Flag (<a href='https://github.com/mxenabled/mx-react-components/pull/381'>#381</a>)</li>
          <li>New Icon - Split (<a href='https://github.com/mxenabled/mx-react-components/pull/383'>#383</a>)</li>
          <li>SimpleSelect typo fixes for styles (<a href='https://github.com/mxenabled/mx-react-components/pull/382'>#382</a>)</li>
        </ul>

        <h3>4.2.16</h3>
        <ul>
          <li>DisplayInput and Column component fixes/tweaks (<a href='https://github.com/mxenabled/mx-react-components/pull/380'>#380</a>)</li>
        </ul>

        <h3>4.2.15</h3>
        <ul>
          <li>BarChart accepts negative numbers (<a href='https://github.com/mxenabled/mx-react-components/pull/379'>#379</a>)</li>
        </ul>

        <h3>4.2.13</h3>
        <ul>
          <li>Column span prop behaves more like Bootstrap (<a href='https://github.com/mxenabled/mx-react-components/pull/372'>#376</a>)</li>
        </ul>

        <h3>4.2.12</h3>
        <ul>
          <li>Make DisplayInput responsive (<a href='https://github.com/mxenabled/mx-react-components/pull/376'>#376</a>)</li>
        </ul>

        <h3>4.2.11</h3>
        <ul>
          <li>Limit width to 100% on ProgressBar (<a href='https://github.com/mxenabled/mx-react-components/pull/377'>#377</a>)</li>
        </ul>

        <h3>4.2.9</h3>
        <ul>
          <li>Fix React errors for unrecognized attributes (<a href='https://github.com/mxenabled/mx-react-components/pull/375'>#375</a>)</li>
        </ul>

        <h3>4.2.8</h3>
        <ul>
          <li>Gauge - Fix segment colors (<a href='https://github.com/mxenabled/mx-react-components/pull/374'>#374</a>)</li>
        </ul>

        <h3>4.2.7</h3>
        <ul>
          <li>Gauge - Add new gauge component (<a href='https://github.com/mxenabled/mx-react-components/pull/366'>#366</a>)</li>
        </ul>
        <p>New Contributors: <a href='https://github.com/vintagepenguin'>vintagepenguin</a></p>

        <h3>4.2.6</h3>
        <ul>
          <li>Drawer - Position changed from absolute to fixed (<a href='https://github.com/mxenabled/mx-react-components/pull/370'>#370</a>)</li>
          <li>DateTimePicker - Repsonsive update using new grid system (<a href='https://github.com/mxenabled/mx-react-components/pull/367'>#367</a>)</li>
        </ul>

        <h3>4.2.5</h3>
        <ul>
          <li>Fix issue with offset in Column component (<a href='https://github.com/mxenabled/mx-react-components/pull/369'>#369</a>)</li>
        </ul>

        <h3>4.2.4</h3>
        <ul>
          <li>DateRangePicker - Repsonsive update using new grid system (<a href='https://github.com/mxenabled/mx-react-components/pull/368'>#368</a>)</li>
        </ul>

        <h3>4.2.3</h3>
        <ul>
          <li>Add icon prop to SimpleInput (<a href='https://github.com/mxenabled/mx-react-components/pull/362'>#362</a>)</li>
        </ul>

        <h3>4.2.0</h3>
        <ul>
          <li>Add Container component and switch Row and Column to use Bootstrap grid system (<a href='https://github.com/mxenabled/mx-react-components/pull/365'>#365</a>)</li>
          <li>DonuChart default label color now set to ASH (<a href='https://github.com/mxenabled/mx-react-components/pull/360'>#360</a>)</li>
        </ul>

        <h3>4.1.10</h3>
        <ul>
          <li>Add BreakPoint resolutions to Style constants (<a href='https://github.com/mxenabled/mx-react-components/pull/358'>#358</a>)</li>
        </ul>

        <h3>4.1.9</h3>
        <ul>
          <li>Add checks for time and fallback to minimumDate on Calendar. (<a href='https://github.com/mxenabled/mx-react-components/pull/359'>#359</a>)</li>
        </ul>

        <h3>4.1.8</h3>
        <ul>
          <li>Row tweaks to allow onClick and hover state for a row. (<a href='https://github.com/mxenabled/mx-react-components/pull/357'>#357</a>)</li>
        </ul>

        <h3>4.1.7</h3>
        <ul>
          <li>Fixed line-of-credit icon. (<a href='https://github.com/mxenabled/mx-react-components/pull/356'>#356</a>)</li>
        </ul>

        <h3>4.1.6</h3>
        <ul>
          <li>Fix issue with midnight and noon in DateTimePicker for non-chrome browsers. (<a href='https://github.com/mxenabled/mx-react-components/pull/355'>#355</a>)</li>
          <li>Add Spacing to Style constants. (<a href='https://github.com/mxenabled/mx-react-components/pull/354'>#354</a>)</li>
          <li>Change params to objects for Column component. (<a href='https://github.com/mxenabled/mx-react-components/pull/353'>#353</a>)</li>
        </ul>

        <h3>4.1.5</h3>
        <ul>
          <li>Bug fix and minor tweaks to DateRangePicker. (<a href='https://github.com/mxenabled/mx-react-components/pull/352'>#352</a>)</li>
        </ul>

        <h3>4.1.4</h3>
        <ul>
          <li>Adds new Icons including art, business, cash, debts, etc. (<a href='https://github.com/mxenabled/mx-react-components/pull/351'>#351</a>)</li>
        </ul>

        <h3>4.1.3</h3>
        <ul>
          <li>Adds hours and minutes validation to DateTimePicker (<a href='https://github.com/mxenabled/mx-react-components/pull/350'>#350</a>)</li>
        </ul>

        <h3>4.1.2</h3>
        <ul>
          <li>Add default range options to DateRangePicker (<a href='https://github.com/mxenabled/mx-react-components/pull/348'>#348</a>)</li>
        </ul>

        <h3>4.1.1</h3>
        <ul>
          <li>Change Column component to use window.innerWidth (<a href='https://github.com/mxenabled/mx-react-components/pull/346'>#346</a>)</li>
        </ul>

        <h3>4.1.0</h3>
        <ul>
          <li>Add ProgressBar component (<a href='https://github.com/mxenabled/mx-react-components/pull/345'>#345</a>)</li>
        </ul>

        <h3>4.0.3</h3>
        <ul>
          <li>Add plus and bubbleds to Icon component (<a href='https://github.com/mxenabled/mx-react-components/pull/344'>#344</a>)</li>
          <li>Add hide/show to Column component (<a href='https://github.com/mxenabled/mx-react-components/pull/343'>#343</a>)</li>
        </ul>

        <h3>4.0.2</h3>
        <ul>
          <li>Add limitLineCircles prop to TimeBasedLineChart (<a href='https://github.com/mxenabled/mx-react-components/pull/341'>#341</a>)</li>
        </ul>

        <h3>4.0.1</h3>
        <ul>
          <li>Fix box-sizing issue with ToggleSwitch (<a href='https://github.com/mxenabled/mx-react-components/pull/340'>#340</a>)</li>
        </ul>

        <h3>4.0.0</h3>
        <ul>
          <li><strong>BREAKING CHANGES</strong> to the ToggleSwitch component. Please review the documentation. Now supports animations and icons.</li>
          <li>Update ToggleSwitch component (<a href='https://github.com/mxenabled/mx-react-components/pull/310'>#310</a>)</li>
          <li>Add DateTimePicker component (<a href='https://github.com/mxenabled/mx-react-components/pull/338'>#338</a>)</li>
          <li>Fix issue with Calendar component border color (<a href='https://github.com/mxenabled/mx-react-components/pull/339'>#339</a>)</li>
        </ul>

        <h3>3.1.45</h3>
        <ul>
          <li>Adds new Calendar component (<a href='https://github.com/mxenabled/mx-react-components/pull/336'>#336</a>)</li>
        </ul>

        <h3>3.1.44</h3>
        <ul>
          <li>Modal - Add showScrim and showCloseIcon props (<a href='https://github.com/mxenabled/mx-react-components/pull/335'>#335</a>)</li>
        </ul>

        <h3>3.1.43</h3>
        <ul>
          <li>Add Row and Column components for responsive grid (<a href='https://github.com/mxenabled/mx-react-components/pull/331'>#331</a>)</li>
          <li>Add DateRangePicker component (<a href='https://github.com/mxenabled/mx-react-components/pull/309'>#309</a>)</li>
        </ul>

        <h3>3.1.42</h3>
        <ul>
          <li>Drawer component - Add new showScrim prop to control showing scrim for Drawer (<a href='https://github.com/mxenabled/mx-react-components/pull/334'>#334</a>)</li>
        </ul>

        <h3>3.1.41</h3>
        <ul>
          <li>Drawer component - Add new animateLeftDistance prop to control animate in distance (<a href='https://github.com/mxenabled/mx-react-components/pull/333'>#333</a>)</li>
        </ul>

        <h3>3.1.40</h3>
        <ul>
          <li>Changes bottom border on DisplayInput component (<a href='https://github.com/mxenabled/mx-react-components/pull/332'>#332</a>)</li>
        </ul>

        <h3>3.1.39</h3>
        <ul>
          <li>Add RajaIcons to AppConstants (<a href='https://github.com/mxenabled/mx-react-components/pull/330'>#330</a>)</li>
        </ul>

        <h3>3.1.38</h3>
        <ul>
          <li>Add AppConstants with an Icons array (<a href='https://github.com/mxenabled/mx-react-components/pull/329'>#329</a>)</li>
          <li>Fix FileUpload icon colors (<a href='https://github.com/mxenabled/mx-react-components/pull/328'>#328</a>)</li>
        </ul>

        <h3>3.1.37</h3>
        <ul>
          <li>Remove pointer cursor on disabled buttons (<a href='https://github.com/mxenabled/mx-react-components/pull/327'>#327</a>)</li>
          <li>Add Tooltip component  (<a href='https://github.com/mxenabled/mx-react-components/pull/326'>#326</a>)</li>
          <li>Add Icons constant so list of icons can be reused and easily updated  (<a href='https://github.com/mxenabled/mx-react-components/pull/325'>#325</a>)</li>
        </ul>

        <h3>3.1.36</h3>
        <ul>
          <li>Add SimpleSelect component  (<a href='https://github.com/mxenabled/mx-react-components/pull/324'>#324</a>)</li>
        </ul>

        <h3>3.1.35</h3>
        <ul>
          <li>Add Radio Button component (<a href='https://github.com/mxenabled/mx-react-components/pull/323'>#323</a>)</li>
          <li>Change default header color on Drawer component from PORCELAIN to WHITE (<a href='https://github.com/mxenabled/mx-react-components/pull/317'>#317</a>)</li>
        </ul>
        <p>New Contributors: <a href='https://github.com/derek-boman'>derek-boman</a></p>

        <h3>3.1.34</h3>
        <ul>
          <li>Add icon option to select items (<a href='https://github.com/mxenabled/mx-react-components/pull/322'>#322</a>)</li>
        </ul>

        <h3>3.1.33</h3>
        <ul>
          <li>Adds the ability set the color of each bar in the Barchart component (<a href='https://github.com/mxenabled/mx-react-components/pull/321'>#321</a>)</li>
        </ul>

        <h3>3.1.32</h3>
        <ul>
          <li>Adds the ability set the color of a clicked bar for Barchart (<a href='https://github.com/mxenabled/mx-react-components/pull/320'>#320</a>)</li>
        </ul>

        <h3>3.1.31</h3>
        <ul>
          <li>Adds the ability to style the label for DisplayInput (<a href='https://github.com/mxenabled/mx-react-components/pull/319'>#319</a>)</li>
        </ul>

        <h3>3.1.30</h3>
        <ul>
          <li>Return event on click and name transitions for DonutChart animations (<a href='https://github.com/mxenabled/mx-react-components/pull/315'>#315</a>)</li>
        </ul>

        <h3>3.1.29</h3>
        <ul>
          <li>Disabled onClick for `disabled` type button components (<a href='https://github.com/mxenabled/mx-react-components/pull/313'>#313</a>)</li>
        </ul>

        <h3>3.1.28</h3>
        <ul>
          <li>Adds new icons duplicate and kabob horizontal to the Icon component (<a href='https://github.com/mxenabled/mx-react-components/pull/311'>#311</a>)</li>
        </ul>

        <h3>3.1.27</h3>
        <ul>
          <li>Fixed a typo in the DatePicker component (<a href='https://github.com/mxenabled/mx-react-components/pull/308'>#308</a>)</li>
        </ul>

        <h3>3.1.26</h3>
        <ul>
          <li>Add updateOnDrag to RangeSelector and remove debounce (<a href='https://github.com/mxenabled/mx-react-components/pull/307'>#307</a>)</li>
        </ul>

        <h3>3.1.25</h3>
        <ul>
          <li>Fix width issue with DisplayInput component (<a href='https://github.com/mxenabled/mx-react-components/pull/304'>#304</a>)</li>
          <li>Clean up DatePicker (<a href='https://github.com/mxenabled/mx-react-components/pull/306'>#306</a>)</li>
        </ul>

        <h3>3.1.24</h3>
        <ul>
          <li>
            Allow users of the Drawer component to pass custom styles for the header and content sections  (<a href='https://github.com/mxenabled/mx-react-components/pull/305'>#305</a>)
          </li>
        </ul>

        <h3>3.1.23</h3>
        <ul>
          <li>
            Adds Barchart component (<a href='https://github.com/mxenabled/mx-react-components/pull/300'>#300</a>)
          </li>
        </ul>

        <h3>3.1.19</h3>
        <ul>
          <li>
            Fix left margin for buttons with an icon (<a href='https://github.com/mxenabled/mx-react-components/pull/303'>#303</a>)
          </li>
        </ul>

        <h3>3.1.18</h3>
        <ul>
          <li>
            Use Flex for icon and text centering on buttons (<a href='https://github.com/mxenabled/mx-react-components/pull/302'>#302</a>)
          </li>
        </ul>

        <h3>3.1.17</h3>
        <ul>
          <li>
            Fixed styles in Button and ButtonGroup components (<a href='https://github.com/mxenabled/mx-react-components/pull/299'>#299</a>)
          </li>
        </ul>

        <h3>3.1.16</h3>
        <ul>
          <li>
            Fixed styles in the ButtonGroup component (<a href='https://github.com/mxenabled/mx-react-components/pull/296'>#296</a>)
          </li>
        </ul>

        <h3>3.1.15</h3>
        <ul>
          <li>
            Add style object to the Drawer component (<a href='https://github.com/mxenabled/mx-react-components/pull/294'>#294</a>)
          </li>
        </ul>

        <h3>3.1.14</h3>
        <ul>
          <li>
            Add bill pay, camera and transfer icons to the Icon component (<a href='https://github.com/mxenabled/mx-react-components/pull/293'>#293</a>)
          </li>
        </ul>

        <h3>3.1.13</h3>
        <ul>
          <li>
            Fix positioning in Drawer header and button text alignment (<a href='https://github.com/mxenabled/mx-react-components/pull/292'>#292</a>)
          </li>
        </ul>

        <h3>3.1.12</h3>
        <ul>
          <li>
            Updated the Date Picker component(<a href='https://github.com/mxenabled/mx-react-components/pull/290'>#290</a>)
          </li>
        </ul>

        <h3>3.1.11</h3>
        <ul>
          <li>
            Updated the Drawer component(<a href='https://github.com/mxenabled/mx-react-components/pull/289'>#289</a>)
          </li>
        </ul>

        <h3>3.1.10</h3>
        <ul>
          <li>
            Added 'check-skinny' and 'close-skinny' icons in the Icon component(<a href='https://github.com/mxenabled/mx-react-components/pull/288'>#288</a>)
          </li>
        </ul>

        <h3>3.1.9</h3>
        <ul>
          <li>
            Added 'sort' icon in the Icon component(<a href='https://github.com/mxenabled/mx-react-components/pull/288'>#286</a>)
          </li>
        </ul>

        <h3>3.1.8</h3>
        <ul>
          <li>
            Fix button text margin in Button component (<a href='https://github.com/mxenabled/mx-react-components/pull/285'>#285</a>)
          </li>
        </ul>

        <h3>3.1.7</h3>
        <ul>
          <li>
            Fix TypeError for Modal component in Firefox (<a href='https://github.com/mxenabled/mx-react-components/pull/284'>#284</a>)
          </li>
        </ul>

        <h3>3.1.6</h3>
        <ul>
          <li>
            Add 'No' and 'Subtract' icons in Icon component (<a href='https://github.com/mxenabled/mx-react-components/pull/283'>#283</a>)
          </li>
        </ul>

        <h3>3.1.5</h3>
        <ul>
          <li>
            Add box shadow constants to styles (<a href='https://github.com/mxenabled/mx-react-components/pull/282'>#282</a>)
          </li>
          <li>
            Fix new eslint errors after upgrading to eslint@2.7.0 and eslint-config-mx@1.2.7(<a href='https://github.com/mxenabled/mx-react-components/pull/281'>#281</a>)
          </li>
        </ul>

        <h3>3.1.4</h3>
        <ul>
          <li>
            Allow children in toggleSwitch to access component state (<a href='https://github.com/mxenabled/mx-react-components/pull/268'>#268</a>)
          </li>
        </ul>
        <p>New Contributors: <a href='https://github.com/phantomxc'>phantomxc</a></p>

        <h3>3.1.3</h3>
        <ul>
          <li>
            Fixed bugs with the ButtonGroup component in Firefox and other Button style bugs (<a href='https://github.com/mxenabled/mx-react-components/pull/278'>#278</a>)
          </li>
        </ul>

        <h3>3.1.2</h3>
        <ul>
          <li>
            Added new icons to Icon component: bike, education, health, map, and retirement (<a href='https://github.com/mxenabled/mx-react-components/pull/277'>#277</a>)
          </li>
        </ul>
        <h3>3.1.1</h3>
        <ul>
          <li>
            Added new icons to Icon component: cash, investment, key and desktop (<a href='https://github.com/mxenabled/mx-react-components/pull/271'>#271</a>, <a href='https://github.com/mxenabled/mx-react-components/pull/270'>#270</a>)
          </li>
        </ul>
        <h3>3.0.2</h3>
        <ul>
          <li>Fixed how styles were called on Button component (<a href='https://github.com/mxenabled/mx-react-components/pull/266'>#266</a>)</li>
        </ul>

        <h3>3.0.1</h3>
        <ul>
          <li>Added DisplayInput component (<a href='https://github.com/mxenabled/mx-react-components/pull/261'>#261</a>)</li>
        </ul>

        <h3>3.0.0</h3>
        <ul>
          <li>Updates to React v15.0.1 (<a href='https://github.com/mxenabled/mx-react-components/pull/262'>#258</a>)</li>
        </ul>

        <h3>2.3.6</h3>
        <ul>
          <li>Added Radium on button component (<a href='https://github.com/mxenabled/mx-react-components/pull/264'>#264</a>)</li>
          <li>Edited styles on button component (<a href='https://github.com/mxenabled/mx-react-components/pull/257'>#257</a>)</li>
        </ul>


        <h3>2.3.5</h3>
        <ul>
          <li>Removed gray border from SearchInput component (<a href='https://github.com/mxenabled/mx-react-components/pull/258'>#258</a>)</li>
        </ul>

        <h3>2.3.4</h3>
        <ul>
          <li>Add SimpleInput component (<a href='https://github.com/mxenabled/mx-react-components/pull/255'>#252</a>)</li>
          <li>Add SearchInput component (<a href='https://github.com/mxenabled/mx-react-components/pull/252'>#255</a>)</li>
        </ul>
        <h3>2.3.3</h3>
        <ul>
          <li>Remove validation warning and add onValidation prop in FileUpload (<a href='https://github.com/mxenabled/mx-react-components/pull/248'>#248</a>)</li>
        </ul>

        <h3>2.3.2</h3>
        <ul>
          <li>Fix deprecation warning in Modal (<a href='https://github.com/mxenabled/mx-react-components/pull/253'>#253</a>)</li>
        </ul>

        <h3>2.3.1</h3>
        <ul>
          <li>Remove fill mapping to props.color in Icon (<a href='https://github.com/mxenabled/mx-react-components/commit/496f2d6085358f9511df28124002e6b563a6bdd8'>See Commit</a>)</li>
        </ul>

        <h3>2.3.0</h3>
        <ul>
          <li>Display Unsplash.it image in demo</li>
          <li>Icon: Radium dependency removed. `style` prop now only accepts an object</li>
          <li>PageIndicator: component added (<a href='https://github.com/mxenabled/mx-react-components/pull/249'>#249</a>)</li>
          <li>ButtonGroup: component added (<a href='https://github.com/mxenabled/mx-react-components/pull/242'>#242</a>)</li>
          <li>Proxima Nova fonts added to demo</li>
          <li>Modal: `isOpen` prop deprecated (<a href='https://github.com/mxenabled/mx-react-components/pull/238'>#238</a>)</li>
        </ul>

        <h3>2.2.14</h3>
        <ul>
          <li>Add adjustHexColor to Styles constants (<a href='https://github.com/mxenabled/mx-react-components/pull/243'>#243</a>)</li>
        </ul>


        <h3>2.2.13</h3>
        <ul>
          <li>Return event along with value on Toggle component (<a href='https://github.com/mxenabled/mx-react-components/pull/241'>#241</a>)</li>
          <li>Fix styling on Button component (<a href='https://github.com/mxenabled/mx-react-components/pull/240'>#240</a>)</li>
        </ul>

        <h3>2.2.12</h3>
        <ul>
          <li>Update credit card icon in Icon component (<a href='https://github.com/mxenabled/mx-react-components/pull/235'>#235</a>)</li>
        </ul>

        <h3>2.2.10</h3>
        <ul>
          <li>Fix activeText on Modal buttons (<a href='https://github.com/mxenabled/mx-react-components/pull/234'>#234</a>)</li>
        </ul>

        <h3>2.2.9</h3>
        <ul>
          <li>Add spinner option to Modal buttons (<a href='https://github.com/mxenabled/mx-react-components/pull/233'>#233</a>)</li>
        </ul>

        <h3>2.2.8</h3>
        <ul>
          <li>Add spinner option to Button component (<a href='https://github.com/mxenabled/mx-react-components/pull/231'>#231</a>)</li>
        </ul>
        <p>New Contributors: <a href='https://github.com/iheartrachie'>iheartrachie</a></p>

        <h3>2.2.7</h3>
        <ul>
          <li>Adds footerStyle and incorporates Button component in Modal component (<a href='https://github.com/mxenabled/mx-react-components/pull/232'>#232</a>)</li>
          <li>Fixes issue with validation messages not resetting on FileUpload (<a href='https://github.com/mxenabled/mx-react-components/pull/225'>#225</a>)</li>
        </ul>

        <h3>2.2.6</h3>
        <ul>
          <li>Fixes case on Apple, Android, Windows icon values (<a href='https://github.com/mxenabled/mx-react-components/pull/226'>#226</a>)</li>
        </ul>

        <h3>2.2.5</h3>
        <ul>
          <li>Adds Apple, Android, Windows icon to Icon component (<a href='https://github.com/mxenabled/mx-react-components/commit/b55a98ba55c5da39cb210acb0e5c9544272bce0a'>see commit</a>)</li>
        </ul>

        <h3>2.2.4</h3>
        <ul>
          <li>Adds rocket icon to Icon component (<a href='https://github.com/mxenabled/mx-react-components/pull/224'>#224</a>)</li>
          <li>Adds scrim with box shadow and click handler to Drawer Component (<a href='https://github.com/mxenabled/mx-react-components/pull/223'>#223</a>)</li>
        </ul>

        <h3>2.2.3</h3>
        <ul>
          <li>Adds animations to the DonutChart component (<a href='https://github.com/mxenabled/mx-react-components/pull/221'>#221</a>)</li>
          <li>Select Component bug fix (<a href='https://github.com/mxenabled/mx-react-components/pull/220'>#220</a>)</li>
          <li>Update travis integration commands (<a href='https://github.com/mxenabled/mx-react-components/commit/4f8b7eee4302f97cef957882192e59e61f4e0b03'>see commit</a>)</li>
        </ul>

        <h3>2.2.2</h3>
        <ul>
          <li>Adds babel-cli dependency so npm release script will run (<a href='https://github.com/mxenabled/mx-react-components/commit/5bb479dfb9abb7c7647de90f7f326ac4e6a4e2f2'>see commit</a>)</li>
        </ul>

        <h3>2.2.1</h3>
        <ul>
          <li>Select Component bug fix (<a href='https://github.com/mxenabled/mx-react-components/pull/215'>#215</a>)</li>
        </ul>

        <h3>2.2.0</h3>
        <ul>
          <li>Adds new Drawer component (<a href='https://github.com/mxenabled/mx-react-components/pull/206'>#206</a>)</li>
          <li>Adds new eslint rule and brings code up to compliance (<a href='https://github.com/mxenabled/mx-react-components/pull/217'>#217</a>)</li>
        </ul>

        <h3>2.1.0</h3>
        <ul>
          <li>Removed default prop for selected on Select (<a href='https://github.com/mxenabled/mx-react-components/pull/201'>#201</a>)</li>
          <li>Added ability to pass color prop to Select (<a href='https://github.com/mxenabled/mx-react-components/pull/208'>#208</a>)</li>
          <li>Fixed bug with multiple Hover states, and added new active style on Select (<a href='https://github.com/mxenabled/mx-react-components/pull/207'>#207</a>)</li>
        </ul>
        <p>New Contributors: <a href='https://github.com/r-walsh'>r-walsh</a></p>

        <h3>2.0.6</h3>
        <ul>
          <li>Add imageURL to FileUpload (<a href='https://github.com/mxenabled/mx-react-components/pull/204'>#204</a>)</li>
        </ul>

        <h3>2.0.5</h3>
        <ul>
          <li>Add isRequired to props and fix validation bugs in FileUpload (<a href='https://github.com/mxenabled/mx-react-components/pull/202'>#202</a>)</li>
        </ul>

        <h3>2.0.4</h3>
        <ul>
          <li>Fix IE 11/Edge issues in TimeBasedLineChart (<a href='https://github.com/mxenabled/mx-react-components/pull/199'>#199</a>)</li>
        </ul>

        <h3>2.0.3</h3>
        <ul>
          <li>Lock eslint to 2.2.x and Radium to 0.14.x to prevent bugs introduced in latest versions(<a href='https://github.com/mxenabled/mx-react-components/pull/198'>#198</a>)</li>
        </ul>

        <h3>2.0.2</h3>
        <ul>
          <li>Fix duplicate module error (<a href='https://github.com/mxenabled/mx-react-components/pull/197'>#197</a>)</li>
        </ul>

        <h3>2.0.0</h3>
        <ul>
          <li>Update Lodash to 4.6.1 (<a href='https://github.com/mxenabled/mx-react-components/pull/193'>#193</a>)</li>
          <li>Add FileUpload component (<a href='https://github.com/mxenabled/mx-react-components/pull/192'>#192</a>)</li>
          <li>Darkened hover effect on Button component (<a href='https://github.com/mxenabled/mx-react-components/pull/191'>#191</a>)</li>
          <li>Rename NPM `test` script to `eslint` (<a href='https://github.com/mxenabled/mx-react-components/pull/190'>#190</a>)</li>
          <li>Add zero y-axis tick to TimeBasedLineChart (<a href='https://github.com/mxenabled/mx-react-components/pull/189'>#189</a>)</li>
          <li>Change DonutChart to return data object instead of index (<a href='https://github.com/mxenabled/mx-react-components/pull/186'>#186</a>)</li>
          <li>Add update method for selectedDate to DatePicker component (<a href='https://github.com/mxenabled/mx-react-components/pull/183'>#183</a>)</li>
          <li>Add document icon to Icon component (<a href='https://github.com/mxenabled/mx-react-components/pull/181'>#181</a>)</li>
          <li>Fix y-axis padding on TimeBasedLineChart (<a href='https://github.com/mxenabled/mx-react-components/pull/180'>#180</a>)</li>
          <li>Fix break point label on LimeBasedLineChart (<a href='https://github.com/mxenabled/mx-react-components/pull/179'>#179</a>)</li>
          <li>Remove secondaryOutline button from Button component (<a href='https://github.com/mxenabled/mx-react-components/pull/178'>#178</a>)</li>
          <li>Fix for select options dropshadow in Select component (<a href='https://github.com/mxenabled/mx-react-components/pull/177'>#177</a>)</li>
          <li>Refactor TimeBasedLineChart (<a href='https://github.com/mxenabled/mx-react-components/pull/175'>#175</a>)</li>
        </ul>

        <h3>1.6.9</h3>
        <ul>
          <li>Select: Hides the shadow when there is no options to show (<a href='https://github.com/mxenabled/mx-react-components/pull/174'>#174</a>)</li>
        </ul>

        <h3>1.6.8</h3>
        <ul>
          <li>Select: Removed opacity of the options (<a href='https://github.com/mxenabled/mx-react-components/pull/166'>#166</a>)</li>
        </ul>

        <h3>1.6.7</h3>
        <ul>
          <li>ToggleSwitch: Reverted component to createClass (<a href='https://github.com/mxenabled/mx-react-components/pull/153'>#153</a>)</li>
          <li>TypeAhead: Reverted component to createClass (<a href='https://github.com/mxenabled/mx-react-components/pull/164'>#164</a>)</li>
          <li>Spin: Reverted component to createClass (<a href='https://github.com/mxenabled/mx-react-components/pull/163'>#163</a>)</li>
          <li>SelectFullScreen: Reverted component to createClass (<a href='https://github.com/mxenabled/mx-react-components/pull/162'>#162</a>)</li>
          <li>Select: Reverted component to createClass (<a href='https://github.com/mxenabled/mx-react-components/pull/161'>#161</a>)</li>
          <li>Modal: Reverted component to createClass (<a href='https://github.com/mxenabled/mx-react-components/pull/160'>#160</a>)</li>
          <li>RangeSelector: Reverted component to createClass (<a href='https://github.com/mxenabled/mx-react-components/pull/154'>#154</a>)</li>
          <li>DatePickerFullScreen: Reverted component to createClass (<a href='https://github.com/mxenabled/mx-react-components/pull/156'>#156</a>)</li>
          <li>DatePicker: Reverted component to createClass (<a href='https://github.com/mxenabled/mx-react-components/pull/155'>#155</a>)</li>
          <li>DonutChart: Reverted component to createClass (<a href='https://github.com/mxenabled/mx-react-components/pull/157'>#157</a>)</li>
          <li>Icon: Reverted component to createClass (<a href='https://github.com/mxenabled/mx-react-components/pull/158'>#158</a>)</li>
          <li>RajaIcon: Reverted component to createClass (<a href='https://github.com/mxenabled/mx-react-components/pull/159'>#159</a>)</li>
          <li>Loader: Reverted component to createClass (<a href='https://github.com/mxenabled/mx-react-components/pull/148'>#148</a>)</li>
          <li>Removed duplicate keys in demo app (<a href='https://github.com/mxenabled/mx-react-components/pull/152'>#152</a>)</li>
        </ul>

        <h3>1.6.6</h3>
        <ul>
          <li>Icon: Add fat arrows (<a href='https://github.com/mxenabled/mx-react-components/pull/149'>#149</a>)</li>
        </ul>

        <h3>1.6.5</h3>
        <ul>
          <li>TypeAhead: Adjust colors (<a href='https://github.com/mxenabled/mx-react-components/commit/3a20b237a707582a79c5d499ccc47f18dc6a2d8a'>see commit</a>)</li>
        </ul>

        <h3>1.6.4</h3>
        <ul>
          <li>Button: Move adjustColor to styles (<a href='https://github.com/mxenabled/mx-react-components/commit/6a3abad0bd1c3dc4a8951a6b8b3d190b9c0d08ee'>see commit</a>)</li>
        </ul>

        <h3>1.6.3</h3>
        <ul>
          <li>Button: Remove padding and change margin to longhand values (<a href='https://github.com/mxenabled/mx-react-components/commit/27725e56aab3cec3299be9be6756c82d78c3e819'>see commit</a>)</li>
        </ul>

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
}

module.exports = Changelog;
