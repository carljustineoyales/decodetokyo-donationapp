import React          , {Component} from 'react'            ;
import IncomingTable                from './IncomingTable'  ;
import DeletedTable                 from './DeletedTable'   ;
import SupporterTable               from './SupporterTable' ;
import UsersTable                   from './UsersTable'     ;

export class CampaignTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: 'incoming',
      error: ''
    }
  }

  incoming =(event) => {
    event.preventDefault();
    this.setState({table: 'incoming'})
  }
  deleted =(event) => {
    event.preventDefault();
    this.setState({table: 'deleted'})
  }
  users = (event) => {
    event.preventDefault();
    this.setState({table: 'users'})
  }
  supporter = (event) => {
    event.preventDefault();
    this.setState({table: 'supporter'})
  }

  renderSwitch = (table) => {
    switch (table) {
      case 'incoming':
        return (<IncomingTable/>)

      case 'deleted':
        return (<DeletedTable/>)

      case 'users':
        return (<UsersTable/>)
        
      case 'supporter':
        return (<SupporterTable/>)
      default:
        return (
          <h1>Something went Wrong</h1>
        )
    }
  }

  render() {
    const {table} = this.state
    return (
      <div>
      <div className="btn-group btn-group-toggle" data-toggle="buttons">
  <label className="btn btn-primary active" onClick={this.incoming}>
    <input type="radio" name="options" id="option1"  defaultChecked/> Incoming
  </label>
  <label className="btn btn-primary" onClick={this.deleted}>
    <input type="radio" name="options" id="option2" /> Deleted
  </label>
  <label className="btn btn-primary" onClick={this.users}>
    <input type="radio" name="options" id="option2" /> Users
  </label>
  <label className="btn btn-primary" onClick={this.supporter}>
    <input type="radio" name="options" id="option3"/> Supporters
  </label>
</div>
        
        {this.renderSwitch(table)}
      </div>
    );
  }
}

export default CampaignTable;
