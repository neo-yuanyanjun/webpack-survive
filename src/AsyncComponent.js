import React, {Component} from 'react'

export default class AsyncComponent extends Component {
  static propTypes = {}

  static defaultProps = {}

  state = {
    Com: null,
  }

  componentDidMount() {
    const {loader} = this.props
    loader().then(Com => this.setState({Com}))
  }

  render() {
    const {Com} = this.state
    const {Placeholder, ...props} = this.props
    return Com ? <Com {...props} /> : < Placeholder />
  }
}
