export function fetchLionsTeamSchedule() {
    fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/8/schedule').then((resp) => {
      return resp.json()
    }).then((data) => {
      console.log(data);
      document.querySelector('body').innerHTML = `
      <div>${data}</div>
      `;
    }).catch((err) => {
      console.error(err.message);
    });
  }