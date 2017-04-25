const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const clientSchema = mongoose.Schema({
    name: { type: String, unique: true, required: true },
    id: { type: String, required: true },
    secret: { type: String, required: true },
    _userId: { type: String, required: true }
});

// clientSchema.pre('save', function (callback) {
//     var client = this;
//     if (!client.isModified('secret')) {
//         return callback();
//     }
//     bcrypt.genSalt(5, function (err, salt) {
//         if (err) {
//             return callback(err);
//         }
//         bcrypt.hash(client.secret, salt, null, function (err, hash) {
//             if (err) {
//                 return callback(err);
//             }
//             user.secret = hash;
//             callback();
//         });
//     });
// });

// clientSchema.methods.verifyClient = function (secret, cb) {
//     bcrypt.compare(secret, this.secret, function (err, isMatch) {
//         if (err) {
//             return cb(err);
//         }
//         cb(null, isMatch);
//     });
// };

module.exports = mongoose.model('Client', clientSchema);