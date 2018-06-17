const React = require('react');
const ReactDOM = require('react-dom');
const AptList = require('./AptList');
const AddAppointment = require('./AddAppointment');
const SearchAppointment = require('./SearchAppointment');
const _ = require('lodash');

class MainInterface extends React.Component {
  constructor(props) {
    super(props);
    this.filterAppointments = this.filterAppointments.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.toggleAddDisplay = this.toggleAddDisplay.bind(this);
    this.addItem = this.addItem.bind(this);
    this.order = this.order.bind(this);
    this.reOrder = this.reOrder.bind(this);
    this.searchApt = this.searchApt.bind(this);
  }

  componentWillMount() {
    this.setState({
      orderBy: 'petName',
      orderDir: 'asc',
      aptBodyVisible: false,
      queryText: '',
    });
  }

  componentDidMount() {
    this.serverRequest = $.get('./js/data.json', (result) => {
      this.setState({
        myAppointments: result,
      });
    });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  filterAppointments(appoinments) {
    const filteredAppoinments = appoinments.map((item, index) => {
      return (
        <AptList
          key={index}
          singleItem={item}
          whichItem={item}
          onDelete = {this.deleteMessage}
        />
      );
    });
    return filteredAppoinments;
  }

  deleteMessage(item) {
    const allApts = this.state.myAppointments;
    const newApts = _.without(allApts, item);
    this.setState({
      myAppointments: newApts,
    });
  }

  toggleAddDisplay() {
    const tempVisibility = !this.state.aptBodyVisible;
    this.setState({
      aptBodyVisible: tempVisibility,
    })
  }

  addItem(newItem) {
    const tempApts = this.state.myAppointments;
    tempApts.push(newItem);
    this.setState({
      myAppointments: tempApts,
    });
  }

  order(appointments) {
    const orderBy = this.state.orderBy;
    const orderDir = this.state.orderDir;
    return _.orderBy(appointments, (item) => {
      return item.props.singleItem[orderBy].toLowerCase()
    }, orderDir);
  }

  reOrder(orderBy, orderDir) {
    this.setState({
      orderBy: orderBy,
      orderDir: orderDir,
    });
  }

  searchApt(q) {
    this.setState({
      queryText: q,
    });
  }

  render() {
    if(this.state.myAppointments !== undefined) {
      // let filteredApts = this.filterAppointments(this.state.myAppointments);
      let filteredApts = []
      const queryText = this.state.queryText;
      const myApts = this.filterAppointments(this.state.myAppointments);

      myApts.forEach((apt) => {
        if (
          (apt.props.singleItem.petName.toLowerCase().indexOf(queryText) != -1) ||
          (apt.props.singleItem.ownerName.toLowerCase().indexOf(queryText) != -1) ||
          (apt.props.singleItem.aptDate.toLowerCase().indexOf(queryText) != -1) ||
          (apt.props.singleItem.aptNotes.toLowerCase().indexOf(queryText) != -1)
        ) {
          filteredApts.push(apt);
        }
      })

      if(filteredApts.length !== 0) {
        filteredApts = this.order(filteredApts);
      }
      return (
        <div className="interface">
          <AddAppointment
            bodyVisible={this.state.aptBodyVisible}
            handleToggle={this.toggleAddDisplay}
            addApt={this.addItem}
          />
          <SearchAppointment
            orderBy={this.state.orderBy}
            orderDir={this.state.orderDir}
            onReOrder={this.reOrder}
            onSearch={this.searchApt}
          />
          <ul className="item-list media-list">{filteredApts}</ul>
        </div>
      );
    } else {
      return null;
    }
  } // render
} // MainInterface

ReactDOM.render(
  <MainInterface />,
  document.getElementById('petAppointments')
); // render
