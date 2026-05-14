import  express, { Request, Response }  from 'express'
import {Pool} from 'pg'
import dotenv from 'dotenv'
import path from "path"

dotenv.config({path: path.join(process.cwd(), ".env")})
const app = express()
const port = 5000


const pool = new Pool ({
  connectionString: `${process.env.CONNECTION_STRING}`
});




const InitDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      age INTEGER,
      phone VARCHAR(20),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos(
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      due_date DATE  
    ) `)
}

InitDb()
// middleware to parse JSON bodies
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.post("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "POST request received",
    status: "success"
  })
})

app.listen(port, async () => {
  await InitDb()
  console.log(`Example app listening on port ${port}`)
})
