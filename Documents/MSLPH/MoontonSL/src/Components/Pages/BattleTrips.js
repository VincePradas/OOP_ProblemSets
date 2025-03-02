import React, { useEffect, useState } from "react";
import "../CSS/battleTrips.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserProfileData } from "./UserProfileContext";

const BattleTrips = () => {
  const { userLoggedData } = UserProfileData();
  const [insertAnswer, setInsertAnswer] = useState("");
  const [registrationResponse, setRegistrationResponse] = useState("");
  const [submitLoader, setSubmitLoader] = useState(false);
  const btRegistrationAPI =
    process.env.REACT_APP_MSL_BATTLE_TRIPS_REGISTRAION_API;

  const [slFullname, setSlFullname] = useState("");
  const [slAge, setSlAge] = useState("");
  const [slEmail, setSlEmail] = useState("");
  const [slContact, setSlContact] = useState("");
  const [slFacebook, setSlFacebook] = useState("");
  const [slMLID, setSlMLID] = useState("");
  const [slMLServer, setSlMLServer] = useState("");
  const [slSchoolname, setSlSchoolname] = useState("");
  const [slSchoolArea, setSlSchoolArea] = useState("");
  const [slSchoolID, setSlSchoolID] = useState("");
  const [slCommunity, setSLCommunity] = useState("");

  const handleUserRegister = async (e) => {
    e.preventDefault();
    setSubmitLoader(true);

    const formRegisterBT = {
      slOrganization: slCommunity,
      slFullname:
        slFullname || `${userLoggedData.givenname} ${userLoggedData.surname}`,
      slAge: userLoggedData.age || slAge,
      slEmail: userLoggedData.email || slEmail,
      slContact: userLoggedData.contact || slContact,
      slFacebook: userLoggedData.facebook || slFacebook,
      slMlid: userLoggedData.mslid || slMLID,
      slMlserver: userLoggedData.mslserver || slMLServer,
      slSchoolName: userLoggedData.schoolname || slSchoolname,
      slSchoolArea: userLoggedData.schoolarea || slSchoolArea,
      slSchoolid: userLoggedData.schoolid || slSchoolID,
      slAnswer: insertAnswer,
      slStatus: "Pending",
    };

    try {
      const btRegistrationResponse = await axios.post(
        btRegistrationAPI,
        formRegisterBT
      );
      const responseMessage = btRegistrationResponse.data;

      if (responseMessage.success) {
        setInsertAnswer("");
        setRegistrationResponse(responseMessage.message);
        setSubmitLoader(false);
        setSlFullname("");
        setSlAge("");
        setSlEmail("");
        setSlContact("");
        setSlFacebook("");
        setSlMLID("");
        setSlMLServer("");
        setSlSchoolname("");
        setSlSchoolArea("");
        setSlSchoolID("");
      } else {
        setRegistrationResponse(responseMessage.message);
        setSubmitLoader(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mainContainer battleTrips">
      <section className="btPageContainer top">
        <div className="btPageContent top">
          <img
            src="https://mslphdatasheet.site/MSLEventsImages/BattleTripsLogo.png"
            alt=""
          />
          <div className="btptopDetails">
            <div className="btptpddTitle">
              <p>
                MPL Battle Trips is a 5-week event where fans of MLBB from
                around the Philippines will be given a chance to visit the MPL
                PH venue and enjoy the MLBB Events.
              </p>
            </div>
            <div className="btptpddForm">
              <div className="btptpddfContent">
                {/* <h6>Battle Trip Guess</h6> */}
                <img
                  id="guessQuestion"
                  src={require("../assets/imgs/BT7.png")}
                  alt=""
                />
                <p>
                  How many differences can you spot in the Battle Trips logo?
                </p>
                <div className="btptpddfc">
                  {(!userLoggedData || userLoggedData.length >= 0) && (
                    <>
                      <input
                        type="text"
                        placeholder="Full Name"
                        onChange={(e) => setSlFullname(e.target.value)}
                      />
                      <input
                        type="number"
                        placeholder="Age"
                        onChange={(e) => setSlAge(e.target.value)}
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        onChange={(e) => setSlEmail(e.target.value)}
                      />
                      <input
                        type="number"
                        placeholder="Contact Number"
                        onChange={(e) => setSlContact(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Facebook Link"
                        onChange={(e) => setSlFacebook(e.target.value)}
                      />
                      <input
                        type="number"
                        placeholder="MLBB ID (ie. 9923103)"
                        onChange={(e) => setSlMLID(e.target.value)}
                      />
                      <input
                        type="number"
                        placeholder="ML Server (ie. 5932)"
                        onChange={(e) => setSlMLServer(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Your School Name or CH Area"
                        onChange={(e) => setSlSchoolname(e.target.value)}
                      />
                      <select
                        name=""
                        id=""
                        onChange={(e) => setSlSchoolArea(e.target.value)}
                      >
                        <option value="">Select School Area</option>
                        <option value="Luzon">Luzon</option>
                        <option value="Visayas">Visayas</option>
                        <option value="Mindanao">Mindanao</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Drive Link of your Valid ID..."
                        onChange={(e) => setSlSchoolID(e.target.value)}
                      />
                    </>
                  )}
                  <br />
                  <select
                    name=""
                    id=""
                    onChange={(e) => setSLCommunity(e.target.value)}
                  >
                    <option value="">Select Community</option>
                    <option value="Community Heroes">Community Heroes</option>
                    <option value="MSL Philippines">MSL Philippines</option>
                  </select>
                  <input
                    type="text"
                    placeholder="What is your Answer?"
                    value={insertAnswer}
                    onChange={(e) => setInsertAnswer(e.target.value)}
                  />
                  {!submitLoader ? (
                    <button
                      className={insertAnswer && slCommunity ? "active" : ""}
                      disabled={!insertAnswer && !slCommunity}
                      onClick={handleUserRegister}
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button>Submitting</button>
                  )}
                  <p id="formResponse">{registrationResponse}</p>
                </div>
              </div>
            </div>
            <div className="btptpddTitle">
              <p>
                Disclaimer: MSL Ph User Data will be collected after submition
                of answer.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BattleTrips;
