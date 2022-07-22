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
      this.createGraphqlTokenTable();
      this.createGraphqlAccountTable();
  
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

}
