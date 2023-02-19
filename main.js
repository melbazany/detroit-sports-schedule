'use strict';

import { getWingsSchedule, createDocHTML, fetchAbbrevs } from "./wingsSchedule";

const scheduleFetched = await getWingsSchedule();
const addedAbbrevs = await fetchAbbrevs(scheduleFetched);
createDocHTML(addedAbbrevs);
