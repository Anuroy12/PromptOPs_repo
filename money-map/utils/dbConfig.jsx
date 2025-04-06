import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';


const sql = neon('postgresql://Expenses_owner:npg_0he1rsJixZlG@ep-shy-dawn-a5d74nws-pooler.us-east-2.aws.neon.tech/Expenses?sslmode=require');
const db = drizzle(sql,{schema});

export default db;