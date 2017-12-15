```
class Clock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {date: new Date()}
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
      )
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  handleClick(e) {
    console.log(e)
    e.preventDefault()
    console.log('sth is clicked')
  }



  render() {
    const button = <div>看看我</div>
    return (
      <div>
        {button}
        <h2 onClick={handleClick}>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}
```


- componentDidMount
- componentWillUnmount
- `<button onClick={this.deleteRow.bind(this, xx)}>`  
- `<button onClick={e => this.deleteRow(xx, e)}></button>` **e不可或缺**
