import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Check, X } from "lucide-react";
import useTailwindLayout from "../hooks/useTailwindLayout";
import Title from "../components/Title";
import useIsMobile from "../hooks/useIsMobileHook";
import SuccessModal from "../components/SuccessModal";
import { MCC2_BG } from "../assets/index";
import MSLRegistrationModal from "../.../../../Auth Modal/main/MSLRegistrationModal";

const TournamentRegistration = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  console.log("isLoggedIn:", isLoggedIn);
  useTailwindLayout();
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    slSchool: "",
    slTeamname: "",
    slCaptain: "",
    slCaptainID: "",
    slPlayer2: "",
    slPlayer3: "",
    slPlayer4: "",
    slPlayer5: "",
    slStatus: "Pending",
  });

  const [userData, setUserData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const [registeredTeam, setRegisteredTeam] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [missingFields, setMissingFields] = useState([]);
  const [usersSchool, setUsersSchool] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [MLBBData, setMLBBData] = useState([]);
  const [registeredPlayers, setRegisteredPlayers] = useState(new Set());

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      // Get user data from localStorage
      const savedUserData = JSON.parse(localStorage.getItem("mslUserData"));
      setUserData(savedUserData);

      if (savedUserData) {
        setFormData((prev) => ({
          ...prev,
          slSchool: savedUserData.schoolname,
          slCaptain: savedUserData.username,
        }));

        // Fetch registration data
        await fetchInitialData(savedUserData.username);
      }
    };

    checkRegistrationStatus();
  }, []);

  const fetchInitialData = useCallback(async (username) => {
    try {
      console.log("Checking registration for captain:", username);

      // Fetch all required data
      const [teamsResponse, mlbbResponse, usersResponse, schoolResponse] =
        await Promise.all([
          fetch(process.env.REACT_APP_MSL_OPEN_TOURNAMENT_LIST_API),
          fetch(process.env.REACT_APP_MSL_USER_MLBB_DATA_API),
          fetch(process.env.REACT_APP_MSL_USER_LIST_DATA_API),
          fetch(process.env.REACT_APP_MSL_USER_SCHOOL_DATA_API),
        ]);

      const [registeredTeams, mlbbData, allUsers, usersSchool] =
        await Promise.all([
          teamsResponse.json(),
          mlbbResponse.json(),
          usersResponse.json(),
          schoolResponse.json(),
        ]);

      // Update basic data states
      setMLBBData(mlbbData);
      setAllUsers(allUsers);
      setUsersSchool(usersSchool);

      // Find team by captain's username
      const foundTeam = registeredTeams.find(
        (team) => team.captain?.toLowerCase() === username?.toLowerCase()
      );

      console.log("Found team:", foundTeam);

      if (foundTeam) {
        setIsAlreadyRegistered(true);
        setRegisteredTeam(foundTeam);
      } else {
        setIsAlreadyRegistered(false);
        setRegisteredTeam(null);
      }
    } catch (error) {
      console.error("Error checking registration:", error);
      setSubmitStatus("error");
    }
  }, []);

  // Add useEffect to refetch data after successful registration
  useEffect(() => {
    if (submitStatus === "success") {
      // Add a small delay to allow the backend to update
      const timer = setTimeout(() => {
        fetchInitialData();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus, fetchInitialData]);

  const getVerificationStatus = useCallback(
    (userId) => {
      const user = allUsers.find((user) => user.username === userId);
      return user ? user.state.toLowerCase() : "pending";
    },
    [allUsers]
  );

  const isTeamVerified = useCallback(
    (team) => {
      if (!team) return false;
      return [
        team.captain,
        team.player2,
        team.player3,
        team.player4,
        team.player5,
      ].every((id) => getVerificationStatus(id) === "verified");
    },
    [getVerificationStatus]
  );

  const renderVerificationIcon = useCallback(
    (userId) => {
      const status = getVerificationStatus(userId);
      return status === "verified" ? (
        <div className="bg-green-300 rounded-full p-[2px] border border-green-600">
          <Check size={14} className="text-green-600" />
        </div>
      ) : (
        <div className="bg-red-300 rounded-full p-[2px] border border-red-600">
          <X size={14} className="text-red-600" />
        </div>
      );
    },
    [getVerificationStatus]
  );

  const getProfileImage = useCallback(
    (userId) => {
      const user = allUsers.find((user) => user.username === userId);
      const defaultProfileImage =
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

      return user && user.profile
        ? `https://mslphdatasheet.site/MSLProfileImage/${user.profile}`
        : defaultProfileImage;
    },
    [allUsers]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const requiredFields = [
        "slTeamname",
        "slCaptainID",
        "slPlayer2",
        "slPlayer3",
        "slPlayer4",
        "slPlayer5",
      ];
      const missing = requiredFields.filter((field) => !formData[field]);

      if (missing.length > 0) {
        setMissingFields(missing);
        alert(`Please fill in the following fields: ${missing.join(", ")}`);
        return;
      }

      setIsSubmitting(true);

      try {
        const response = await fetch(
          process.env.REACT_APP_MSL_OPEN_TOURNAMENT_REGISTRAION_API,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const result = await response.json();
        console.log("Registration response:", result); // Debug log

        if (result.success) {
          setSubmitStatus("success");
          setShowModal(true);
          // Set a flag to indicate successful registration
          setIsAlreadyRegistered(true);
          // Fetch updated data
          await fetchInitialData(formData.slCaptain);
        } else {
          setSubmitStatus("error");
          console.error("Registration failed:", result);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, fetchInitialData]
  );

  const handlePlayerSelect = useCallback(
    (field, selectedValue) => {
      if (!selectedValue) {
        setFormData((prevData) => ({
          ...prevData,
          [field]: "",
        }));
        return;
      }

      const isDuplicate = Object.values(formData).some(
        (value, index) =>
          value === selectedValue && Object.keys(formData)[index] !== field
      );

      if (isDuplicate) {
        alert(
          "This player has already been selected. Please choose a different player."
        );
        return;
      }

      setFormData((prevData) => ({
        ...prevData,
        [field]: selectedValue,
      }));
    },
    [formData]
  );

  const SearchableDropdown = React.memo(
    ({ field, placeholder, value, onChange }) => {
      const [searchTerm, setSearchTerm] = useState("");
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);

      const filteredUsers = useMemo(() => {
        return usersSchool
          .filter((user) => {
            const userSchool = user.schoolname || "";
            const registrantSchool = formData.slSchool || "";

            return (
              userSchool.toLowerCase() === registrantSchool.toLowerCase() &&
              user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
              !registeredPlayers.has(user.username)
            );
          })
          .slice(0, 10);
      }, [usersSchool, formData.slSchool, searchTerm, registeredPlayers]);

      const handleInputChange = useCallback(
        (e) => {
          const newValue = e.target.value;
          setSearchTerm(newValue);
          setIsDropdownOpen(newValue.length > 0);

          if (newValue === "") {
            onChange(field, "");
          }
        },
        [field, onChange]
      );

      const handleSelect = useCallback(
        (selectedUsername) => {
          onChange(field, selectedUsername);
          setSearchTerm(selectedUsername);
          setIsDropdownOpen(false);
        },
        [field, onChange]
      );

      useEffect(() => {
        setSearchTerm(value || "");
      }, [value]);

      return (
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setIsDropdownOpen(searchTerm.length > 0)}
            placeholder={placeholder}
            className="w-full p-3 rounded-2xl border-[3px] border-white/75 bg-black text-white placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {isDropdownOpen && (
            <div className="absolute z-10 w-full bg-neutral-800 rounded-lg mt-1 max-h-40 overflow-y-auto">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user.username}
                    onClick={() => handleSelect(user.username)}
                    className="p-2 hover:bg-neutral-700 cursor-pointer text-white"
                  >
                    {user.username}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-400">
                  No user found, or player is already in a team.
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
  );

  const PlayerCard = React.memo(({ playerName, mlbbData }) => {
    const playerMLBBData = mlbbData.find(
      (data) => data.username === playerName
    );

    return (
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <img
            src={getProfileImage(playerName)}
            alt={playerName}
            className="w-12 h-12 rounded-full object-cover border border-gray-600"
            onError={(e) => {
              e.target.src =
                "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
            }}
          />
          <div className="absolute bottom-0 right-0">
            {renderVerificationIcon(playerName)}
          </div>
        </div>
        <div className="flex flex-col items-center w-24">
          <span className="text-white text-center text-sm truncate w-full">
            {playerName}
          </span>
          <span className="text-gray-400 text-center text-xs w-full">
            IGN: {decodeURIComponent(playerMLBBData?.mslign) || "No IGN"}
          </span>
        </div>
      </div>
    );
  });

  const MobileRegisteredView = React.memo(() => {
    const [mlbbData, setMLBBData] = useState([]);

    useEffect(() => {
      const fetchMLBBData = async () => {
        try {
          const response = await fetch(
            process.env.REACT_APP_MSL_USER_MLBB_DATA_API
          );
          const data = await response.json();
          setMLBBData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchMLBBData();
    }, []);

    return (
      <div className="flex flex-col items-center justify-center w-auto mx-4">
        <div className="bg-neutral-800 p-4 rounded-lg w-full max-w-lg">
          <div className="bg-neutral-800 p-4 rounded-lg mb-4 text-center">
            <h3 className="text-white text-base font-poppins font-semibold">
              {registeredTeam?.school}
            </h3>
            <p className="text-gray-400 text-sm mb-2 font-poppins">
              University
            </p>
            <h3 className="text-white text-base font-poppins font-semibold">
              {registeredTeam?.teamname}
            </h3>
            <p className="text-gray-400 text-sm mb-2 font-poppins">Team Name</p>
          </div>

          <div className="w-full border-b border-white/25 flex items-center justify-between mb-10">
            <div>
              <h3 className="text-gray-400 text-sm mb-1">Team Composition</h3>
            </div>
            <div className="flex space-x-2">
              <div className="flex items-center space-x-1">
                <Check
                  size={10}
                  className="text-green-600 border border-green-600 rounded-full bg-green-400"
                />
                <p className="text-[10px]">Account Verified</p>
              </div>
              <div className="flex items-center space-x-1">
                <X
                  size={10}
                  className="text-red-600 border border-red-600 rounded-full bg-red-400"
                />
                <p className="text-[9px]">Account not Verified</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="flex justify-between w-full max-w-sm px-4">
              <PlayerCard
                playerName={registeredTeam?.captain}
                mlbbData={mlbbData}
              />
              <PlayerCard
                playerName={registeredTeam?.player2}
                mlbbData={mlbbData}
              />
              <PlayerCard
                playerName={registeredTeam?.player3}
                mlbbData={mlbbData}
              />
            </div>
            <div className="flex justify-center gap-16">
              <PlayerCard
                playerName={registeredTeam?.player4}
                mlbbData={mlbbData}
              />
              <PlayerCard
                playerName={registeredTeam?.player5}
                mlbbData={mlbbData}
              />
            </div>
          </div>

          <div className="bg-neutral-800 p-4 w-full border-t border-white/25 mt-10">
            <p
              className={`text-center text-base ${
                isTeamVerified(registeredTeam)
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {isTeamVerified(registeredTeam) ? "Verified" : "Pending"}
            </p>
            <h3 className="text-gray-400 text-sm mb-2 text-center">Status</h3>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div
      className="opentourn xmin-h-screen p-4"
      style={{
        backgroundImage: `url(${MCC2_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        Height: "100vh",
        width: "100vw",
      }}
    >
      <div
        className={`mx-auto ${isMobile ? "max-w-full" : "max-w-full mx-10"}`}
      >
        <Title />
        {isLoggedIn ? null : <MSLRegistrationModal />}
        {isAlreadyRegistered ? (
          <div className="overflow-hidden text-center">
            <h2 className="text-yellow-400 text-3xl font-bold mb-6">
              YOU ALREADY REGISTERED YOUR TEAM
            </h2>
            <p className="text-gray-400 text-sm mb-2">
              If you want to change your team name or roster, please contact the
              MSL Admins. Check the status of your team below, :
            </p>

            {isMobile ? (
              <MobileRegisteredView />
            ) : (
              <table className="w-[90%] mx-auto">
                <thead>
                  <tr className="bg-black text-white text-center text-sm">
                    <th className="p-3 border-2 border-white">Team Name</th>
                    <th className="p-3 border-2 border-white">Captain</th>
                    <th className="p-3 border-2 border-white">Player 2</th>
                    <th className="p-3 border-2 border-white">Player 3</th>
                    <th className="p-3 border-2 border-white">Player 4</th>
                    <th className="p-3 border-2 border-white">Player 5</th>
                    <th className="p-3 border-2 border-white">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-neutral-900/90 text-sm">
                    <td className="p-4 text-white text-center">
                      {registeredTeam?.teamname}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2 text-white">
                        <div className="relative">
                          <img
                            src={getProfileImage(registeredTeam?.captain)}
                            alt={registeredTeam?.captain}
                            className="w-10 h-10 rounded-full object-cover border border-gray-600"
                            onError={(e) => {
                              e.target.src =
                                "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
                            }}
                          />
                          <div className="absolute bottom-0 right-0">
                            {renderVerificationIcon(registeredTeam?.captain)}
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <span>{registeredTeam?.captain}</span>
                          <span className="text-gray-400 text-xs">
                            IGN:{" "}
                            {decodeURIComponent(
                              MLBBData.find(
                                (data) =>
                                  data.username === registeredTeam?.captain
                              )?.mslign
                            )}
                          </span>
                        </div>
                      </div>
                    </td>
                    {[
                      registeredTeam?.player2,
                      registeredTeam?.player3,
                      registeredTeam?.player4,
                      registeredTeam?.player5,
                    ].map((player, idx) => (
                      <td key={idx} className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2 text-white">
                          <div className="relative">
                            <img
                              src={getProfileImage(player)}
                              alt={player}
                              className="w-10 h-10 rounded-full object-cover border border-gray-600"
                              onError={(e) => {
                                e.target.src =
                                  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
                              }}
                            />
                            <div className="absolute bottom-0 right-0">
                              {renderVerificationIcon(player)}
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <span>{player}</span>
                            <span className="text-gray-400 text-xs">
                              IGN:{" "}
                              {decodeURIComponent(
                                MLBBData.find(
                                  (data) => data.username === player
                                )?.mslign
                              )}
                            </span>
                          </div>
                        </div>
                      </td>
                    ))}
                    <td
                      className={`pr-8 text-center p-4 ${
                        isTeamVerified(registeredTeam)
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {isTeamVerified(registeredTeam) ? "Verified" : "Pending"}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            <p className="text-gray-400 text-sm mt-6">
              *Teams with unverified students on their roster will not be
              permitted to join the Open Tournament. Please ensure all members
              are verified to avoid disqualification.
            </p>
          </div>
        ) : (
          <div
            className={`bg-black/10 backdrop-blur-md overflow-hidden p-8 rounded-2xl border border-yellow-500/25 ${
              isMobile ? "mx-4 my-2" : "mx-auto mb-2 max-w-[600px]"
            }`}
          >
            <h2 className="text-white text-xl font-bold mb-6 text-center font-poppins">
              {userData?.schoolname}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              <div>
                <label className="text-white block mb-2">School Name</label>
                <input
                  type="text"
                  name="slSchool"
                  value={formData.slSchool}
                  disabled
                  className="w-full p-3 rounded-2xl border-[3px] border-white/75 bg-black text-white placeholder-gray-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-white block mb-2">Captain</label>
                <input
                  type="text"
                  name="slCaptain"
                  value={formData.slCaptain}
                  disabled
                  className="w-full p-3 rounded-2xl border-[3px] border-white/75 bg-black text-white placeholder-gray-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-white block mb-2">Team Name</label>
                <input
                  type="text"
                  name="slTeamname"
                  value={formData.slTeamname}
                  onChange={handleChange}
                  placeholder="Team Name"
                  required
                  className="w-full p-3 rounded-2xl border-[3px] border-white/75 bg-black text-white placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="text-white block mb-2">
                  Captain's Discord Tag
                </label>
                <input
                  type="text"
                  name="slCaptainID"
                  value={formData.slCaptainID}
                  onChange={handleChange}
                  required
                  placeholder="e.g. username#1234"
                  className="w-full p-3 rounded-2xl border-[3px] border-white/75 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              {["slPlayer2", "slPlayer3", "slPlayer4", "slPlayer5"].map(
                (field, index) => (
                  <div key={field}>
                    <label className="text-white block mb-2">
                      Player {index + 2}
                    </label>
                    <SearchableDropdown
                      field={field}
                      placeholder={`Search for Players in your School`}
                      value={formData[field]}
                      onChange={handlePlayerSelect}
                    />
                  </div>
                )
              )}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-14 py-2 text-white font-semibold rounded-2xl border-2 border-white/75 transition duration-300 ${
                    isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-white hover:text-black"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
              {submitStatus && (
                <div
                  className={`mt-4 p-3 rounded-lg text-center ${
                    submitStatus === "success"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {submitStatus === "success"
                    ? "Registration successful! Please refresh the page if you're not seeing your team status."
                    : "Registration failed, One or more players are already listed in another team"}
                </div>
              )}
            </form>
          </div>
        )}
      </div>

      {showModal && <SuccessModal />}
    </div>
  );
};

export default TournamentRegistration;
