// import "dotenv/config";

// /** @type { import("drizzle-kit").Config } */
// export default {
//   schema: "./utils/schema.jsx",
//   out: "./drizzle",
//   driver:"pg",
//   dialect:"postgresql",
  
//   dbCredentials: {
//    connectionString:process.env.NEXT_PUBLIC_DATABASE_URL,
//   },
  
// };


import {defineConfig} from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  schema:"./utils/schema.jsx",
  out:"./drizzle",
  
  dialect:"postgresql",
  dbCredentials:{
    url:'postgresql://Expenses_owner:npg_0he1rsJixZlG@ep-shy-dawn-a5d74nws-pooler.us-east-2.aws.neon.tech/Expenses?sslmode=require',
  },
});
