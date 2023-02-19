'use strict';

import { getWingsSchedule, createDocHTML } from "./wingsSchedule";

const done = await getWingsSchedule();
createDocHTML(done);
