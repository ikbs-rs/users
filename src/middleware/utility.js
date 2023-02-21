import { Snowflake as snowflake } from 'node-snowflake'

import { hostname } from 'os'
import { createHash } from "crypto"
import dotenv from 'dotenv'

dotenv.config()

const virtualHost = hostname()
const processId = process.pid.toString()
const timestamp = Date.now().toString()
const data = virtualHost + processId + timestamp
const dataCentar = process.env.DATA_CENTAR

const workerId = createHash("sha256").update(data).digest("hex")

snowflake.init({worker_id : workerId, data_center_id : dataCentar, sequence : processId})

const uniqueId = snowflake.nextId();

export  {uniqueId, virtualHost, processId}