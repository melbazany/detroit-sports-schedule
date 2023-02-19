'use strict';

import { getWingsSchedule, createDocHTML } from "./wingsSchedule";

const done = await getWingsSchedule();
createDocHTML(done);

fetch(`https://statsapi.web.nhl.com/api/v1/teams/17`).then((resp) => resp.json()).then(function(data) { 
    console.log(data.teams[0]);
});
