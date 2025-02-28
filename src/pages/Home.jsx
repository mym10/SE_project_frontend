import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/home.css';
import ExampleGraph from '../components/ExampleGraph';

const Home = () => {
    return (
        <div className="page-content"> 
            <Navbar/>
            <div className="main-content">
                <div className="d-flex justify-content-center" >
                    <div className="row flex-lg-row-reverse align-items-center g-5" style={{ width: "70%" }}>
                        <div className="col-10 col-sm-8 col-lg-6">
                            <div style={{ width: "100%", height: "300px" }}>
                                <ExampleGraph />
                            </div>

                        </div>
                        <div className="col-lg-6">
                            <h1 className="display-5 fw-bold lh-1 mb-3 text-white">
                            Unlock Insights from Your Academic Performance
                            </h1>
                            <p className="lead text-white">
                            View and analyze your scores like never before! 
                            Students can track their progress with interactive visualizations, 
                            while professors can easily upload and manage grades. 
                            Gain deeper insights, identify trends, and take control of academic success.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;