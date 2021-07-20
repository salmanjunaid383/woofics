import React, { useState } from "react";
import LandingPage from './LandingPage/components/LandingPage';
import Footer from './LandingPage/components/Footer';
import Banner from './LandingPage/components/Banner'
import VisualScheme from './LandingPage/components/VisualScheme'
import LastNews from './LandingPage/components/LastNews'
import ScrollToTop from './ScrollToTop'

export default function Landing(){
    ScrollToTop();
    return (
        <>
        <LandingPage />
        <Banner />
        <VisualScheme />
        <LastNews />
        <Footer />
        </>
    )
} 