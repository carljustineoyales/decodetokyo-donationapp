import  React      , {Component} from 'react'        ;
import  axios                    from 'axios'        ;
import {strapi     }             from '../functions' ;
import  DeletedItem              from './DeletedItem';
export class DeletedTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      error: ''
    }
    this.reRender = this.reRender.bind(this)
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

  // componentDidUpdate(){
  //   axios
  //     .get(`${strapi}/campaigns?deleted=true`)
  //     .then(res => {
  //       if (this._isMounted) {
  //         this.setState({items: res.data})
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err.response.data.message)
  //     })
  // }

  componentWillUnmount() {
    this._isMounted = false;
  }

  reRender= ()=>  {
    this.componentDidMount();
  
  }
  render() {
    const {items} = this.state
    return (
      <div>
        <h2>Deleted</h2>
        <p>This table shows deleted campaigns</p>
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
            {items.map(item => (<DeletedItem key={item.id} item={item} reRender={this.reRender}/>))}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    );
  }
}

export default DeletedTable;
