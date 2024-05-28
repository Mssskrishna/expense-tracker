import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon('postgresql://neondb_owner:j5RfevtkqLO1@ep-muddy-mode-a5gew9qs.us-east-2.aws.neon.tech/Expenses-Tracker?sslmode=require');
const db = drizzle(sql,{schema});
