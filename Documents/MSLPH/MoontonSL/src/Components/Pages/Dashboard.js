import React, { useEffect, useState } from 'react'
import "../CSS/dashboard.css";
import { Link } from 'react-router-dom';
import { 
    FaPlus
} from 'react-icons/fa';
import { 
    PiImagesSquare,
    PiShareFat   
} from "react-icons/pi";
import { 
    RiPoliceBadgeFill,
    RiVerifiedBadgeFill 
} from "react-icons/ri";

const Dashboard = () => {
  return (
    <div className='mainContainer dashboard'>
        {/* <section className="dashboardPageContainer top">
            <div className="dshPageContent top1">
                <div>
                    <img src={require('../assets/imgs/MSLSilhoutte/lgbtqaSilhoutte.png')} alt="" />
                </div>
                <input type="text" placeholder='Ipakita ang Lakas MSL...' readOnly disabled/>
                <button><PiImagesSquare className='faIcons'/></button>
            </div>
            <div className="dshPageContent top2">
                <div className="dshpcTop2 left">
                    <div>
                        <h5><FaPlus className='faIcons'/></h5>
                        <p>Add Story</p>
                    </div>
                </div>
                <div className="dshpcTop2 right">
                    <div className="dshpcTop2r story">

                    </div>
                    <div className="dshpcTop2r story">
                        
                    </div>
                    <div className="dshpcTop2r story">
                        
                    </div>
                </div>
            </div>
            <hr />
        </section> */}<br/><br/>
        <section className="dashboardPageContainer mid">
            <div className="dshPageContent mid">
                <div className="dshpcmPost">
                    <div className='dshpcmpUser'>
                        <div className="dshpcmpuContent">
                            <div>
                                <img src={require('../assets/imgs/MSLSilhoutte/lgbtqaSilhoutte.png')} alt="" />
                            </div>
                            <span>
                                <h6>SERP - Koswi <RiVerifiedBadgeFill className='faIcons gold'/></h6>
                                <p>May 10, 2024</p>
                            </span>
                        </div>
                        <div className="dshpcmpuShare">
                            {/* <button><PiShareFat className='faIcons'/></button> */}
                        </div>
                    </div>
                    <div className="dshpcmpPostText">
                        <p>Ipakita kung sino ang Pinakamalakas na Pamantasan sa MSL Collegiate Cup.</p>
                    </div>
                    <div className="dshpcmpPostMedia">
                        <img src={require('../assets/imgs/MSLSecondPostImage.png')} alt="" />
                    </div>
                </div>
                <div className="dshpcmPost">
                    <div className='dshpcmpUser'>
                        <div className="dshpcmpuContent">
                            <div>
                                <img src={require('../assets/imgs/MSLSilhoutte/lgbtqaSilhoutte.png')} alt="" />
                            </div>
                            <span>
                                <h6>SERP - Koswi <RiVerifiedBadgeFill className='faIcons gold'/></h6>
                                <p>May 10, 2024</p>
                            </span>
                        </div>
                        <div className="dshpcmpuShare">
                            {/* <button><PiShareFat className='faIcons'/></button> */}
                        </div>
                    </div>
                    <div className="dshpcmpPostText">
                        <p>Welcome to Moonton Student Leaders Ph website.</p>
                    </div>
                    <div className="dshpcmpPostMedia">
                        <img src={require('../assets/imgs/MSLFirstPostImage.png')} alt="" />
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Dashboard