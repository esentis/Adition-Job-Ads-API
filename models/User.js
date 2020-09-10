var mongoose = require('mongoose');
var validate = require('validator');

mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
    username: { type: String, minlength: [5, 'Minimum characters required 5'], required: [true, 'Username is required'], unique: true },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validate.isEmail, 'Invalid email'],
    },
    password: {
        type: String,
        minlength: [7, 'Minimum length for password is 7 characters.'],
        required: [true, 'Password is required'],
    },
});

userSchema.methods.toDto = function () {
    return {
        id: this.id,
        email: this.email,
    }
}
const User = mongoose.model('User', userSchema);

module.exports = User;