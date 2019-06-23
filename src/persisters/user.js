var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcrypt'), SALT_WORK_FACTOR = 10;

var userModel = function () {

    const userSchema = new mongoose.Schema(
        {
            email: { type: String, required: true, unique: true },
            gender: { type: { enum: ["man", "woman"] }, required: true },
            account_type: { type: { enum: ["mike", "guest"] }, required: true },

            password: { type: String, required: true },
            first_name: { type: String, required: false },
            last_name: { type: String, required: false },

            birth_date: { type: Date, required: true },
            phone_mobile: { type: String, required: true },
            address: {
                street  : { type: String, required: true },
                city    : { type: String, required: true },
                postcode: { type: String, required: true },
                country : { type: String, required: true }
            },

            rating: {
                avg_criteria_1: { type: Number },
                avg_criteria_2: { type: Number },
                avg_criteria_3: { type: Number },
                avg_criteria_4: { type: Number },
                avg_criteria_5: { type: Number },
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