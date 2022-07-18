import { DocumentClient } from "aws-sdk/clients/dynamodb";
const AWS = require("aws-sdk")
import { ApiConstants } from "../lambda/constants/api-constans";
require("dotenv").config();
const dynamoDB = new AWS.DynamoDB.DocumentClient()


export class DynamoDbClient {
    private documentClient!: DocumentClient;
  
    public getClient(): DocumentClient {
      if (!this.documentClient) {
        this.documentClient = new dynamoDB({region: ApiConstants.DEFAULT_REGION});
      }
  
      return this.documentClient;
    }
  }