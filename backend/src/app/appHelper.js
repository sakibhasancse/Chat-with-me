import _ from 'lodash'
import jwt from 'jsonwebtoken'
import { CustomError } from './error.js'

export const checkRequiredFields = (requiredFields = [], data = {}) => {
  const missingFields = _.difference(requiredFields, Object.keys(data))
  if (_.size(missingFields)) {
    throw new CustomError(400, `Missing ${missingFields}`)
  }
}

export const signJwtToken = (data = {}, secretKey = '', expiresIn = '12h') => {
  return new Promise((resolve, reject) => {
    const options = {
      expiresIn: expiresIn
    };
    jwt.sign(data, secretKey, options, (err, token) => {
      if (err) {
        reject({ isError: true, message: 'Invalid operation!' });
      } else {
        resolve(token);
      }
    })
  });
}

export const verifyJwtToken = (token, secretKey = '') => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, data) => {
      if (err) {
        reject({ isError: true, message: 'Invalid operation!' });
      } else {
        resolve(data);
      }
    })
  });
}

