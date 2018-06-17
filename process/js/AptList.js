const React = require('react');
const PropTypes = require('prop-types');

class AptList extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.onDelete(this.props.whichItem);
  }

  render() {
    return (
      <li className="pet-item media">
        <div className="media-left">
          <button className="pet-delete btn btn-xs btn-danger" onClick={this.handleDelete}>
            <span className="glyphicon glyphicon-remove"></span>
          </button>
        </div>
        <div className="pet-info media-body">
          <div className="pet-head">
            <span className="pet-name">{this.props.singleItem.petName}</span>
            <span className="apt-date pull-right">{this.props.singleItem.aptDate}</span>
          </div>
          <div className="owner-name"><span className="label-item">Owner: </span>
            {this.props.singleItem.ownerName}
          </div>
          <div className="apt-notes">
            {this.props.singleItem.aptNotes}
          </div>
        </div>
      </li>
    );
  }
}

AptList.propTypes = {
  singleItem: PropTypes.shape({
    petName: PropTypes.string.isRequired,
    ownerName: PropTypes.string.isRequired,
    aptDate: PropTypes.string.isRequired,
    aptDate: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  whichItem: PropTypes.shape({
    petName: PropTypes.string.isRequired,
    ownerName: PropTypes.string.isRequired,
    aptDate: PropTypes.string.isRequired,
    aptDate: PropTypes.string.isRequired,
  }).isRequired,
};

module.exports = AptList;
