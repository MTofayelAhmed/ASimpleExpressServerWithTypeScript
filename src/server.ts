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

//  Users CRUD
app.post("/users", async (req: Request, res: Response) => {
  const { name, email } = req.body

  try {
    const result = await pool.query(`INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`, [name, email])

    res.status(201).json({
      message: "User created successfully",
      success: true,
      data: result.rows[0]
    })
  } catch (error: any) {
    res.status(500).json({
      message: "Error in creating user",
      success: false,
      error: error.message
    })
  }
})
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`)
    res.status(200).json({
      message: "Users retrieved successfully",
      success: true,
      data: result.rows
    })
  } catch (error: any) {
    res.status(500).json({
      message: "Error in retrieving users",
      success: false,
      error: error.message
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
