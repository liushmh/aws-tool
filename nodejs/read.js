const AWS = require('aws-sdk');

// Set the AWS profile
const profileName = 'orange';
const credentials = new AWS.SharedIniFileCredentials({profile: profileName});
AWS.config.credentials = credentials;

// Set the region (if not already set in your profile configuration)
AWS.config.update({region: 'us-east-1'});

// Initialize a DynamoDB client
const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = 'ERCTokenConfig'; // Replace with your actual table name
const keyId = '0xaa36a7_0x1f980f251653222751eeac88db02d70bc81df113';

const params = {
    TableName: tableName,
    Key: {
        'id': keyId
    }
};

dynamodb.get(params, (err, data) => {
    if (err) {
        console.error('Error reading item from DynamoDB:', err);
    } else {
        if (data.Item) {
            console.log('Item found:', data.Item);
        } else {
            console.log('Item not found.');
        }
    }
});
