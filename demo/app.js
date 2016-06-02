const _clone = require('lodash/clone');
const _find = require('lodash/find');
const React = require('react');
const ReactDOM = require('react-dom');
const moment = require('moment');

const {
  BarChart,
  Button,
  ButtonGroup,
  DatePicker,
  DatePickerFullScreen,
  DisplayInput,
  DonutChart,
  Drawer,
  FileUpload,
  Icon,
  Loader,
  Modal,
  PageIndicator,
  RadioButton,
  RangeSelector,
  SearchInput,
  Select,
  SelectFullScreen,
  SimpleInput,
  SimpleSelect,
  Styles,
  TimeBasedLineChart,
  ToggleSwitch,
  Tooltip,
  TypeAhead
} = require('../src/Index');

const styles = {
  modalFooterContent: {
    color: '#ACB0B3',
    fontSize: '12px',
    padding: '2px 0'
  }
};

const icons = [
  {
    value: 'accounts',
    displayValue: 'Accounts'
  },
  {
    value: 'add',
    displayValue: 'Add'
  },
  {
    value: 'add-solid',
    displayValue: 'Add Solid'
  },
  {
    value: 'android',
    displayValue: 'Android'
  },
  {
    value: 'apple',
    displayValue: 'Apple'
  },
  {
    value: 'arrow-down',
    displayValue: 'Arrow Down'
  },
  {
    value: 'arrow-down-fat',
    displayValue: 'Arrow Down Fat'
  },
  {
    value: 'arrow-left',
    displayValue: 'Arrow Left'
  },
  {
    value: 'arrow-right',
    displayValue: 'Arrow Right'
  },
  {
    value: 'arrow-up',
    displayValue: 'Arrow Up'
  },
  {
    value: 'arrow-up-fat',
    displayValue: 'Arrow Up Fat'
  },
  {
    value: 'attention',
    displayValue: 'Attention'
  },
  {
    value: 'attention-solid',
    displayValue: 'Attention Solid'
  },
  {
    value: 'auto',
    displayValue: 'Auto'
  },
  {
    value: 'backspace',
    displayValue: 'Backspace'
  },
  {
    value: 'bike',
    displayValue: 'Bike'
  },
  {
    value: 'bill-pay',
    displayValue: 'Bill Pay'
  },
  {
    value: 'calendar',
    displayValue: 'Calendar'
  },
  {
    value: 'calendar-plus',
    displayValue: 'Calendar Plus'
  },
  {
    value: 'camera',
    displayValue: 'Camera'
  },
  {
    value: 'campaigns',
    displayValue: 'Campaigns'
  },
  {
    value: 'caret-down',
    displayValue: 'Caret Down'
  },
  {
    value: 'caret-left',
    displayValue: 'Caret Left'
  },
  {
    value: 'caret-right',
    displayValue: 'Caret Right'
  },
  {
    value: 'caret-up',
    displayValue: 'Caret Up'
  },
  {
    value: 'cash',
    displayValue: 'Cash'
  },
  {
    value: 'chart',
    displayValue: 'Chart'
  },
  {
    value: 'check',
    displayValue: 'Check'
  },
  {
    value: 'check-skinny',
    displayValue: 'Check Skinny'
  },
  {
    value: 'check-solid',
    displayValue: 'Check Solid'
  },
  {
    value: 'checking',
    displayValue: 'Checking'
  },
  {
    value: 'clock',
    displayValue: 'Clock'
  },
  {
    value: 'close',
    displayValue: 'Close'
  },
  {
    value: 'close-skinny',
    displayValue: 'Close Skinny'
  },
  {
    value: 'close-solid',
    displayValue: 'Close Solid'
  },
  {
    value: 'comparisons',
    displayValue: 'Comparisons'
  },
  {
    value: 'credit-card',
    displayValue: 'Credit Card'
  },
  {
    value: 'delete',
    displayValue: 'Delete'
  },
  {
    value: 'desktop',
    displayValue: 'Desktop'
  },
  {
    value: 'document',
    displayValue: 'Document'
  },
  {
    value: 'download',
    displayValue: 'Download'
  },
  {
    value: 'duplicate',
    displayValue: 'Duplicate'
  },
  {
    value: 'edit',
    displayValue: 'Edit'
  },
  {
    value: 'education',
    displayValue: 'Education'
  },
  {
    value: 'envelope',
    displayValue: 'Envelope'
  },
  {
    value: 'export',
    displayValue: 'Export'
  },
  {
    value: 'filter',
    displayValue: 'Filter'
  },
  {
    value: 'folder',
    displayValue: 'Folder'
  },
  {
    value: 'gallery',
    displayValue: 'Gallery'
  },
  {
    value: 'gear',
    displayValue: 'Gear'
  },
  {
    value: 'hamburger',
    displayValue: 'Hamburger'
  },
  {
    value: 'health',
    displayValue: 'Health'
  },
  {
    value: 'help',
    displayValue: 'Help'
  },
  {
    value: 'home',
    displayValue: 'Home'
  },
  {
    value: 'import',
    displayValue: 'Import'
  },
  {
    value: 'info',
    displayValue: 'Info'
  },
  {
    value: 'investment',
    displayValue: 'Investment'
  },
  {
    value: 'kabob_horizontal',
    displayValue: 'Kabob Horizontal'
  },
  {
    value: 'key',
    displayValue: 'Key'
  },
  {
    value: 'link',
    displayValue: 'Link'
  },
  {
    value: 'list-view',
    displayValue: 'List View'
  },
  {
    value: 'loans',
    displayValue: 'Loans'
  },
  {
    value: 'map',
    displayValue: 'Map'
  },
  {
    value: 'md-cash',
    displayValue: 'Cash (MD)'
  },
  {
    value: 'md-check-mark',
    displayValue: 'Check Mark (MD)'
  },
  {
    value: 'md-credit',
    displayValue: 'Credit (MD)'
  },
  {
    value: 'md-debts',
    displayValue: 'Debts (MD)'
  },
  {
    value: 'md-savings',
    displayValue: 'Savings (MD)'
  },
  {
    value: 'mobile-phone',
    displayValue: 'Mobile Phone'
  },
  {
    value: 'mx',
    displayValue: 'MX'
  },
  {
    value: 'no',
    displayValue: 'NO'
  },
  {
    value: 'phone',
    displayValue: 'Phone'
  },
  {
    value: 'play',
    displayValue: 'Play'
  },
  {
    value: 'play-solid',
    displayValue: 'Play Solid'
  },
  {
    value: 'retirement',
    displayValue: 'Retirement'
  },
  {
    value: 'rocket',
    displayValue: 'Rocket'
  },
  {
    value: 'savings',
    displayValue: 'Savings'
  },
  {
    value: 'search',
    displayValue: 'Search'
  },
  {
    value: 'segments',
    displayValue: 'Segments'
  },
  {
    value: 'spinner',
    displayValue: 'Spinner'
  },
  {
    value: 'subtract',
    displayValue: 'Subtract'
  },
  {
    value: 'sync',
    displayValue: 'Sync'
  },
  {
    value: 'transfer',
    displayValue: 'Transfer'
  },
  {
    value: 'transactions',
    displayValue: 'Transactions'
  },
  {
    value: 'user',
    displayValue: 'User'
  },
  {
    value: 'view',
    displayValue: 'View'
  },
  {
    value: 'visit',
    displayValue: 'Visit'
  },
  {
    value: 'windows',
    displayValue: 'Windows'
  },
  {
    value: 'x-axis',
    displayValue: 'X Axis'
  },
  {
    value: 'y-axis',
    displayValue: 'Y Axis'
  }
];

