import React from 'react'
import Slider from './Slider'
import AboutUsSection from './AboutUsSection'
import ProductSection from './ProductSection'
import CounterSection from './CounterSection'
import WhyChooseUs from './WhyChooseUs'

export default function Home() {
    return (
        <div>
            <Slider />
            <AboutUsSection />
            <ProductSection />
            <WhyChooseUs />
            <CounterSection />
        </div>
    )
}
