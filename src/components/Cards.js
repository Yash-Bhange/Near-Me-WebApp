import React from 'react'
import CardItem from './CardItem'
import '../components_css/Cards.css'

import choice from './choice.jpg'
import convenience from './convenience.jpg'
import subs from './img5.jpg'
import reliable from './img1.png'
import exposure from './img2.png'

function Cards() {
    return (
        <div className='cards'>
            <h1 >WHY JOIN WITH US??</h1>
            <div className='cards__container'>
                <div className="cards__wrapper">
                    <ul className='cards__items'>
                        <CardItem
                        src={convenience}
                        text='A Convenient solution to find all the service providers in one place!!!'
                        label='Convenient'
                        path='/'
                        />
                        <CardItem
                        src={choice}
                        text='Search from all available options for multiple choices!!'
                        label='Explore More!!'
                        path='./explore'
                        />
                    </ul>
                    <ul className='cards__items'>
                        <CardItem
                        src={exposure}
                        text='Reach out to more people and provide a better service!!'
                        label='Exposure!!'
                        path='/'
                        />
                        <CardItem
                        src={reliable}
                        text='Review the service provider based on their work!!'
                        label='Reliability!!'
                        path='/'
                        />
                        <CardItem
                        src={subs}
                        text='Take the Subscription and get a chance to feature on our Home Page!!'
                        label='Subscribe!!!'
                        path='/'
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards
