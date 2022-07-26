
import * as aci from 'amazon-cognito-identity-js';
import { CognitoConstants } from '../../constants/cognito_config';
import { CognitoResponse, TokenResponse } from './entities/login_entities';



export function login(username: string, password: string):Promise<TokenResponse | CognitoResponse>{
    console.log("password: " + password);
    return new Promise((resolve, reject) => {
        console.log("promising:1 " + username);
        const authenticationDetails: aci.AuthenticationDetails = new aci.AuthenticationDetails(
            {
                Username: username,
                Password: password
            }
        );
        console.log("promising:2 " +  CognitoConstants.USER_POOL);
        const poolData: any = {
            UserPoolId: CognitoConstants.USER_POOL,
            ClientId: CognitoConstants.POOL_CLIENT_ID
        };
        console.log("promising:3 " + CognitoConstants.POOL_CLIENT_ID);
        const userPool: aci.CognitoUserPool = new aci.CognitoUserPool(poolData);
        const userData: any = {
            Username: username,
            Pool: userPool
        };
        
        console.log("promising:4 " + username);
        const cognitoUser: aci.CognitoUser = new aci.CognitoUser(userData);

        console.log("promising:5 " + cognitoUser.getUsername());
        
       
        return cognitoUser.authenticateUser(authenticationDetails, {
            
            onSuccess: function (result: any) {
        console.log("success:1 " + result);
                resolve(mapToTokenResponse(result));
            },

            onFailure: function (err: any) {
        console.log("failure:1 " + username);
                reject(mapToErrorResponse(err));
            }
        });
    });
}


export function mapToTokenResponse(session: any): TokenResponse {
    return {
        accessToken: session.getAccessToken().getJwtToken(),
        idToken: session.getIdToken().getJwtToken(),
        refreshToken: session.getRefreshToken().getToken()
    };
}

export function mapToErrorResponse(payload: any): CognitoResponse {
    return {
        code: payload.errorType,
        message: payload.errorMessage
    };
}