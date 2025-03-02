const { useState } = require("react");

const useFetchTeams = (userData = null) => {
  const [teams, setTeams] = useState([]);

  const fetchTeams = async () => {
    try {
      const response = await fetch(
        "https://mslphdatasheet.site/mslOpenTournamentTeamList.php"
      );
      const data = await response.json();
      if (userData && userData.administrator === "SL") {
        const filteredData = data.filter(
          (team) => team.school === userData.schoolname
        );
        setTeams(filteredData);
      } else {
        setTeams(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return { teams, fetchTeams };
};

export default useFetchTeams;
