import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Function } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as  path from 'path';

export class RestApiGraphql extends Construct {
   
    public lambda: Function;
    private api: LambdaRestApi;
    
    constructor(scope: Construct, id: string) {
      super(scope, id);
  
      this.lambda = this.createGraphqlLambda();
      this.createLambdaRestApi(this.lambda)
  
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

}