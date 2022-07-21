import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Function } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as  path from 'path';
import { AttributeType, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';

export class RestApiGraphql extends Construct {
   
    public lambda: Function;
    private api: LambdaRestApi;
    private table: ITable;
    
    constructor(scope: Construct, id: string) {
      super(scope, id);
  
      this.lambda = this.createGraphqlLambda();
      this.createLambdaRestApi(this.lambda)
      this.createGraphqlTable();
  
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

  createGraphqlTable():ITable{
    this.table = new Table(this, 'AthMovilTable', {
      partitionKey: {
        name: 'user_Id',
        type: AttributeType.STRING
      },
      tableName: 'AthMovilTable',
    });
    return this.table;
  }

}
