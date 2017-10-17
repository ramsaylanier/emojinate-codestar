import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import {find} from 'lodash';

function checkISS(iss) {
  return (
    iss === 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_puwZ9vSlK'
  );
}

function checkTokenUse(tokenUse) {
  return tokenUse === 'id';
}

export const checkAuth = token => {
  const keys = require(`../../../config/${process.env.NODE_ENV}.json`).keys;
  const decodedToken = jwt.decode(token, {complete: true});
  const {kid} = decodedToken.header;
  const {iss, token_use} = decodedToken.payload;

  if (!checkISS(iss)) {
    console.log('Token is from the wrong User Pool.');
  }

  if (!checkTokenUse(token_use)) {
    console.log('Token is not an id token');
  }

  const key = find(keys, key => {
    return key.kid === kid;
  });

  const pem = jwkToPem({
    kty: key.kty,
    n: key.n,
    e: key.e,
  });

  // prettier-ignore
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      pem,
      {
        issuer:
          'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_puwZ9vSlK',
        maxAge: 3600000,
      },
      (err, payload) => {
        if (err) {
          reject(err);
        } else {
          resolve(payload);
        }
      }
    );
  });
};
