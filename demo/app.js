const React = require('react');
const ReactDOM = require('react-dom');
const moment = require('moment');

const {
  Button,
  DonutChart,
  Icon,
  Loader,
  Modal,
  RangeSelector,
  Select,
  SelectFullScreen,
  TimeBasedLineChart,
  ToggleSwitch,
  TypeAhead,
  DatePicker,
  DatePickerFullScreen
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
    timeStamp: moment().subtract(15, 'days').startOf('day').unix(),
    value: 800
  },
  {
    timeStamp: moment().subtract(14, 'days').startOf('day').unix(),
    value: 900
  },
  {
    timeStamp: moment().subtract(13, 'days').startOf('day').unix(),
    value: 1200
  },
  {
    timeStamp: moment().subtract(12, 'days').startOf('day').unix(),
    value: 850
  },
  {
    timeStamp: moment().subtract(11, 'days').startOf('day').unix(),
    value: 660
  },
  {
    timeStamp: moment().subtract(10, 'days').startOf('day').unix(),
    value: 720
  },
  {
    timeStamp: moment().subtract(9, 'days').startOf('day').unix(),
    value: 900
  },
  {
    timeStamp: moment().subtract(8, 'days').startOf('day').unix(),
    value: 700
  },
  {
    timeStamp: moment().subtract(7, 'days').startOf('day').unix(),
    value: 600
  },
  {
    timeStamp: moment().subtract(6, 'days').startOf('day').unix(),
    value: 1200
  },
  {
    timeStamp: moment().subtract(5, 'days').startOf('day').unix(),
    value: 900
  },
  {
    timeStamp: moment().subtract(4, 'days').startOf('day').unix(),
    value: 800
  },
  {
    timeStamp: moment().subtract(3, 'days').startOf('day').unix(),
    value: 600
  },
  {
    timeStamp: moment().subtract(2, 'days').startOf('day').unix(),
    value: 1600
  },
  {
    timeStamp: moment().subtract(1, 'days').startOf('day').unix(),
    value: 1700
  },
  {
    timeStamp: moment().startOf('day').unix(),
    value: 1400
  },
  {
    timeStamp: moment().add(1, 'days').startOf('day').unix(),
    value: 1200
  },
  {
    timeStamp: moment().add(2, 'days').startOf('day').unix(),
    value: 1200
  },
  {
    timeStamp: moment().add(3, 'days').startOf('day').unix(),
    value: 1700
  },
  {
    timeStamp: moment().add(4, 'days').startOf('day').unix(),
    value: 1100
  },
  {
    timeStamp: moment().add(5, 'days').startOf('day').unix(),
    value: 1000
  },
  {
    timeStamp: moment().add(6, 'days').startOf('day').unix(),
    value: 900
  },
  {
    timeStamp: moment().add(7, 'days').startOf('day').unix(),
    value: 1000
  },
  {
    timeStamp: moment().add(8, 'days').startOf('day').unix(),
    value: 850
  },
  {
    timeStamp: moment().add(9, 'days').startOf('day').unix(),
    value: 1500
  },
  {
    timeStamp: moment().add(10, 'days').startOf('day').unix(),
    value: 1100
  },
  {
    timeStamp: moment().add(11, 'days').startOf('day').unix(),
    value: 1000
  },
  {
    timeStamp: moment().add(12, 'days').startOf('day').unix(),
    value: 800
  },
  {
    timeStamp: moment().add(13, 'days').startOf('day').unix(),
    value: 1100
  },
  {
    timeStamp: moment().add(14, 'days').startOf('day').unix(),
    value: 1300
  },
  {
    timeStamp: moment().add(15, 'days').startOf('day').unix(),
    value: 2200
  }
];

const Demo = React.createClass({
  getInitialState () {
    return {
      icon: {
        value: 'accounts',
        displayValue: 'Accounts'
      },
      lineChartData: [],
      selectedDatePickerDate: moment().unix(),
      showModal: false,
      showSmallModal: false,
      windowWidth: document.documentElement.clientWidth || document.body.clientWidth
    }
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
    })
  },

  render () {
    return (
      <div>
        <br/><br/>
        <div style={{ textAlign: 'center', fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <Button onClick={this._handleModalClick}>Show Default Modal (Primary Button)</Button>
          <br/><br/>
          <Button onClick={this._handleSmallModalClick} type='secondary'>Show Small Modal (Secondary Button)</Button>
          <br/><br/>
          <Button type='primaryOutline'>Primary Outline Button</Button>
          <br/><br/>
          <Button type='secondaryOutline'>Secondary Outline Button</Button>
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
          tooltipLabel='This is the footer text.'
          title='This is the header text'
          tooltip='This is my tooltip content'
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
            hoverCallBack={this._handleLineChartHover}
            rangeType={'day'}
            shadeAreaBelowZero={true}
            width={700}
          />
        </div>

        <br/><br/>
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
          options={icons}
          optionStyle={{
            color: '#333'
          }}
          optionHoverStyle={{
            backgroundColor: '#359BCF',
            color: '#fff'
          }}
          placeholderText='Pick One'
          selected={this.state.icon}
          valid={true}
        />

        <br/><br/>
        <div style={{ textAlign: 'center' }}>
          <Icon
            type={this.state.icon.value}
            size={150}
            style={{
              color: '#359BCF'
            }}
          />
        </div>

        <br/><br/>
        <div style={{
          border: '1px solid #E3E6E7' ,
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
            options={icons}
            optionHoverStyle={{
              backgroundColor: '#359BCF',
              color: '#fff'
            }}
            placeholderText='Pick One'
            selected={this.state.icon}
          />
          <br/><br/>
          <div style={{ textAlign: 'center' }}>
            <Icon
              type={this.state.icon.value}
              size={150}
              style={{
                color: '#359BCF'
              }}
            />
          </div>
        </div>

        <br/><br/>
        <RangeSelector
          defaultLowerValue={18}
          defaultUpperValue={30}
          interval={1}
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
          lowerBound={-25}
          upperBound={100}
          selectedColor='#359BCF'
        />

        <br/><br/>
        <div style={{ padding: '100px', position: 'relative' }}>
          <Loader isLoading={true} isRelative={true} />
        </div>

        <br/><br/>
        <DatePicker
          closeOnDateSelect={true}
          defaultDate={this.state.selectedDatePickerDate}
          showDayBorders={false}
          onDateSelect={this._handleDateSelect}
        />

        <br/><br/>
        <div style={{
          border: '1px solid #E3E6E7' ,
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
            showDayBorders={false}
            title='Select A Date'
            onDateSelect={this._handleDateSelect}
          />
        </div>
        <br/><br/>
      </div>
    );
  },

  _handleLineChartHover (data) {
    this.setState({
      lineChartHoverValue: data.value
    });
  },

  _handleSelectChange (option) {
    this.setState({
      icon: option
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
  }
});

ReactDOM.render(<Demo />, document.getElementById('demo'));