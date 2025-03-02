import React, { useState, useEffect } from "react";
import { Search, Check, X } from "lucide-react";
import useTailwindLayout from "../hooks/useTailwindLayout";
import useFetchTeams from "../hooks/fetchTeams";
import Title from "../components/Title";
import useIsMobile from "../hooks/useIsMobileHook";
import male from "../../../assets/imgs/MSLSilhoutte/maleSilhoutte.png";
import female from "../../../assets/imgs/MSLSilhoutte/femaleSilhoutte.png";
import lgbtqa from "../../../assets/imgs/MSLSilhoutte/lgbtqaSilhoutte.png";
import { MCC2_BG } from "../assets/index";

const placeholderImages = {
  Male: male,
  Female: female,
  LGBTQA: lgbtqa,
};

const RegisteredTeams = () => {
  const isMobile = useIsMobile();
  useTailwindLayout();
  const { teams, fetchTeams } = useFetchTeams();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [userData, setUserData] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [expandedTeamId, setExpandedTeamId] = useState(null);
  const [profileImages, setProfileImages] = useState({});
  const [userBasicData, setUserBasicData] = useState([]);
  const [MLBBData, setMLBBData] = useState([]);

  useEffect(() => {
    const savedUserData = JSON.parse(localStorage.getItem("mslUserData"));
    setUserData(savedUserData);
    checkAuthorization(savedUserData);

    if (savedUserData) {
      fetchTeams(savedUserData);
      fetchAllUsers();
      fetchUserBasicData();
      fetchMLBBData();
    }
  }, []);

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

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_MSL_USER_LIST_DATA_API
      );
      const data = await response.json();
      setAllUsers(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserBasicData = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_MSL_USER_BASIC_DATA_API
      );
      const data = await response.json();
      setUserBasicData(data);
    } catch (error) {
      console.error("Error fetching user basic data:", error);
    }
  };

  const getProfileImage = (userId) => {
    const user = allUsers.find((user) => user.username === userId);

    if (user && user.profile) {
      return `https://mslphdatasheet.site/MSLProfileImage/${user.profile}`;
    }

    const userBasic = userBasicData.find((user) => user.username === userId);
    const gender = userBasic?.gender;

    return placeholderImages[gender];
  };

  useEffect(() => {
    const loadProfileImages = async () => {
      const images = {};
      for (const team of teams) {
        const players = [
          team.captain,
          team.player2,
          team.player3,
          team.player4,
          team.player5,
        ];
        for (const playerId of players) {
          if (!profileImages[playerId]) {
            images[playerId] = getProfileImage(playerId);
          }
        }
      }
      setProfileImages((prev) => ({ ...prev, ...images }));
    };

    loadProfileImages();
  }, [teams, allUsers, userBasicData]);

  const checkAuthorization = (userData) => {
    const authorizedRoles = [
      "SL",
      "Super Admin",
      "Regional Admin",
      "National Admin",
    ];
    setIsAuthorized(
      userData && authorizedRoles.includes(userData.administrator)
    );
  };

  const getVerificationStatus = (userId) => {
    const user = allUsers.find((user) => user.username === userId);
    return user ? user.state : "Pending";
  };

  const isTeamVerified = (team) => {
    return [
      team.captain,
      team.player2,
      team.player3,
      team.player4,
      team.player5,
    ].every((id) => getVerificationStatus(id) === "Verified");
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-red-900/20 border border-red-900 rounded-lg p-4 text-red-500">
          Not authorized to view this page.
        </div>
      </div>
    );
  }

  const sortedAndFilteredTeams = teams
    .filter((team) => {
      if (!userData) return false;
      const searchLower = searchTerm.toLowerCase();
      const matchesSchool = team.school === userData.schoolname;
      const matchesSearch = team.teamname.toLowerCase().includes(searchLower);
      return matchesSchool && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "teams") {
        return sortDirection === "asc"
          ? a.teamname.localeCompare(b.teamname)
          : b.teamname.localeCompare(a.teamname);
      } else if (sortBy === "status") {
        const statusA = isTeamVerified(a) ? "Confirmed" : "Pending";
        const statusB = isTeamVerified(b) ? "Confirmed" : "Pending";
        return sortDirection === "asc"
          ? statusA.localeCompare(statusB)
          : statusB.localeCompare(statusA);
      }
      return 0;
    });

  const toggleTeamDetails = (teamId) => {
    setExpandedTeamId(expandedTeamId === teamId ? null : teamId);
  };

  const handleSortChange = (value) => {
    if (value === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(value);
      setSortDirection("asc");
    }
  };

  const renderVerificationIcon = (userId) => {
    const status = getVerificationStatus(userId);
    return status === "Verified" ? (
      <div className="bg-green-300 rounded-full border border-green-600">
        <Check size={14} className="text-green-600" />
      </div>
    ) : (
      <div className="bg-red-300 rounded-full p-[2px] border border-red-600">
        <X size={14} className="text-red-600" />
      </div>
    );
  };

  const tableRowBackground = (index) => {
    return index % 2 === 0 ? "bg-neutral-900/90" : "bg-neutral-800/90";
  };

  return (
    <div className="opentourn">
      <div
        className={`min-h-screen p-4`}
        style={{
          backgroundImage: `url(${MCC2_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          Height: "100vh",
          width: "100vw",
        }}
      >
        <div className={`max-w-full ${isMobile ? "mx-auto" : "mx-10"}`}>
          <Title />

          <p className="text-yellow-400 font-bold text-center mb-6 text-base">
            THERE ARE {sortedAndFilteredTeams.length} REGISTERED TEAMS IN YOUR
            SCHOOL!
          </p>

          {/* Show "No Teams Registered" Note if No Teams */}
          {sortedAndFilteredTeams.length === 0 ? (
            <div className="text-center text-gray-400 py-6">
              No teams are currently registered.
            </div>
          ) : (
            <>
              <div className={`flex items-center space-x-4 justify-end mb-2`}>
                <div className="flex items-center space-x-1">
                  <Check
                    size={12}
                    className="text-green-600 border border-green-600 rounded-full bg-green-400"
                  />
                  <p className={`${isMobile ? "text-sm" : "test-sm"}`}>
                    Account Verified
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <X
                    size={12}
                    className="text-red-600 border border-red-600 rounded-full bg-red-400"
                  />
                  <p className={`${isMobile ? "text-sm" : "test-sm"}`}>
                    Account not Verified
                  </p>
                </div>
              </div>

              <div className={`flex gap-4 mb-4`}>
                <div className="flex-1 relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search by Team Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-full bg-white text-sm text-black"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-5 py-2 rounded-full bg-white text-black text-sm"
                >
                  <option value="">Sort by</option>
                  <option value="teams">
                    Teams{" "}
                    {sortBy === "teams"
                      ? sortDirection === "asc"
                        ? "↑"
                        : "↓"
                      : ""}
                  </option>
                  <option value="status">
                    Status{" "}
                    {sortBy === "status"
                      ? sortDirection === "asc"
                        ? "↑"
                        : "↓"
                      : ""}
                  </option>
                </select>
              </div>

              <div className={`bg-gray-900 overflow-hidden`}>
                {isMobile ? (
                  <div className="divide-y divide-gray-700">
                    {sortedAndFilteredTeams.map((team, index) => (
                      <div
                        key={team.id}
                        className={`p-4 ${tableRowBackground(index)}`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-white text-sm font-medium">
                              {team.school}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {team.teamname}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm ${
                                isTeamVerified(team)
                                  ? "text-green-400"
                                  : "text-yellow-400"
                              }`}
                            >
                              {isTeamVerified(team) ? "Confirmed" : "Pending"}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleTeamDetails(team.id)}
                          className="w-full mt-2 p-2 bg-gray-700 text-white rounded-lg flex items-center justify-center gap-2"
                        >
                          <span className="text-sm">
                            {expandedTeamId === team.id
                              ? "Hide Details"
                              : "View Details"}
                          </span>
                        </button>

                        {expandedTeamId === team.id && (
                          <div className="mt-4 space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-400">Captain:</span>
                              <div className="flex items-center gap-2">
                                <div className="flex flex-col justify-start items-end">
                                  <span className="text-white">
                                    {team.captain}
                                  </span>
                                  <span className="text-gray-400 text-xs">
                                    IGN:{" "}
                                    {decodeURIComponent(
                                      MLBBData.find(
                                        (data) =>
                                          data.username === team?.captain
                                      )?.mslign
                                    )}
                                  </span>
                                </div>
                                {renderVerificationIcon(team.captain)}
                              </div>
                            </div>
                            {[
                              { label: "Player 2", id: team.player2 },
                              { label: "Player 3", id: team.player3 },
                              { label: "Player 4", id: team.player4 },
                              { label: "Player 5", id: team.player5 },
                            ].map((player, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between text-sm"
                              >
                                <span className="text-gray-400">
                                  {player.label}:
                                </span>
                                <div className="flex items-center gap-2">
                                  <div className="flex flex-col items-end">
                                    <span className="text-white">
                                      {player.id}
                                    </span>
                                    <span className="text-gray-400 text-xs text-left">
                                      IGN:{" "}
                                      {decodeURIComponent(
                                        MLBBData.find(
                                          (data) => data.username === player.id
                                        )?.mslign
                                      )}
                                    </span>
                                  </div>
                                  {renderVerificationIcon(player.id)}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full table-fixed">
                      <thead>
                        <tr className="bg-black text-white text-center text-sm">
                          <th className="p-2 font-medium border-2 border-white w-1/8">
                            School
                          </th>
                          <th className="p-2 font-medium border-2 border-white w-1/8">
                            Team Name
                          </th>
                          <th className="p-2 font-medium border-2 border-white w-1/8">
                            Captain
                          </th>
                          <th className="p-2 font-medium border-2 border-white w-1/8">
                            Player 2
                          </th>
                          <th className="p-2 font-medium border-2 border-white w-1/8">
                            Player 3
                          </th>
                          <th className="p-2 font-medium border-2 border-white w-1/8">
                            Player 4
                          </th>
                          <th className="p-2 font-medium border-2 border-white w-1/8">
                            Player 5
                          </th>
                          <th className="p-2 font-medium border-2 border-white w-1/8">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedAndFilteredTeams.map((team, index) => (
                          <tr
                            key={team.id}
                            className={`${tableRowBackground(index)} text-sm`}
                          >
                            <td className="p-2 text-white">{team.school}</td>
                            <td className="p-2 text-white">{team.teamname}</td>
                            <td className="p-2">
                              <div className="flex items-center gap-2 text-white">
                                <div className="relative">
                                  <img
                                    src={
                                      profileImages[team.captain] ||
                                      placeholderImages.Other
                                    }
                                    alt={team.captain}
                                    className="w-8 h-8 rounded-full object-cover border border-gray-600"
                                    onError={(e) => {
                                      e.target.src = placeholderImages.Other;
                                    }}
                                  />
                                  <div className="absolute bottom-0 right-0">
                                    {renderVerificationIcon(team.captain)}
                                  </div>
                                </div>
                                <div className="flex flex-col">
                                  <span className="truncate">
                                    {team.captain}
                                  </span>
                                  <span className="text-gray-400 text-xs text-left truncate">
                                    IGN:{" "}
                                    {decodeURIComponent(
                                      MLBBData.find(
                                        (data) => data.username === team.captain
                                      )?.mslign
                                    )}
                                  </span>
                                </div>
                              </div>
                            </td>
                            {[
                              team.player2,
                              team.player3,
                              team.player4,
                              team.player5,
                            ].map((player, idx) => (
                              <td key={idx} className="p-2">
                                <div className="flex items-center gap-2 text-white">
                                  <div className="relative">
                                    <img
                                      src={
                                        profileImages[player] ||
                                        placeholderImages.Other
                                      }
                                      alt={player}
                                      className="w-8 h-8 rounded-full object-cover border border-gray-600"
                                      onError={(e) => {
                                        e.target.src = placeholderImages.Other;
                                      }}
                                    />
                                    <div className="absolute bottom-0 right-0">
                                      {renderVerificationIcon(player)}
                                    </div>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="truncate">{player}</span>
                                    <span className="text-gray-400 text-xs text-left truncate">
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
                              className={`p-2 text-center ${
                                isTeamVerified(team)
                                  ? "text-green-500"
                                  : "text-yellow-400"
                              }`}
                            >
                              {isTeamVerified(team) ? "Confirmed" : "Pending"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisteredTeams;
