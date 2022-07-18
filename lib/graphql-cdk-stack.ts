import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { Code, Runtime, Function} from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as  path from 'path';


export class GraphqlCdkStack extends Stack {

  private lambda: Function;
  private api: LambdaRestApi;


  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

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
  entry: path.join(__dirname,'..','lambda', 'index.ts'),
  handler: 'graphqlHandler',
  }); 
  return this.lambda;
  }

}



