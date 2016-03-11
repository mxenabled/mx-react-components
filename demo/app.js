const _find = require('lodash/find');
const React = require('react');
const ReactDOM = require('react-dom');
const moment = require('moment');

const {
  Button,
  DatePicker,
  DatePickerFullScreen,
  DonutChart,
  Drawer,
  FileUpload,
  Icon,
  Loader,
  Modal,
  RangeSelector,
  Select,
  SelectFullScreen,
  TimeBasedLineChart,
  ToggleSwitch,
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
    value: 'calendar',
    displayValue: 'Calendar'
  },
  {
    value: 'calendar-plus',
    displayValue: 'Calendar Plus'
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
    value: 'chart',
    displayValue: 'Chart'
  },
  {
    value: 'check',
    displayValue: 'Check'
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
    value: 'document',
    displayValue: 'Document'
  },
  {
    value: 'download',
    displayValue: 'Download'
  },
  {
    value: 'edit',
    displayValue: 'Edit'
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
    value: 'md-cash',
    displayValue: 'Cash (MD)'
  },
  {
    value: 'md-check-mark',
    displayValue: 'Check Mark (MD)'
  },
  {
    value: 'md-credit',
    displayValue: 'Creidt (MD)'
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
    value: 'sync',
    displayValue: 'Sync'
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
      selectedDatePickerDate: moment().unix(),
      showDrawer: false,
      showModal: false,
      showSmallModal: false,
      uploadedFile: null,
      windowWidth: document.documentElement.clientWidth || document.body.clientWidth
    };
  },

  componentDidMount () {
    window.addEventListener('resize', this._handleWindowResize);

    setTimeout(() => {
      this.setState({
        lineChartData
      });
    }, 3000);
  },

  componentWillUnmount () {
    window.removeEventListener('resize', this._handleWindowResize);
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

  _nextSibling () {
    console.log('next');
  },

  _previousSibling () {
    console.log('previous');
  },

  _toggleDrawer () {
    this.setState({
      showDrawer: !this.state.showDrawer
    });
  },

  render () {
    const navContent = {
      duration: 200,
      onNextClick: this._nextSibling,
      label: _find(this.state.drawerSiblings, { selected: true }).id + ' of ' + this.state.drawerSiblings.length,
      onPreviousClick: this._previousSibling
    };

    return (
      <div>
        <br/><br/>
        <div style={{ textAlign: 'center', width: '80%', margin: 'auto', position: 'relative', height: '200', overflow: 'hidden' }}>
          <Button onClick={this._toggleDrawer} style={{ position: 'absolute', left: 15, top: 15 }}>Toggle Drawer</Button>
          <Drawer isOpen={this.state.showDrawer} navContent={navContent} onClose={this._toggleDrawer}>
            <div style={{ padding: 20, fontFamily: 'Helvetica, Arial, sans-serif' }}>Insert Custom Content Here</div>
          </Drawer>
        </div>
        <br/><br/>
        <div style={{ textAlign: 'center', width: '80%', margin: 'auto' }}>
          <FileUpload
            allowedFileTypes={['image/jpeg', 'text/csv', 'image/tiff']}
            maxFileSize={3000}
            onFileAdd={this._handleFileChange}
            onFileRemove={this._handleFileChange}
            uploadedFile={this.state.uploadedFile}
          />
        </div>

        <br/><br/>
        <div style={{ textAlign: 'center', fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <Button onClick={this._handleModalClick}>Show Default Modal (Primary Button)</Button>
          <br/><br/>
          <Button onClick={this._handleSmallModalClick} type='secondary'>Show Small Modal (Secondary Button)</Button>
          <br/><br/>
          <Button type='primaryOutline'>Primary Outline Button</Button>
          <br/><br/>
          <Button icon='add'>Button With Icon</Button>
          <br/><br/>
          <Button icon='delete' type='primaryOutline' />
          <br/><br/>
          <Button type='base'>Base Button</Button>
          <br/><br/>
          <Button type='neutral'>Neutral Button</Button>
          <br/><br/>
          <Button type='disabled'>Disabled Button</Button>

        </div>
        <Modal
          buttons={[
            {
              label: 'Secondary',
              onClick: this._handleModalSecondaryClick,
              type: 'secondary'
            },
            {
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
          isOpen={this.state.showModal}
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
            <img src='http://www.mx.com/images/home/top-t-i.png' style={[{ maxWidth: '100%', height: 'auto', margin: 'auto' }, this.state.showSmallModal && { width: 400 }]} />
          </div>
        </Modal>

        <br/><br/>
        <DonutChart
          animateOnHover={true}
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
          style={{ margin: '0 auto' }}
        />

        <br/><br/>
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

        <br/><br/><br/><br/>
        <div style={{ textAlign: 'center' }}>
          <ToggleSwitch />
        </div>

        <br/><br/>
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

        <br/><br/>
        <Select
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

        <br/><br/>
        <div style={{ textAlign: 'center' }}>
          <Icon
            size={150}
            style={{
              color: '#359BCF'
            }}
            type={this.state.icon.value}
          />
        </div>

        <br/><br/>
        <div style={{
          border: '1px solid #E3E6E7',
          boxSizing: 'border-box',
          height: 400,
          padding: '10px',
          position: 'relative',
          width: '100%'
        }}>
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
          <br/><br/>
          <div style={{ textAlign: 'center' }}>
            <Icon
              size={150}
              style={{
                color: '#359BCF'
              }}
              type={this.state.icon.value}
            />
          </div>
        </div>

        <br/><br/>
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

        <br/><br/>
        <div style={{ padding: '100px', position: 'relative' }}>
          <Loader isLoading={true} isRelative={true} />
        </div>

        <br/><br/>
        <DatePicker
          closeOnDateSelect={true}
          defaultDate={this.state.selectedDatePickerDate}
          onDateSelect={this._handleDateSelect}
          showDayBorders={false}
        />

        <br/><br/>
        <div style={{
          border: '1px solid #E3E6E7',
          boxSizing: 'border-box',
          height: 400,
          padding: '10px',
          position: 'relative',
          width: '100%'
        }}>
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
        <br/><br/>
      </div>
    );
  }
});

ReactDOM.render(<Demo />, document.getElementById('demo'));
