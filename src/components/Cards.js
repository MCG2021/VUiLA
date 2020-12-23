import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Services Offered</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/Services/service1_a1.jpg'
              text='Shifting The 60-Year-Old Traditional Container Into Smart Containers'
              label='Smart Containers'
              path='/services'
            />
            <CardItem
              src='images/Services/service2_a1.jpg'
              text='Advancing The Intelligent TMT System (Track-Monitor-Trace)'
              label='Track-Monitor-Trace'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/Services/service3_a1.jpg'
              text='Fulfilling The Essential Needs Of End-Consumers Even Beyond The Expectation'
              label='Customer expectation'
              path='/services'
            />
            <CardItem
              src='images/Home/business-1845350_1920.jpg'
              text='Supply chain resilience and risk management will be the key to upgrade and copy with the kinds of pandemics'
              label='Supply chain'
              path='/products'
            />
            <CardItem
              src='images/Home/web-4861605_1920.jpg'
              text='MCG Canada is AI and Blockchain-driven Company'
              label='Blockchain company'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;