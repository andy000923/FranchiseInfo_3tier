const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const mysql = require('mysql2');

// MySQL 연결 풀 생성
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'andy0923',
  database: 'crawl_data',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 연결 풀을 사용하여 쿼리 수행하는 함수
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

app.get('/api/products', async (req, res) => {
  try {
    const data = await query('SELECT * FROM franchise_info');
    if (data && data.length > 0) {
      res.send({ products: data });
    } else {
      res.send({ message: 'No products found' });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});
