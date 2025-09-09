import express, { Request, Response, Router } from 'express';
import type { CookieOptions } from 'express'; // 1. Import the type
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../db'; 

interface JwtPayload {
  id: number;
  username: string;
  role: string;
}

const router: Router = express.Router();

router.get('/check-authorization', (req: Request, res: Response) => {
  try {  
    console.log(req.cookies["adminToken"]);
    const token = req.cookies["adminToken"];

    if (!token) {
      return res.status(401).json({ message: 'Authentication token is required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number; username: string; role: string };
    if (decoded.role != 'admin') {
      return res.status(403).json({ message: 'Forbidden Access' });
    }

    return res.status(200).json({
      message: 'Admin Authorization successful!',
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
      return res.status(401).json({ 
        error: 'Username or Password is wrong.' 
      });
    }
    const findUserQuery = 'SELECT * FROM admin WHERE username = $1';
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
    const payload: JwtPayload = { id: user.id, username: user.username, role: 'admin' };
    const secretKey = process.env.JWT_SECRET as string; 

    const token = jwt.sign(
      payload,
      secretKey,
      { expiresIn: '1h' }
    );
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('adminToken', token, {
    httpOnly: true,
    secure: isProduction, 
    sameSite: isProduction ? 'none' : 'lax', 
    path: '/',
  });

    return res.status(200).json({
      message: 'Login successful!',
      username: username
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error connecting to the database');
}}); 

router.post('/create-admin', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const insertQuery = 'INSERT INTO admin (username, email, password) VALUES ($1, $2, $3) RETURNING *';
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

    const userExistsQuery = 'SELECT * FROM admin WHERE email = $1 OR username = $2';
    const existingUser = await db.query(userExistsQuery, [email, username]);

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'Username or email already exists.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const values = [username, email, hashedPassword];

    const result = await db.query(insertQuery, values);
    const payload: JwtPayload = { id: result.id, username: username, role: 'admin' };
    const secretKey = process.env.JWT_SECRET as string; 

    const token = jwt.sign(
      payload,
      secretKey,
      { expiresIn: '1h' }
    );

    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('adminToken', token, {
    httpOnly: true,
    secure: isProduction, 
    sameSite: isProduction ? 'none' : 'lax', 
    path: '/',
  });

    return res.status(200).json({
      message: 'User Created and Login successful!',
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error connecting to the database');
  }
}); 

router.post('/logout', (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: isProduction, 
    sameSite: isProduction ? 'none' : 'lax', 
    path: '/',
  };
  res.clearCookie('adminToken', cookieOptions);

  return res.status(200).json({ message: 'Logout successful.' });
});

router.delete('/delete-user-url/:shortcode', async (req: Request, res: Response) => {
  const deleteQuery = 'DELETE FROM urls WHERE short_code=$1';
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"    
    if (!token) {
      return res.status(401).json({ message: 'Authentication token is required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number; username: string; role: string };
    if (decoded.role != 'admin') {
      return res.status(403).json({ message: 'Forbidden Access' });
    }
    
    const result = await db.query(deleteQuery, [req.params.shortcode]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'URL not found.' });
    }

    return res.status(204).json({ message: 'URL Deleted.' });

  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
  }
}); 

router.delete('/delete-user/:username', async (req: Request, res: Response) => {
  const deleteQuery = 'DELETE FROM users WHERE username=$1';

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: 'Authentication token is required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number; username: string; role: string };
    if (decoded.role != 'admin') {
      return res.status(403).json({ message: 'Forbidden Access' });
    }

    const usernameFromParams = req.params.username;
    const result = await db.query(deleteQuery, [usernameFromParams]);

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