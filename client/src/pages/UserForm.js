import  React       , {Component, Fragment} from 'react'                ;
import  Registration                        from '../components/forms/Registration';
import  axios                               from 'axios'                ;
import {strapi      ,withToken}             from '../components/functions'         ;

export class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      title: '',
      description: '',
      goalFund: '',
      currency:'',
      id:'',
      username:'',
      password:'',
      error: ''
      //add image later
    }
  }
  login = (user,pass) => {
    const data ={
      identifier:user,
      password:pass
    }
    // console.log(data)
    axios.post(`${strapi}/auth/local`,data)
    .then(res=>{
      console.log(res.data)
      if (undefined === res.data.jwt) {
        this.setState({error: res.data.message, loading: false});
        return;
      }
      sessionStorage.setItem ('JWT', res.data.jwt               );
      sessionStorage.setItem ('username', res.data.user.username);
      sessionStorage.setItem ('role', res.data.user.role.type   );
      sessionStorage.setItem ('id', res.data.user.id            );
      this.redirect();
    })
    .catch(err=>{console.log(err.response.data.message)})
  }

  redirect = () => {
    if (withToken()) {
      console.log('redirecting')
      window.parent.location = '/create-campaign';
    }
  }

  render() {
      return (
        <Fragment>
          <Registration
            login={this.login}
            />
        </Fragment>
      );
  }

}

export default UserForm;
