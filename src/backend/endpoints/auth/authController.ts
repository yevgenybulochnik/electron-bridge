// Temp combine model and controller for testing purposes
import { Request, Response, NextFunction } from 'express';
import { dbConn } from '../../db/knex';
import * as bcrypt from 'bcryptjs';
import * as localAuth from '../../auth/local';

export function registerUser(req: Request, res: Response, next: NextFunction) {
  const { firstname, lastname, email, password } = req.body
  return createUser(firstname, lastname, email, password)
    .then((user) => {return localAuth.encodeToken(user[0]) })
    .then((token) => {
      res.status(200).json({
        status: 'success',
        token: token
      })
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        message: err
      })
    })
}

function getUserByEmail(email: string) {
  return dbConn('users')
    .where({email})
    .first()
}

function createUser(firstname: string, lastname: string, email: string, password: string) {
  return getUserByEmail(email)
    .then(user => {
      if (user) throw 'User email already exists'
      return bcrypt.hash(password, parseInt(process.env.WORK_FACTOR))
    })
    .then(passwordHash => {
      return dbConn('users')
        .insert({
          firstname,
          lastname,
          email,
          password: passwordHash
        })
        .returning(['id', 'email'])
    })
}
