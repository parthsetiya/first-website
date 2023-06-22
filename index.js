Papa.parse("./UpcomingMatches.csv", {
  download: true,
  header: true,
  complete: function (results) {
    const today = new Date();
    console.log(results.data);
    today.setHours(0, 0, 0, 0); 
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
      const nextMatch = matches[0];
      document.getElementById("team1-img").src = nextMatch["Team1ImgSrc"];
      document.getElementById("team2-img").src = nextMatch["Team2ImgSrc"];
      document.getElementById("team1-name").innerText = nextMatch.Team1;
      document.getElementById("team2-name").innerText = nextMatch.Team2;
      document.getElementById("match-date").innerText = nextMatch.DateOfMatch;
    } else {
      document.getElementById("team1-img").style.display = "none";
      document.getElementById("team2-img").style.display = "none";
      document.getElementById("team1-name").style.display = "none";
      document.getElementById("team2-name").style.display = "none";
      document.getElementById("vs-text").style.display = "none";
      document.getElementById("match-date").innerText = "No Upcoming Matches";
      document.getElementById("match-date").style.fontSize = "60px";
      document.getElementById("fixtures").style.display = "flex";
    }
  },
});
