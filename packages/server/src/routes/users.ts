import express, { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import db from '../db'; // Import the database module

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('This is the users route');
});

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    if (username.trim().length < 3) {
      return res.status(400).json({ 
        error: 'Username or Password is wrong.' 
      });
    }

    if (password.trim().length < 3) {
      return res.status(400).json({ 
        error: 'Username or Password is wrong.' 
      });
    }
    const findUserQuery = 'SELECT * FROM users WHERE username = $1';
    const userResult = await db.query(findUserQuery, [username]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Username or Password is wrong.' });
    }

    const user = userResult.rows[0];
    const storedHashedPassword = user.password;

    const isMatch = await bcrypt.compare(password, storedHashedPassword);

    if (!isMatch) {
      return res.status(401).json({ error: 'Username or Password is wrong.' });
    }
    console.log("it works");
    res.status(201).json({username, password});
  } catch (err) {
    console.error(err);
    res.status(500).send('Error connecting to the database');
}}); 

router.post('/create-user', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const insertQuery = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
  try {
    if (username.trim().length < 3) {
      return res.status(400).json({ 
        error: 'Username or Password is wrong.' 
      });
    }

    if (password.trim().length < 3) {
      return res.status(400).json({ 
        error: 'Username or Password is wrong.' 
      });
    }

    const userExistsQuery = 'SELECT * FROM users WHERE email = $1 OR username = $2';
    const existingUser = await db.query(userExistsQuery, [email, username]);

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'Username or email already exists.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const values = [username, email, hashedPassword];

    const result = await db.query(insertQuery, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error connecting to the database');
  }
}); 


export default router;