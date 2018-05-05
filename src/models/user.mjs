import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const users = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
});

// Authenticate user
// users.statics.authenticate = function (email, password, callback) {
//     user.findOne({ email: email }).exec(callback);
// }

// Validate user session
users.statics.validate = function (email, callback) {
    user.findOne({ email: email })
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }

            return callback(null, user)
        });
}

// Hashing a password before saving it to the database
users.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

export default mongoose.model('user', users);
