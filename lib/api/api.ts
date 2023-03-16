import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Function } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as  path from 'path';
import { AttributeType, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
// import amazon-cognito-identity-js


export class RestApiGraphql extends Construct {

  public personLambda: Function;
  public itemLambda: Function;
  public federationLambda: Function;
  private personApi: LambdaRestApi;
  private itemApi: LambdaRestApi;
  private federationApi: LambdaRestApi;
  private table: ITable;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.personLambda = this.createGraphqlLambda('person');
    this.personApi = this.createLambdaRestApi(this.personLambda, 'Person')

    this.itemLambda = this.createGraphqlLambda('item');
    this.itemApi = this.createLambdaRestApi(this.itemLambda, 'Item')

    this.federationLambda = this.createGraphqlLambda('federation');
    this.federationApi = this.createLambdaRestApi(this.federationLambda, 'Federation')

    this.createGraphqlTokenTable();
    this.createGraphqlAccountTable();
  }

  createGraphqlLambda(folder: string): Function {
    let lambda = new NodejsFunction(this, folder + 'GraphqlLambda', {
      entry: path.join(__dirname, '..', '..', folder, 'index.ts'),
      handler: 'graphqlHandler',
    });
    return lambda;

  }

  createLambdaRestApi(fn: Function, folder: string): LambdaRestApi {
    let api = new LambdaRestApi(this, folder + ' Api Graphql', {
      handler: fn,
    });
    return api
  }

  createGraphqlTokenTable(): ITable {
    this.table = new Table(this, 'PersonTable', {
      partitionKey: {
        name: 'name',
        type: AttributeType.STRING
      },
      tableName: 'PersonTable',
    });
    this.table.grantReadWriteData(this.personLambda);
    this.table.grantReadWriteData(this.itemLambda);
    return this.table;
  }


  createGraphqlAccountTable(): ITable {
    this.table = new Table(this, 'ItemTable', {
      partitionKey: {
        name: 'name',
        type: AttributeType.STRING
      },
      tableName: 'ItemTable',
    });
    this.table.grantReadWriteData(this.personLambda);
    this.table.grantReadWriteData(this.itemLambda);
    return this.table;
  }
}
