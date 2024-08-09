const sql = require('mssql');
const connection = require('../config/database'); // Đảm bảo đường dẫn đúng
const { getAllUser,getUser } = require('../service/CRUDservice');


const getHomepage = (req, res) => {
  return res.render('vd.ejs');
}

const getABC = (req, res) => {
  res.send('Check abc');
}

const getHoc = (req, res) => {
  return res.render('sample.ejs');
}
const update = async(req, res) => {
  
    try {
      let user = await getUser(req); // Truyền req vào hàm
      if (user.length === 0) {
        return res.status(404).send('User not found');
      }
      console.log(user);
      return res.render('vd3.ejs', { user: user[0] }); // Render trang với dữ liệu người dùng
    } catch (err) {
      console.error('Error in getUserById:', err);
      res.status(500).send('Lỗi máy chủ');
    }
  };


const createuser = async (req, res) => {  
  try {
    let users = await getAllUser(); // Sử dụng await khi gọi hàm async
    console.log(users);
    return res.render('vd2.ejs', { users: users });
  } catch (err) {
    console.error('Error in createuser:', err);
    res.status(500).send('Lỗi máy chủ');
  }
};

const postcrateuser = async (req, res) => {
  let { email, name, city } = req.body;

  try {
    // Kết nối đến cơ sở dữ liệu
    await sql.connect(connection);

    // Thực hiện truy vấn INSERT
    await sql.query`INSERT INTO Users (email, name, city) VALUES (${email}, ${name}, ${city})`;
    console.log(email,name,city);

    // Gửi phản hồi thành công
    res.send('User created successfully');
  } catch (err) {
    // Xử lý lỗi
    console.error('SQL error:', err);
    res.status(500).send('Error creating user');
  } finally {
    // Đóng kết nối
    sql.close();
  }
}
const postupdateuser = async (req, res) => {
  let { email, name, city } = req.body;
  const UserId = req.params.id;
  console.log(UserId);

  try {
    // Kết nối đến cơ sở dữ liệu
    await sql.connect(connection);

    // Thực hiện truy vấn update
    await sql.query`UPDATE Users
SET email=${email},name=${name},city=${city} where ID=${UserId} `;
   
    console.log(email,name,city);

    // Gửi phản hồi thành công
    res.send('User update successfully');
  } catch (err) {
    // Xử lý lỗi
    console.error('SQL error:', err);
    res.status(500).send('Error creating user');
  } finally {
    // Đóng kết nối
    sql.close();
  }
}
const deleteuser =async (req, res) => {
  let { email, name, city } = req.body;
  const UserId = req.params.id;
  console.log(UserId);

  try {
    // Kết nối đến cơ sở dữ liệu
    await sql.connect(connection);

    // Thực hiện truy vấn update
    await sql.query`DELETE FROM Users
 where ID=${UserId} `;

   
    console.log(email,name,city);

    // Gửi phản hồi thành công
    res.send('User delete successfully');
  } catch (err) {
    // Xử lý lỗi
    console.error('SQL error:', err);
    res.status(500).send('Error creating user');
  } finally {
    // Đóng kết nối
    sql.close();
  }
}

module.exports = {
  getHomepage,
  getABC,
  getHoc,
  postcrateuser,
  createuser,update,
  postupdateuser,deleteuser

}
