import React from 'react';
import '../../App.css';

import AboutComponent from '../AboutComponent';
import { homeObjOne } from './ServicesData';
import { homeObjTwo } from './ServicesData';
import { homeObjThree } from './ServicesData';
import Footer from '../Footer';

export default function Services() {
  return( 
    <>
  <h1 className='services'>SERVICES</h1>
  <AboutComponent {...homeObjOne}/>
  <AboutComponent {...homeObjTwo}/>
  <AboutComponent {...homeObjThree}/>
  <Footer />
  </>
  );
}