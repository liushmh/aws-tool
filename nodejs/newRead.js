// Import required AWS SDK clients and commands for Node.js
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");

// Set the AWS profile (optional, only if not using default profile)
const { fromIni } = require("@aws-sdk/credential-provider-ini");
const credentials = fromIni({ profile: 'orange' });

// Initialize the DynamoDBClient
const ddbClient = new DynamoDBClient({
  region: "us-east-1",
  credentials, // Uncomment if using a specific profile
});

// Create DynamoDBDocumentClient from DynamoDBClient
const docClient = DynamoDBDocumentClient.from(ddbClient);

// Specify the table name and the key of the item you want to get
const tableName = 'ERCTokenConfig';
const keyId = '0xaa36a7_0x1f980f251653222751eeac88db02d70bc81df113';

async function getItem() {
  const params = {
    TableName: tableName,
    Key: {
      "id": keyId,
    },
  };

  try {
    const data = await docClient.send(new GetCommand(params));
    if (data.Item) {
      console.log('Item found:', data.Item?.symbol.slice(-4).toLowerCase());
    } else {
      console.log('Item not found.');
    }
  } catch (err) {
    console.error('Error reading item from DynamoDB:', err);
  }
}

getItem();
