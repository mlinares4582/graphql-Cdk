import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RestApiGraphql } from './api/api';

export class GraphqlCdkStack extends Stack {

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const graphql = new RestApiGraphql(this, 'Graphql_Lambda_Api')
  }

}
