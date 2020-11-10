import React, { Component } from 'react'
// import logo from './logo.jpeg';
import OnboardingCompany from './Onboarding/OnboardingCompany.js';


class AppBody extends Component {

    render() {
        return <div>
          
            < OnboardingCompany {...this.props} /> 
            <p>
                This is the App Body {this.props.account}
            </p>
        </div>
    }
}

export default AppBody;