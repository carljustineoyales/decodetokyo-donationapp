import React, { createContext, Component } from 'react';
export const RegistrationContext = createContext();

export class RegistrationContextProvider extends Component {

  constructor(props) {
    super(props);
    this.state= {
      isSuccess:false
    }
  }
  
  handleOnSuccess = () => {
    this.setState({isSuccess:true})
    console.log(this.state)
  }

  render() {
    return (
      <RegistrationContext.Provider value={{...this.state, handleOnSuccess:this.handleOnSuccess}}>
        {this.props.children}
      </RegistrationContext.Provider>
    );
  }
}

export default RegistrationContextProvider;