const lineChartData = [
  {
    x: moment().subtract(15, 'days').startOf('day').unix(),
    y: 800
  },
  {
    x: moment().subtract(14, 'days').startOf('day').unix(),
    y: 900
  },
  {
    x: moment().subtract(13, 'days').startOf('day').unix(),
    y: 1200
  },
  {
    x: moment().subtract(12, 'days').startOf('day').unix(),
    y: 850
  },
  {
    x: moment().subtract(11, 'days').startOf('day').unix(),
    y: 660
  },
  {
    x: moment().subtract(10, 'days').startOf('day').unix(),
    y: 720
  },
  {
    x: moment().subtract(9, 'days').startOf('day').unix(),
    y: 900
  },
  {
    x: moment().subtract(8, 'days').startOf('day').unix(),
    y: 700
  },
  {
    x: moment().subtract(7, 'days').startOf('day').unix(),
    y: 600
  },
  {
    x: moment().subtract(6, 'days').startOf('day').unix(),
    y: 1200
  },
  {
    x: moment().subtract(5, 'days').startOf('day').unix(),
    y: 900
  },
  {
    x: moment().subtract(4, 'days').startOf('day').unix(),
    y: 800
  },
  {
    x: moment().subtract(3, 'days').startOf('day').unix(),
    y: 600
  },
  {
    x: moment().subtract(2, 'days').startOf('day').unix(),
    y: 1600
  },
  {
    x: moment().subtract(1, 'days').startOf('day').unix(),
    y: 1700
  },
  {
    x: moment().startOf('day').unix(),
    y: 500
  },
  {
    x: moment().add(1, 'days').startOf('day').unix(),
    y: 1200
  },
  {
    x: moment().add(2, 'days').startOf('day').unix(),
    y: 1200
  },
  {
    x: moment().add(3, 'days').startOf('day').unix(),
    y: 1700
  },
  {
    x: moment().add(4, 'days').startOf('day').unix(),
    y: 1100
  },
  {
    x: moment().add(5, 'days').startOf('day').unix(),
    y: 1000
  },
  {
    x: moment().add(6, 'days').startOf('day').unix(),
    y: 900
  },
  {
    x: moment().add(7, 'days').startOf('day').unix(),
    y: 1000
  },
  {
    x: moment().add(8, 'days').startOf('day').unix(),
    y: 850
  },
  {
    x: moment().add(9, 'days').startOf('day').unix(),
    y: 1500
  },
  {
    x: moment().add(10, 'days').startOf('day').unix(),
    y: 1100
  },
  {
    x: moment().add(11, 'days').startOf('day').unix(),
    y: 1000
  },
  {
    x: moment().add(12, 'days').startOf('day').unix(),
    y: 800
  },
  {
    x: moment().add(13, 'days').startOf('day').unix(),
    y: 1100
  },
  {
    x: moment().add(14, 'days').startOf('day').unix(),
    y: 1300
  },
  {
    x: moment().add(15, 'days').startOf('day').unix(),
    y: 2200
  }
];

