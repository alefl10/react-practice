const React = require('react');
const PropTypes = require('prop-types');

class AddAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.toggleAptDisplay = this.toggleAptDisplay.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  toggleAptDisplay() {
    this.props.handleToggle();
  }

  handleAdd(e) {
    const tempItem = {
      petName: this.refs.inputPetName.value,
      ownerName: this.refs.inputOwnerName.value,
      aptDate: this.refs.inputAptDate.value + ' ' +
              this.refs.inputAptDate.value,
      aptNotes: this.refs.inputAptNotes.value,
    }
    e.preventDefault();
    this.props.addApt(tempItem);
  }

  render() {
    const displayApyBody = {
      display: this.props.bodyVisible ? 'block' : 'none',
    }

    return (
      <div className="panel panel-primary">
        <div className="panel-heading apt-addheading" onClick={this.toggleAptDisplay}>
        <span className="glyphicon glyphicon-plus"></span> Add Appointment</div>
        <div className="panel-body" style={displayApyBody}>
          <form className="add-appointment form-horizontal" onSubmit={this.handleAdd}>
            <div className="form-group">
              <label className="col-sm-2 control-label" htmlFor="petName">Pet Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control"
                  id="petName" ref="inputPetName" placeholder="Pet's Name" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label" htmlFor="petOwner">Pet Owner</label>
              <div className="col-sm-10">
                <input type="text" className="form-control"
                  id="petOwner" ref="inputOwnerName" placeholder="Owner's Name" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label" htmlFor="aptDate">Date</label>
              <div className="col-sm-4">
                <input type="date" className="form-control"
                  id="aptDate" ref="inputAptDate" />
              </div>
              <label className="col-sm-2 control-label" htmlFor="aptTime">Time</label>
              <div className="col-sm-4">
                <input type="time" className="form-control"
                  id="aptTime" ref="inputAptTime" />
              </div>

            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label" htmlFor="aptNotes">Apt. Notes</label>
              <div className="col-sm-10">
                <textarea className="form-control" rows="4" cols="50"
                  id="aptNotes" ref="inputAptNotes" placeholder="Appointment Notes"></textarea>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-primary pull-right">Add Appointment</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AddAppointment.propTypes = {
  bodyVisible: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
  addApt: PropTypes.func.isRequired,
}

module.exports = AddAppointment;
