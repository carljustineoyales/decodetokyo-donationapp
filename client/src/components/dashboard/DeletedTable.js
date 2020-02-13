import  React      , {Component} from 'react'        ;
import  axios                    from 'axios'        ;
import {strapi     }             from '../functions' ;
import  DeletedItem              from './DeletedItem';
export class DeletedTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter:'',
      items: [],
      error: ''
    }
    this.reRender = this.reRender.bind(this)
  }
  
  handleOnchange = (event) => {
    this.setState({filter: event.target.value})
  }


  componentDidMount() {
    this._isMounted = true;
    axios
      .get(`${strapi}/campaigns?deleted=true`)
      .then(res => {
        console.log(res.data)
        if (this._isMounted) {
          this.setState({items: res.data})
        }
      })
      .catch(err=>{console.log(err.response.data.message)})
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  reRender= ()=>  {
    this.componentDidMount();
  
  }
  render() {
    const {filter} = this.state;
    const filteredItems = this.state.items.filter(item => {
      return item.reference.includes(filter.toLowerCase())
    })
    return (
      <div>
        <h2>Deleted</h2>
        <p>This table shows deleted campaigns</p>
        <input type='text' onChange={this.handleOnchange} placeholder='search'/>
        <table className="table table-hover">
          <thead>
            <tr>
              <th >Ref. ID</th>
              <th >Title</th>
              <th >Author</th>
              <th >Goal</th>
              <th >Date Created</th>
              <th >Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (<DeletedItem key={item.id} item={item} reRender={this.reRender}/>))}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    );
  }
}

export default DeletedTable;
