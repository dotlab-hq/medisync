import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: ['.env.local', '.env'] })

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema',
  dialect: 'postgresql',
  migrations:{
    schema:"__drizzle_medisync"
  },
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
