import React, { Component } from 'react'
import AppHeader from './AppHeader'
import AppBody  from './AppBody'
import AppFooter from './AppFooter'

class LoggedInHome extends Component {

    render() {
        return <div className='app'>
                <AppHeader {...this.props}/>
                <AppBody {...this.props}/>
                <AppFooter {...this.props}/>
               </div>
    }
}

export default LoggedInHome;