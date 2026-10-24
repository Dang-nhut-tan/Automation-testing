import dotenv from 'dotenv';
dotenv.config();

export const loginTestCases = [
    {
        testName: 'Đăng nhập thành công với tài khoản hợp lệ',
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
        isSuccess: true
    },
    {
        testName: 'Đăng nhập thất bại - để trống Email',
        email: '',
        password: process.env.PASSWORD,
        isSuccess: false,
        expectedEmailError: 'Email là bắt buộc!',
        expectedPasswordError: null
    },
    {
        testName: 'Đăng nhập thất bại - Email là khoảng trắng',
        email: ' ',
        password: process.env.PASSWORD,
        isSuccess: false,
        expectedEmailError: 'Email là bắt buộc!',
        expectedPasswordError: null
    },
    {
        testName: 'Đăng nhập thất bại - để trống Mật khẩu',
        email: process.env.EMAIL,
        password: '',
        isSuccess: false,
        expectedEmailError: null,
        expectedPasswordError: 'Mật Khẩu là bắt buộc!'
    },
    {
        testName: 'Đăng nhập thất bại - để trống cả Email và Mật khẩu',
        email: '',
        password: '',
        isSuccess: false,
        expectedEmailError: 'Email là bắt buộc!',
        expectedPasswordError: 'Mật Khẩu là bắt buộc!'
    }
];

