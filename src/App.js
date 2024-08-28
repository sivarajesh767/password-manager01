import './App.css'
import {Component} from 'react'
import {v4} from 'uuid'
const colorList = ['yellow', 'green', 'red', 'brown', 'blue']

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    isShow: false,
    isTrue: false,
    latestList: [],
  }
  listenWebsite = e => {
    this.setState({website: e.target.value})
  }
  listenUsername = e => {
    this.setState({username: e.target.value})
  }
  listenPassword = e => {
    this.setState({password: e.target.value})
  }
  searchList = e => {
    this.setState({searchInput: e.target.value})
  }
  onDeleteItem=(id)=>{
    const {latestList}=this.state
    const newList=latestList.filter(eachValue=>eachValue.id !== id)
    const caseOf=newList.length !== 0
    this.setState({latestList:newList, isTrue:caseOf})
  }
  showPassword=(e)=>{
    if (e.target.checked){
        this.setState({isShow:true})
    }else{
      this.setState({isShow:false})
    }
  }
  addContent = e => {
    e.preventDefault()
    const {password, username, website} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newValues = {
      id: v4,
      initialValue: initial,
      websiteName: website,
      classAdd: classValue,
      password: password,
      userName: username,
    }
    this.setState(preState => ({
      latestList: [...preState.latestList, newValues],
      password: '',
      searchInput: '',
      isTrue: true,
      website: '',
      username: '',
    }))
  }
  render() {
    const {website, username, isShow, password, latestList, searchInput} =
      this.state
    let {isTrue} = this.state
    const newList = latestList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length===0){
       isTrue=false
    }else{
       isTrue=true
    }

    return (
      <div className="bg-co">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="sub-div-1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png "
            alt="password manager"
            className="password-manager"
          />
          <form onSubmit={this.addContent} className="add-details">
            <h1 className="heading-1">Add New Password</h1>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="website-img"
              />
              <input
                type="text"
                onChange={this.listenWebsite}
                className="type-website"
                placeholder="Enter Website"
                value={website}
              />
            </div>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="username-img"
              />
              <input
                type="text"
                onChange={this.listenUsername}
                placeholder="Enter Username"
                className="type-username"
                value={username}
              />
            </div>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="password-img"
              />
              <input
                type="password"
                onChange={this.listenPassword}
                placeholder="Enter Password"
                className="type-password"
                value={password}
              />
            </div>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
        </div>
        <div className="sub-div2">
          <div className="first-div">
            <div className="your-password">
              <h1 className="heading-2">Your Password</h1>
              <p className="colored-text">{newList.length}</p>

              <div className="search-holder">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-img"
                />
                <input
                  type="search"
                  onChange={this.searchList}
                  className="input-element"
                  placeholder="search"
                />
              </div>
            </div>
          </div>
          <div className="show-password">
            <input
              type="checkbox"
              id="check"
              onChange={this.showPassword}
              className="check-box"
            />
            <label htmlFor="check" className="label-password">Show Password</label>
          </div>
          {isTrue && (
            <div className="empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no password"
                className="noPassword-img"
              />
              <p className="no-password">No Password</p>
            </div>
          )}
          {isTrue && (
            <ul className="result-container">
            {newList.map(eachValue=>(
              <li key={eachValue.id} id={eachValue.id} className="item-list">
              <p className={`initial ${eachValue.classAdd}`}>{eachValue.initialValue}</p>
              <div className="list-container">
              <p className="website">{eachValue.websiteName}</p>
              <p className="website">{eachValue.userName}</p>
              
              {isShow &&(
                <img src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png" alt="stars" className="stars-img"/>
                
              )}

              {isShow && <p className="website">{eachValue.password}</p>}
              
              
              </div>
              <button testid="delete" type="button" onClick={()=>this.onDeleteItem(eachValue.id)}>
              
              <img src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png" alt="delete" className="delete-img"/>
              </button>  
              </li>
            ))}
            
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
