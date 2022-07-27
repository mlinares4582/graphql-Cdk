import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Function } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as  path from 'path';
import { AttributeType, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import { AccountRecovery, UserPool, UserPoolClient, VerificationEmailStyle, } from 'aws-cdk-lib/aws-cognito';
import { CfnOutput } from 'aws-cdk-lib';
// import amazon-cognito-identity-js


export class RestApiGraphql extends Construct {

    public readonly userPoolId: CfnOutput;
    public readonly userPoolClientId: CfnOutput;
    // public readonly identityPoolId: CfnOutput ;
    public lambda: Function;
    private api: LambdaRestApi;
    private table: ITable;
    private userPool: UserPool;
    private userPoolClient: UserPoolClient;
    
    constructor(scope: Construct, id: string) {
      super(scope, id);
  
      this.lambda = this.createGraphqlLambda();
      this.createLambdaRestApi(this.lambda)
      this.createGraphqlTokenTable();
      this.createGraphqlAccountTable();
      this.createCognitoUserPool();
      this.createCognitoUserPoolClient();
  

      this.userPoolId = new CfnOutput(this, 'userPoolId', {
        value: this.userPool.userPoolId,
      });

      this.userPoolClientId = new CfnOutput(this, 'userPoolClientId', {
        value: this.userPoolClient.userPoolClientId,
      });
    }
  
  createLambdaRestApi(fn:Function):LambdaRestApi{

    this.api =  new LambdaRestApi(this,'Lambda Api Graphql',{
      handler:fn,         
    });
    return this.api
  }

  createGraphqlLambda():Function{
    this.lambda = new NodejsFunction(this, 'GraphqlLambda', {
    entry: path.join(__dirname,'..','..','lambda', 'index.ts'),
    handler: 'graphqlHandler',
    }); 
    return this.lambda;
    
    }

  createGraphqlTokenTable():ITable{
    this.table = new Table(this, 'AthMovilTable', {
      partitionKey: {
        name: 'user_Id',
        type: AttributeType.STRING
      },
      tableName: 'AthMovilTable',
    });
    this.table.grantReadWriteData(this.lambda);
    return this.table;
  }

  
  createGraphqlAccountTable():ITable{
    this.table = new Table(this, 'AthMovil_TransactionTable', {
      partitionKey: {
        name: 'user_id',
        type: AttributeType.STRING
      },
      sortKey: {
        name: 'timeCreated',
        type: AttributeType.STRING
      },
      tableName: 'AthMovil_TransactionTable',
    });
    this.table.grantReadWriteData(this.lambda);
    return this.table;
  }

  createCognitoUserPool():void{
    this.userPool = new UserPool(this, 'AthMovilUserPool', {
      selfSignUpEnabled: true,
      signInAliases: { username: true, email: true },
      autoVerify: { email: true, phone: true },
      userPoolName: 'AthMovilUserPool',
      userVerification: {
        emailSubject: 'Verify your email for our awesome app!',
        emailBody: 'Thanks for signing up to our awesome app! Your verification code is {####}',
        emailStyle: VerificationEmailStyle.CODE,
        smsMessage: 'Thanks for signing up to our awesome app! Your verification code is {####}',
      },
      accountRecovery: AccountRecovery.EMAIL_ONLY,
    });
  }

  createCognitoUserPoolClient():UserPoolClient{
    this.userPoolClient = new UserPoolClient(this, 'AthMovilUserPoolClient', {
      userPool: this.userPool,
      userPoolClientName: 'AthMovilUserPoolClient',
      generateSecret: false,
    });
    return this.userPoolClient;
  }

  // createCognitoIdentityPool():void{
  //   this.identityPool = new CognitoIdentityPool(this, 'AthMovilIdentityPool', {
  //     identityPoolName: 'AthMovilIdentityPool',
  //     allowUnauthenticatedIdentities: true,
  //     cognitoIdentityProviders: [
  //       {
  //         clientId: this.userPoolClient.userPoolClientId,
  //         providerName: 'cognito-idp.us-east-1.amazonaws.com/us-east-1_7Z6ecO3x4',
  //       },
  //     ],
  // });

  // }
 
  
 
}
