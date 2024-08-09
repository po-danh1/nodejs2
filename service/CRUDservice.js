const sql = require('mssql');
const connection = require('../config/database');

const getAllUser = async () => {
  try {
    // Kết nối tới cơ sở dữ liệu
    let pool = await sql.connect(connection);
    
    // Thực hiện truy vấn SELECT
    let result = await pool.request().query('SELECT * FROM Users');
    
    return result.recordset; // Trả về dữ liệu người dùng
  } catch (err) {
    console.error('SQL error:', err);
    throw err; // Ném lỗi để xử lý ở nơi gọi hàm
  } finally {
    // Đóng kết nối
    sql.close();
  }
};


const getUser = async (req) => {
  const UserId = req.params.id; // Lấy UserId từ tham số URL
  try {
    // Kết nối tới cơ sở dữ liệu
    let pool = await sql.connect(connection);

    // Thực hiện truy vấn SELECT
    let result = await pool.request()
      .input('UserId', sql.Int, UserId) // Tham số hóa truy vấn
      .query('SELECT * FROM Users WHERE ID = @UserId');

    return result.recordset; // Trả về dữ liệu người dùng
  } catch (err) {
    console.error('SQL error:', err);
    throw err; // Ném lỗi để xử lý ở nơi gọi hàm
  } finally {
    // Đóng kết nối
    sql.close();
  }
};
module.exports = {
  getAllUser,
  getUser
};
