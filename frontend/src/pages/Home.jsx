import React from 'react'
import Hero from '../components/Hero'
// import Mission from '../components/Mission'

import WhyVerzat from '../components/WhyVerzat'
import Services from '../components/Services'
import Contact from '../components/Contact'
import RDProjectsSection from '../components/RDLatestProjects'
import ParentCompanySection from '../components/ParentCompanySection'
import Vision from '../components/Vision'



const Home = () => {
  return (
    <div>
        <Hero />
        <Services />
        <WhyVerzat />
       <Vision />
        {/* <Mission /> */}
        <ParentCompanySection />
        <RDProjectsSection />
        <Contact />
    </div>
  )
}

export default Home