const {
  DynamoDBClient,
  GetItemCommand,
  UpdateItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

class DdbService {
  constructor() {
    // Create an Amazon DynamoDB service client object.
    this.ddbClient = new DynamoDBClient({ region: "ap-southeast-1" });
  }

  getKey = async (key) => {
    let value = null;
    const params = {
      TableName: process.env.DDB_TABLE_NAME,
      Key: {
        username: { S: key },
      },
      ProjectionExpression: "val",
    };

    try {
      const { Item } = await this.ddbClient.send(new GetItemCommand(params));
      value = unmarshall(Item);
      value = value.val;
    } catch (err) {
      console.log("Error", err);
    }

    return value;
  };

  updateVal = async (key) => {
    let newValue;
    const params = {
      TableName: process.env.DDB_TABLE_NAME,
      Key: {
        username: { S: key },
      },
      UpdateExpression: "SET val = if_not_exists(val, :initial) + :num",
      ExpressionAttributeValues: {
        ":num": marshall(1),
        ":initial": marshall(0),
      },
      ReturnValues: "UPDATED_NEW",
    };

    try {
      const { Attributes } = await this.ddbClient.send(
        new UpdateItemCommand(params)
      );
      newValue = unmarshall(Attributes);
      newValue = parseInt(newValue.val);
    } catch (err) {
      console.log("Error", err);
    }

    return newValue;
  };
}

module.exports = { DdbService };
