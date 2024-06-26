import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
require('dotenv').config();

import * as schema from "./schema";

const databaseurl = process.env.NEXT_PUBLIC_DATABASE_URL;
const sql = neon(databaseurl);

export const db = drizzle(sql, { schema });
