import * as aci from 'amazon-cognito-identity-js';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { CognitoConstants } from '../../constants/cognito_config';
import { LogoutResponse } from './entities/logout_entities';


export function logout(username: string): Promise<LogoutResponse> {
    return new Promise((resolve, reject) => {
        const poolData: any = {
            UserPoolId: CognitoConstants.USER_POOL,
            ClientId: CognitoConstants.POOL_CLIENT_ID
        };
        const userPool: aci.CognitoUserPool = new aci.CognitoUserPool(poolData);
        const userData: any = {
            Username: username,
            Pool: userPool
        };
        const cognitoUser: aci.CognitoUser = new aci.CognitoUser(userData);
        cognitoUser.signOut(() => {
            resolve({ msg: `The user ${userData.Username} has been loged out` })
        });
    });
}