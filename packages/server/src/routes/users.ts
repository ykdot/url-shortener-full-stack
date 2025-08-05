import express, { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../db'; 

interface JwtPayload {
  id: number;
  username: string;
}

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('This is the users route');
});

router.get('/get-user-info', async (req: Request, res: Response) => {
  const getUserInfoQuery = 'SELECT * FROM users WHERE id=$1';

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: 'Authentication token is required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number; username: string };

    const result = await db.query(getUserInfoQuery, [decoded.id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({
      message: 'Login successful!',
      username: result.rows[0].username
    });
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
  }
});

router.get('/get-user-urls', async (req: Request, res: Response) => {
  const getUserUrlsQuery = 'SELECT * FROM urls WHERE user_id=$1';

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: 'Authentication token is required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number; username: string };

    const result = await db.query(getUserUrlsQuery, [decoded.id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({
      message: 'Login successful!',
      urls: result.rows
    });
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
  }
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
    const payload: JwtPayload = { id: user.id, username: user.username };
    const secretKey = process.env.JWT_SECRET as string; 

    const token = jwt.sign(
      payload,
      secretKey,
      { expiresIn: '1h' }
    );

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: 'Login successful!',
    });
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
    const payload: JwtPayload = { id: result.id, username: username };
    const secretKey = process.env.JWT_SECRET as string; 

    const token = jwt.sign(
      payload,
      secretKey,
      { expiresIn: '1h' }
    );

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: 'Login successful!',
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error connecting to the database');
  }
}); 

router.delete('/delete-user/:id', async (req: Request, res: Response) => {
  const deleteQuery = 'DELETE FROM users WHERE id=$1 AND username=$2';

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: 'Authentication token is required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number; username: string };

    const idFromParams = parseInt(req.params.id, 10);
    if (decoded.id !== idFromParams) {
      return res.status(403).json({ message: 'Forbidden: You can only delete your own account.' });
    }

    const result = await db.query(deleteQuery, [decoded.id, decoded.username]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.sendStatus(204);

  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
  }
}); 


export default router;