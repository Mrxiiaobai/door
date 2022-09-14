import { PureComponent } from 'react'
import { connect } from 'dva'

class Login extends PureComponent{
  render() {
    return <div>
      <h1>Login index</h1>
  </div>
  }
}

export default connect(({  }) => ({
}))(Login);