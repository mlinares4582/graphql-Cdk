
import * as aci from 'amazon-cognito-identity-js';
import { CognitoConstants } from '../../constants/cognito_config';
import { CognitoResponse, TokenResponse } from './entities/login_entities';



export function login(username: string, password: string):Promise<TokenResponse | CognitoResponse>{
    return new Promise((resolve, reject) => {
        
        const authenticationDetails: aci.AuthenticationDetails = new aci.AuthenticationDetails(
            {
                Username: username,
                Password: password
            }
        );
        
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

       
        return cognitoUser.authenticateUser(authenticationDetails, {
            
            onSuccess: function (result: any) {
                resolve(mapToTokenResponse(result));
            },

            onFailure: function (err: any) {
                reject(mapToErrorResponse(err));
            }
        });
    });
}


export function mapToTokenResponse(session: any): TokenResponse {
    console.log("mapToTokenResponse: " + JSON.stringify(session));
    console.log("getToken: " + JSON.stringify(session.getIdToken()['payload']['cognito:groups']));
    console.log("getAccessToken: " + JSON.stringify(session.getAccessToken()));
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