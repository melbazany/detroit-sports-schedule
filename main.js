'use strict';

import { getWingsSchedule, createDocHTML, fetchAbbrevs } from "./wingsSchedule";

const init = async function() {
    const scheduleFetched = await getWingsSchedule();
    const addedAbbrevs = await fetchAbbrevs(scheduleFetched);
    createDocHTML(addedAbbrevs);
}
init();

