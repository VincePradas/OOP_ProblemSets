import React, { useEffect, useState } from "react";
import "../CSS/programs.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Programs = () => {
  return (
    <div className="mainContainer programs">
      <section className="programsPageContainer top">
        <div className="programsPageContent top1">
          <h4>MSL PROGRAMS</h4>
          <h6>We don't just play games, we deliver academic excellence</h6>
          <div className="progpcHighlights">
            <div className="progpchContainer">
              <div className="prpccImgContent">
                <img
                  className="prpccic left"
                  src={require("../assets/imgs/MLSkins/NatanSkin.png")}
                  alt=""
                />
                <h2>SEPP</h2>
              </div>
              <h5>SCHOOL EVENTS PARTNERSHIP PROGRAM</h5>
              <p>
                It is where tournaments and contests are undertaken where only
                students of partnered universities are able to join. They
                promote academically and as well as sporty inclined students.
                Sponsorships will be coming through also, as rewards of winning
                every tournament and contest. That's what the School Events
                Partnership Program or SEPP are made for.
              </p>
              <div className="prpccReadMore">
                <Link>Read More</Link>
              </div>
            </div>
            <div className="progpchContainer">
              <div className="prpccImgContent">
                <img
                  className="prpccic right"
                  src={require("../assets/imgs/MLSkins/SilvanaSkin.png")}
                  alt=""
                />
                <h2>EOSR</h2>
              </div>
              <h5>END OF SEMESTER REWARDS</h5>
              <p>
                EOSR is crafted for our MLBB student communities, deeply rooted
                in our objective of achieving balanced gaming and academics. Its
                fundamental goal is to recognize your commitment, effort, and
                successes along your academic journey. MSL Philippines values
                your grades through in-game diamonds and can earn up to 3,500 by
                doing your best in academics!
              </p>
              <div className="prpccReadMore">
                <Link>Read More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="programsPageContainer mid">
        <div className="programsPageContent mid1">
          <div className="progpcOthers">
            <div className="progpchContainer">
              <div className="prpccImgContent">
                <img
                  className="prpccic left"
                  src={require("../assets/imgs/MLSkins/EsmeraldaSkin.png")}
                  alt=""
                />
                <h2>NETW</h2>
              </div>
              <h5>MSL NETWORK</h5>
              <p>
                To qualify for the MSL Network, an organization must meet
                several criteria. It must be focused on gaming or esports,
                officially recognized by its school, and have a clear structure
                with defined roles such as CEO, President, Committee Heads,
                Managers, and Players. These requirements ensure that only
                legitimate and well-organized groups are admitted to the MSL
                Network.
              </p>
              <div className="prpccReadMore">
                <Link>Read More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
