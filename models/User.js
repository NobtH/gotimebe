const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Thêm thư viện bcryptjs để mã hóa mật khẩu

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    minlength: [3, 'Name must be at least 3 characters long.'],
    maxlength: [50, 'Name cannot exceed 50 characters.']
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Email is not valid.']
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: [6, 'Password must be at least 6 characters long.']
  },
  phone: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`
    }
  },
  address: {
    type: String,
    maxlength: [200, 'Address cannot exceed 200 characters.']
  },
  role: {
    type: String,
    enum: ['user', 'maid', 'admin'],
    default: 'user'
  }
}, { timestamps: true });  // Tự động tạo createdAt và updatedAt

// Hàm đăng ký người dùng mới
// userSchema.statics.register = async function (username, email, password) {
//   // Mã hóa mật khẩu trước khi lưu vào database
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);
  
//   const user = new this({ username, email, password: hashedPassword });
//   await user.save();
//   return user;
// };

// Hàm xác thực người dùng khi đăng nhập
// userSchema.statics.authenticate = async function (email, password) {
//   const user = await this.findOne({ email });
//   if (!user) throw new Error('Invalid email or password');
  
//   // So sánh mật khẩu đã mã hóa trong database với mật khẩu người dùng nhập vào
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) throw new Error('Invalid email or password');
  
//   return user;
// };

const User = mongoose.model('User', userSchema);

module.exports = User;
