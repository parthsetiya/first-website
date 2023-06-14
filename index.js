Papa.parse("./UpcomingMatches.csv", {
  download: true,
  header: true,
  complete: function (results) {
    const today = new Date();
    console.log(results.data);
    today.setHours(0, 0, 0, 0); // To ignore time portion for comparison
    const matches = results.data.filter((match) => {
      if (!match.DateOfMatch) {
        return false;
      }
      let dateString = match.DateOfMatch;
      let parts = dateString.split("/");
      let formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      const matchDate = new Date(formattedDate);
      return matchDate >= today;
    });
    if (matches.length > 0) {
      const nextMatch = matches[0]; // Assuming the data is sorted by date
      document.getElementById("team1-img").src = nextMatch["Team1ImgSrc"];
      document.getElementById("team2-img").src = nextMatch["Team2ImgSrc"];
      document.getElementById("team1-name").innerText = nextMatch.Team1;
      document.getElementById("team2-name").innerText = nextMatch.Team2;
      document.getElementById("match-date").innerText = nextMatch.DateOfMatch;
    }
  },
});
