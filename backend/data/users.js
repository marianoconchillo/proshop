import bcrypt from 'bcryptjs';

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
        isFacebookLogin: false,
    },
    {
        name: "John Doe",
        email: "john@example.com",
        password: bcrypt.hashSync('123456', 10),
        isFacebookLogin: false,
    },
    {
        name: "Jane Doe",
        email: "jane@example.com",
        password: bcrypt.hashSync('123456', 10),
        isFacebookLogin: false,
    },
];

export default users;