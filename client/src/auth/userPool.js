import config from '../config.js'
import {CognitoUserPool} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: config.cognitoUserPoolId,
  ClientId: config.cognitoClientId
}

const userPool = new CognitoUserPool(poolData)

export {userPool, poolData}
