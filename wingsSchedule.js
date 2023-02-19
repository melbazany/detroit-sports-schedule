
import moment from "moment";

// https://www.javascriptfullstack.com/how-to-use-async-await-in-loops

// //---------------------------------------------
// // TeamID for Wings = 17
// // GET https://statsapi.web.nhl.com/api/v1/teams
// //---------------------------------------------

const statsAPIBaseURL = `https://statsapi.web.nhl.com/api/v1/`;
let dates = [];
let dateData = [];

// The API returns a time based on GMT/UTC - 5 hours == offset
// See: https://momentjs.com/docs/
function formatDateCellData(dateStringAndData) {
  let formatted;
  const gameData = dateStringAndData.dateData;
  if (gameData.dates[0]) {
    formatted = `<div class="date_item | grid gap-24 padding-24">
      <div class="date_item__full-date | fs-200 margin-block-end-12">${moment(dateStringAndData.dateString).format("dddd, MMMM Do YYYY")}</div>
      <div class="date_item__teams | flex items-center gap-20 fw-700">
        <div class="date_item__away-team | grid text-center gap-4">
          <div class="date_item__away-team | fs-400">${gameData.dates[0].games[0].teams.away.team.name}</div>
          <div class="date_item__away-team | fs-200 clr-neutral-normal">${gameData.dates[0].games[0].teams.away.leagueRecord.wins}-${gameData.dates[0].games[0].teams.away.leagueRecord.losses}-${gameData.dates[0].games[0].teams.away.leagueRecord.ot}</div>
        </div>
        <div class="date_item__vs | clr-neutral-normal">@</div>
        <div class="date_item__home-team | grid text-center gap-4">
          <div class="date_item__home-team | fs-400">${gameData.dates[0].games[0].teams.home.team.name}</div>
          <div class="date_item__away-team | fs-200 clr-neutral-normal">${gameData.dates[0].games[0].teams.home.leagueRecord.wins}-${gameData.dates[0].games[0].teams.home.leagueRecord.losses}-${gameData.dates[0].games[0].teams.home.leagueRecord.ot}</div>
        </div>
        </div>
      <div class="date_item__detail-date-and-location | grid text-center gap-6">
        <div class="date_item__detail-date-and-location-date">${moment.utc(gameData.dates[0].games[0].gameDate).utcOffset(-5, false).format("ddd, h:mmA [ET]")}</div>
        <div class="date_item__detail-date-and-location-loc fs-200 clr-neutral-normal">${gameData.dates[0].games[0].venue.name}</div>
      </div>
    </div>
    `;
  } else {
    formatted = `<div  class="date_item | grid padding-24">${moment(dateStringAndData.dateString).format("dddd, MMMM Do YYYY")}</div>`;
  }
  return formatted;
}

function appendTableCellData(formattedData) {
  const target = document.querySelector('#weekGrid');
  target.insertAdjacentHTML('beforeend', formattedData);
}

// //---------------------------------------------
// // Returns today's date in string format
// //---------------------------------------------
// function getTodaysDate() {
//   const todaysDate = new Date().getDate();
//   const todaysMonth = new Date().getMonth();
//   const todaysYear = new Date().getFullYear();
//   return `${todaysYear}-${todaysMonth + 1}-${todaysDate}`;
// }

// //---------------------------------------------
// // Returns X days from today in string
// //---------------------------------------------
function getDatesXDaysFromToday(X) {
  const nextWeekDateObj = new Date();
  nextWeekDateObj.setDate(new Date().getDate() + X);
  const nextWeekDateDay = nextWeekDateObj.getDate();
  const nextWeekDateMonth = nextWeekDateObj.getMonth();
  const nextWeekDateYear = nextWeekDateObj.getFullYear();
  return `${nextWeekDateYear}-${nextWeekDateMonth + 1}-${nextWeekDateDay}`;
}

export async function getWingsSchedule() {
  const theDates = loopWeekOfDates();
  for (const date of theDates) {
    const returned = await fetchDateData(date.requestURL);
    dateData.push({
      'dateString': date.dateString, 
      'dateData': returned
    });
  }
  return dateData;
}


const fetchDateData = async function (url) {
  try {
    const resp = await fetch(url);
    const parsed = await resp.json();
    return parsed;
  } catch(e) {
    console.error(`An error occurred during fetch: ${e.message}`);
  }
}

//---------------------------------------------
// Generates array of date strings from today
// to a week from today
//---------------------------------------------
function loopWeekOfDates() {
  for (let i = 0; i < 7; i++) {
    dates.push({
      dateString: getDatesXDaysFromToday(i),
      requestURL: `${statsAPIBaseURL}schedule?teamId=17&endDate=${getDatesXDaysFromToday(i)}&startDate=${getDatesXDaysFromToday(i)}`
    });
  }
  return dates;
}

export function createDocHTML(retrievedData) {
  console.log(retrievedData);
  for (const dateItem of retrievedData) {
      if (dateItem.dateData.dates.length > 0) {
        const homeTeamLinkEndpt = `dateItem.dateData.dates[0].games[0].teams.home.team.link`;
        const awayTeamLinkEndpt = `dateItem.dateData.dates[0].games[0].teams.away.team.link`;
        // fetchTeamAbbrevAndLogo();
      }
    const formattedData = formatDateCellData(dateItem);
    appendTableCellData(formattedData);
  }
}
