#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { GraphqlCdkStack } from '../lib/graphql-cdk-stack';

const app = new cdk.App();
new GraphqlCdkStack(app, 'GraphqlCdkStack', {});