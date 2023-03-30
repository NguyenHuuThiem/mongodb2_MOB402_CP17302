const express = require('express')
const expressHbs = require('express-handlebars');
const port = 3000
const multer = require('multer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.engine('.handlebars', expressHbs.engine());
app.set('view engine', '.handlebars');

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://huuthiem:Anhthiem123@cluster0.vppscm2.mongodb.net/Cp17302?retryWrites=true&w=majority')
  .then(() => console.log('Kết nối thành công')) // then catch dùng để xử lý kết quả kết nối có thành công hay không
  .catch((err) => console.log(err));

const SinhVienModel = require('./SinhVienModel');



app.get('/', async (req, res) => {
  try {
    let users = await SinhVienModel.find({}); // truy vấn bản ghi trong cơ sở dữ liệu
    users = users.map((user) => user.toObject());
    res.render('list', { users });
  } catch (err) {
    console.log(err);
    res.status(500).send('Lỗi');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});