const Demo = React.createClass({
  getInitialState () {
    return {
      barchartHoverValue: null,
      barchartX: null,
      barchartY: null,
      donutChartData: [],
      drawerSiblings: [
        {
          id: 1,
          selected: true
        },
        {
          id: 2,
          selected: false
        },
        {
          id: 3,
          selected: false
        },
        {
          id: 4,
          selected: false
        }
      ],
      icon: {
        value: 'accounts',
        displayValue: 'Accounts'
      },
      lineChartData: [],
      pageIndicatorIndex: 0,
      radioChecked: false,
      selectedDatePickerDate: null,
      showDrawer: false,
      showDrawerButtonType: 'primary',
      showModal: false,
      showMenu: false,
      showSmallModal: false,
      uploadedFile: null,
      windowWidth: document.documentElement.clientWidth || document.body.clientWidth
    };
  },

  componentDidMount () {
    window.addEventListener('resize', this._handleWindowResize);

    setTimeout(() => {
      this.setState({
        lineChartData,
        donutChartData: [
          {
            name: 'Data Point 1',
            value: 50
          },
          {
            name: 'Data Point 2',
            value: 80
          },
          {
            name: 'Data Point 3',
            value: 200
          }
        ]
      });
    }, 3000);
  },

  componentWillUnmount () {
    window.removeEventListener('resize', this._handleWindowResize);
  },

  _handleAddDataToChart () {
    const donutChartData = this.state.donutChartData;

    donutChartData.push({
      name: 'Data Point',
      value: Math.floor(Math.random() * (150 - 30 + 1)) + 30
    });

    this.setState({
      donutChartData
    });
  },

  _handleSelectChange (option) {
    this.setState({
      icon: option
    });
  },

  _handleWindowResize () {
    this.setState({
      windowWidth: document.documentElement.clientWidth || document.body.clientWidth
    });
  },

  _handleDateSelect (selectedDatePickerDate) {
    this.setState({
      selectedDatePickerDate
    });
  },

  _handleLineChartHover (data) {
    this.setState({
      lineChartHoverValue: data.value
    });
  },

  _handleModalClick () {
    this.setState({
      showModal: true,
      showSmallModal: false
    });
  },

  _handleSmallModalClick () {
    this.setState({
      showModal: true,
      showSmallModal: true
    });
  },

  _handleModalClose () {
    this.setState({
      showModal: false,
      showSmallModal: false
    });
  },

  _handleFileChange (uploadedFile) {
    this.setState({
      uploadedFile
    });
  },

  _handleNextSiblingClick () {
  },

  _handlePreviousSiblingClick () {
  },

  _handleShowDrawerClick () {
    this.setState({
      showDrawer: true,
      showDrawerButtonType: 'disabled'
    });
  },

  _onHideDrawer () {
    this.setState({
      showDrawer: false,
      showDrawerButtonType: 'primary'
    });
  },

  _handleSpinnerIconOnlyClick () {
    this.setState({
      spinnerIconOnlyIsActive: !this.state.spinnerIconOnlyIsActive
    });
  },

  _handleSpinnerClick () {
    this.setState({
      spinnerIsActive: !this.state.spinnerIsActive
    });
  },

  _handleSpinnerWithTextClick () {
    this.setState({
      spinnerWithTextIsActive: !this.state.spinnerWithTextIsActive
    });
  },

  _handleSimpleSelectClick () {
    this.setState({
      showMenu: !this.state.showMenu
    });
  },

  _handlePageIndicatorClick (index) {
    this.setState({
      pageIndicatorIndex: index
    });
  },

  _handleNextPageIndicatorClick () {
    this.setState({
      pageIndicatorIndex: this.state.pageIndicatorIndex === 2 ? 0 : this.state.pageIndicatorIndex + 1
    });
  },

  _handleInputShowHint () {
    this.setState({
      showHint: true
    });
  },

  _handleInputHideHint () {
    this.setState({
      showHint: false
    });
  },

  _handleInputFocus () {
    this.setState({
      statusMessage: null,
      showHint: false
    });
  },

  _handleInputStatusMessage () {
    this.setState({
      statusMessage: {
        type: 'success',
        message: 'Saved!'
      },
      valid: true
    });
  },

  _handleBarChartHover (barchartHoverLabel, barchartHoverValue, barchartX, barchartY) {
    this.setState({
      barchartHoverValue,
      barchartX,
      barchartY
    });
  },

  _handleRadioButtonClick () {
    this.setState({
      radioChecked: !this.state.radioChecked
    });
  },

  render () {
    const navConfig = {
      duration: 200,
      onNextClick: this._handleNextSiblingClick,
      label: _find(this.state.drawerSiblings, { selected: true }).id + ' of ' + this.state.drawerSiblings.length,
      onPreviousClick: this._handlePreviousSiblingClick
    };

    return (
      <div>
        <br /><br />
        <div style={{ textAlign: 'center', width: '80%', margin: 'auto' }}>
          <Button
            onClick={this._handleShowDrawerClick}
            type={this.state.showDrawerButtonType}
          >
            Toggle Drawer
          </Button>
        </div>
        {this.state.showDrawer ? (
          <div style={{ textAlign: 'center', width: '80%', margin: 'auto' }}>
            <Drawer
              headerStyle={{ backgroundColor: '#fff' }}
              navConfig={navConfig}
              onClose={this._onHideDrawer}
              title='This is the drawer component'
            >
              <div style={{ padding: 20, fontFamily: 'Helvetica, Arial, sans-serif' }}>Insert Custom Content Here</div>
            </Drawer>
          </div>
        ) : null}
        <br /><br />
        <div style={{ textAlign: 'center', width: '80%', margin: 'auto' }}>
          <div style={{ paddingBottom: 10 }}>
            File Upload - Dropzone
          </div>
          <FileUpload
            allowedFileTypes={['image/jpeg', 'text/csv', 'image/png']}
            maxFileSize={3000}
            onFileAdd={this._handleFileChange}
            onFileRemove={this._handleFileChange}
            uploadedFile={this.state.uploadedFile}
          />
        </div>

        <br /><br />
        <div style={{ textAlign: 'center', fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <Button onClick={this._handleModalClick}>Show Default Modal (Primary Button)</Button>
          <br /><br />
          <Button onClick={this._handleSmallModalClick} type='secondary'>Show Small Modal (Secondary Button)</Button>
          <br /><br />
          <Button type='primaryOutline'>Primary Outline Button</Button>
          <br /><br />
          <Button icon='add'>Button With Icon</Button>
          <br /><br />
          <Button icon='delete' type='primaryOutline' />
          <br /><br />
          <Button type='base'>Base Button</Button>
          <br /><br />
          <Button type='neutral'>Neutral Button</Button>
          <br /><br />
          <Button type='disabled'>Disabled Button</Button>
          <br /><br />
          <Button
            icon='add'
            isActive={this.state.spinnerIconOnlyIsActive}
            onClick={this._handleSpinnerIconOnlyClick}
            type='primaryOutline'
          />
          <br /><br />
          <Button
            icon='delete'
            isActive={this.state.spinnerIsActive}
            onClick={this._handleSpinnerClick}
            type='secondary'
          >Button with text & without actionText</Button>
          <br /><br />
          <Button actionText='Spinning...' isActive={this.state.spinnerWithTextIsActive} onClick={this._handleSpinnerWithTextClick}>Button with text and actionText</Button>
          <br /><br />
          <ButtonGroup
            buttons={[
              { icon: 'caret-left' },
              { text: 'Mar 2015 - Feb 2016' },
              { icon: 'caret-right' }
            ]}
            type='primaryOutline'
          />
          <br /><br />
          <ButtonGroup
            buttons={[
              { icon: 'download' },
              { icon: 'search' },
              { icon: 'add' }
            ]}
            type='base'
          />
          <br /><br />
          <Tooltip placement='right' style={{ fill: Styles.Colors.PRIMARY }}>Text for the tool tip</Tooltip>

          <br /><br />
          <div style={{ margin: '0 auto', width: 177 }}>
            <Button
              icon='gear'
              onClick={this._handleSimpleSelectClick}
              type='base'
            >
              This is a menu Button
            </Button>
            {this.state.showMenu ? (
              <SimpleSelect
                items={[
                  { text: 'Menu Item 1' },
                  { text: 'Menu Item 2' },
                  { text: 'Menu Item 3' }
                ]}
                onScrimClick={this._handleSimpleSelectClick}
              />
            ) : null}
          </div>
        </div>
        {this.state.showModal ? (
          <Modal
            buttons={[
              {
                icon: 'close',
                label: 'Secondary',
                onClick: this._handleModalSecondaryClick,
                type: 'secondary'
              },
              {
                icon: 'rocket',
                label: 'Primary',
                onClick: this._handleModalPrimaryClick,
                type: 'primary'
              }
            ]}
            footerContent={(
              <div style={styles.modalFooterContent}>
                Footer Content
              </div>
            )}
            footerStyle={{ padding: '40px 20px' }}
            onRequestClose={this._handleModalClose}
            showFooter={true}
            showTitleBar={true}
            title='This is the header text'
            tooltip='This is my tooltip content'
            tooltipLabel='This is the footer text.'
            tooltipTitle='This is my tooltip title'
          >
            <div style={{ padding: 20 }}>
              <p style={{ fontFamily: 'Helvetica, Arial, sans-serif', textAlign: 'center' }}>I am a modal!</p>
              <img src='https://unsplash.it/1000/600?random' style={Object.assign({ maxWidth: '100%', height: 'auto', margin: 'auto' }, this.state.showSmallModal && { width: 400 })} />
            </div>
          </Modal>
      ) : null}

        <br /><br />
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block', padding: 20 }}>
            <DonutChart
              activeOffset={5}
              animateOnHover={true}
              animationDuration={750}
              animationTypeOnLoad='roll'
              arcWidth={15}
              chartTotal={300}
              data={[
                {
                  name: 'Data Point 1',
                  value: 50
                },
                {
                  name: 'Data Point 2',
                  value: 80
                }
              ]}
              dataPoints={[
                {
                  name: 'Data Dot 1',
                  value: 200
                }
              ]}
              defaultLabelText='Total Users'
              defaultLabelValue='300'
              id='donut-1'
            />
          </div>
          <div style={{ display: 'inline-block', padding: 20 }}>
            {this.state.donutChartData.length ? (
              <DonutChart
                activeOffset={5}
                animateOnHover={true}
                animationDuration={1000}
                animationTypeOnLoad='pop'
                arcWidth={30}
                data={_clone(this.state.donutChartData)}
                height={200}
                id='donut-2'
                showDataLabel={false}
                width={200}
              />
            ) : null}
            <div style={{ marginTop: 10 }}>
              <Button onClick={this._handleAddDataToChart}>Add Data to Chart</Button>
            </div>
          </div>
        </div>
        <br /><br />
        <div style={{ textAlign: 'center' }}>
          <TimeBasedLineChart
            breakPointDate={moment().startOf('day').unix()}
            breakPointLabel={'Today'}
            data={this.state.lineChartData}
            height={400}
            hoveredDataPointDetails={[
              {
                format: 'MMM DD, YYYY',
                key: 'x',
                label: 'Date',
                type: 'date'
              },
              {
                format: '$0,0',
                key: 'y',
                label: 'Value',
                type: 'number'
              }
            ]}
            rangeType={'day'}
            showBreakPoint={true}
            width={700}
          />
        </div>

        <br /><br /><br /><br />
        <div>
          <ToggleSwitch />
        </div>

        <br /><br />
        <TypeAhead
          items={[
            'JPMorgan Chase',
            'Bank of America',
            'Citigroup',
            'Wells Fargo',
            'The Bank of New York Mellon',
            'U.S. Bancorp',
            'HSBC Bank USA',
            'Capital One',
            'PNC Financial Services',
            'State Street Corporation'
          ]}
          placeholderText='Select a Bank'
        />

        <br /><br />
        <Select
          color='#359BCF'
          isMobile={false}
          onChange={this._handleSelectChange}
          optionHoverStyle={{
            backgroundColor: '#359BCF',
            color: '#fff'
          }}
          optionStyle={{
            color: '#333'
          }}
          options={icons}
          placeholderText='Pick One'
          selected={this.state.icon}
          valid={true}
        />

        <br /><br />
        <div style={{ textAlign: 'center' }}>
          <Icon
            size={150}
            style={{
              fill: '#359BCF'
            }}
            type={this.state.icon.value}
          />
        </div>

        <br /><br />
        <div
          style={{
            border: '1px solid #E3E6E7',
            boxSizing: 'border-box',
            height: 400,
            padding: '10px',
            position: 'relative',
            width: '100%'
          }}
        >
          <div style={{ fontSize: '16px', fontWeight: 'bold', paddingBottom: 10 }}>
            Full Parent Select
          </div>
          <SelectFullScreen
            onChange={this._handleSelectChange}
            optionHoverStyle={{
              backgroundColor: '#359BCF',
              color: '#fff'
            }}
            options={icons}
            placeholderText='Pick One'
            selected={this.state.icon}
          />
          <br /><br />
          <div style={{ textAlign: 'center' }}>
            <Icon
              size={150}
              style={{
                fill: '#359BCF'
              }}
              type={this.state.icon.value}
            />
          </div>
        </div>

        <br /><br />
        <RangeSelector
          defaultLowerValue={18}
          defaultUpperValue={30}
          interval={1}
          lowerBound={-25}
          presets={[
            {
              lowerValue: 0,
              upperValue: 13,
              label: 'Gen Z'
            },
            {
              lowerValue: 14,
              upperValue: 34,
              label: 'Millenials'
            },
            {
              lowerValue: 10,
              upperValue: 40,
              label: 'Gen Y'
            },
            {
              lowerValue: 36,
              upperValue: 50,
              label: 'Gen X'
            },
            {
              lowerValue: 51,
              upperValue: 72,
              label: 'Baby Boomers'
            },
            {
              lowerValue: 73,
              upperValue: 90,
              label: 'Silent'
            }
          ]}
          selectedColor='#359BCF'
          upperBound={100}
        />

        <br /><br />
        <div style={{ padding: '100px', position: 'relative' }}>
          <Loader isLoading={true} isRelative={true} />
        </div>

        <br /><br />
        <RadioButton checked={this.state.radioChecked} onClick={this._handleRadioButtonClick}>On</RadioButton>
        <RadioButton checked={!this.state.radioChecked} onClick={this._handleRadioButtonClick}>Off</RadioButton>

        <br /><br />
        <DatePicker
          closeOnDateSelect={true}
          defaultDate={this.state.selectedDatePickerDate}
          onDateSelect={this._handleDateSelect}
        />

        <br /><br />
        <SimpleInput
          placeholder='Type something'
          valid={true}
        />
        <br /><br />
        <SearchInput />
        <DisplayInput
          hint='Click to Edit'
          label='Display Input'
          onBlur={this._handleInputStatusMessage}
          onFocus={this._handleInputFocus}
          onMouseOut={this._handleInputHideHint}
          onMouseOver={this._handleInputShowHint}
          placeholder='Type something'
          showHint={this.state.showHint}
          status={this.state.statusMessage}
          valid={this.state.valid}
        />
        <br /><br />
        <div
          style={{
            border: '1px solid #E3E6E7',
            boxSizing: 'border-box',
            height: 400,
            padding: '10px',
            position: 'relative',
            width: '100%'
          }}
        >
          <div style={{ fontSize: '16px', fontWeight: 'bold', paddingBottom: 10 }}>
            Full Parent Date Picker
          </div>
          <DatePickerFullScreen
            closeOnDateSelect={true}
            defaultDate={this.state.selectedDatePickerDate}
            onDateSelect={this._handleDateSelect}
            showDayBorders={false}
            title='Select A Date'
          />
        </div>
        <br /><br />

        <div style={{ textAlign: 'center', fontSize: 20 }}>
          Current Page Indicator Index: {this.state.pageIndicatorIndex}
          <br /><br />
          <Button onClick={this._handleNextPageIndicatorClick}>Next Page</Button>
          <PageIndicator activeIndex={this.state.pageIndicatorIndex} count={3} onClick={this._handlePageIndicatorClick} />
        </div>
        <br /><br />
        <div style={{ position: 'relative' }}>
          {this.state.barchartHoverValue ? (
            <span style={{ position: 'absolute', top: this.state.barchartY - 20, left: this.state.barchartX + 10 }}>
              {this.state.barchartHoverValue}
            </span>
          ) : null}
          <BarChart
            animateOnHover={true}
            data={[
              {
                color: '#E3E6E7',
                label: 'Jan',
                value: 125.25
              },
              {
                color: '#E3E6E7',
                label: 'Feb',
                value: 545.25
              },
              {
                color: '#E3E6E7',
                label: 'Mar',
                value: 789.25
              },
              {
                color: '#359BCF',
                label: 'Apr',
                value: 254.25
              },
              {
                color: '#E3E6E7',
                label: 'May',
                value: 782.25
              },
              {
                color: '#E3E6E7',
                label: 'Jun',
                value: 1200.75
              },
              {
                color: '#E3E6E7',
                label: 'Jul',
                value: 852.25
              },
              {
                color: '#E3E6E7',
                label: 'Aug',
                value: 965.25
              },
              {
                color: '#E3E6E7',
                label: 'Sep',
                value: 145.25
              },
              {
                color: '#E3E6E7',
                label: 'Oct',
                value: 987.25
              },
              {
                color: '#E3E6E7',
                label: 'Nov',
                value: 633.25
              },
              {
                color: '#E3E6E7',
                label: 'Dec',
                value: 1248.25
              }
            ]}
            height={200}
            onHover={this._handleBarChartHover}
            width={700}
          />
        </div>
      </div>
    );
  }
});

ReactDOM.render(<Demo />, document.getElementById('demo'));
