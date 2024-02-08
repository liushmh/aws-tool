import boto3

profile_name = 'orange'
session = boto3.Session(profile_name=profile_name)
dynamodb = session.resource('dynamodb')

# Specify the table name
table_name = 'ERCTokenConfig'  # Make sure to replace this with your actual table name if different

# Assuming 'keyId' is the primary key value you want to read from the table
keyId = '0xaa36a7_0x1f980f251653222751eeac88db02d70bc81df113'

# Reference the DynamoDB table
table = dynamodb.Table(table_name)

# Define the parameters for the read operation
read_config_params = {
    'TableName': table_name,
    'Key': {
        'id': keyId
    }
}

# Perform the read operation and get the item
try:
    response = table.get_item(
        Key={
            'id': keyId
        }
    )
    item = response.get('Item', None)
    if item:
        print(f"Item found: {item}")
    else:
        print("Item not found.")
except Exception as e:
    print(f"Error reading item from DynamoDB: {str(e)}")
