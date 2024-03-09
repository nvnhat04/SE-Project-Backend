const { connect } = require('./index');

async function testConnection() {
    try {
        const result = await connect();
        console.log('Connection result:', result);
    } catch (error) {
        console.error('Error testing connection:', error);
    }
}

testConnection();
