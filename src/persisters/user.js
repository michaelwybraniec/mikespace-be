var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcrypt'), SALT_WORK_FACTOR = 10;

var userModel = function () {

    const userSchema = new mongoose.Schema(
        {
            // TODO

            email: {
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String,
                required: true
            },
            first_name: {
                type: String,
                required: false
            },
            last_name: {
                type: String,
                required: false
            },
        },
        {
            timestamps: true
        }
    );

    userSchema.pre('save', function (next) {
        var user = this;

        // Only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) return next();

        // Generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) return next(err);

            // Hash the password using our new salt
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);

                // Override the cleartext password with the hashed one
                user.password = hash;
                next();
            });
        });
    });

    userSchema.methods.comparePassword = function (candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    };

    userSchema.plugin(uniqueValidator);

    return mongoose.model('User', userSchema);
};

module.exports = new userModel();