const MongoClient = require('mongodb').MongoClient;

// Thay thế với thông tin MongoDB server của bạn
const url = 'mongodb+srv://lam3082004:lam3082004@cms-database.omtcheu.mongodb.net/cms_db?retryWrites=true&w=majority&appName=CMS-database&tls=true';

async function testConnection() {
  try {
    console.log('Đang kết nối tới MongoDB...');
    const client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });

    await client.connect();
    console.log('✅ Kết nối MongoDB thành công!');

    // Test database
    const db = client.db('CMS-database');
    const collections = await db.listCollections().toArray();
    console.log('📋 Collections trong database:', collections.map(c => c.name));

    await client.close();
    console.log('🔐 Đã đóng kết nối');
  } catch (error) {
    console.error('❌ Lỗi kết nối MongoDB:', error.message);
  }
}

testConnection();
