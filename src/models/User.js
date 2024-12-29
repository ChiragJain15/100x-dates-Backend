const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: [18, 'Age must be at least 18'], // Validation for age > 16 (using 17 as min)
  },
  aboutMe: {
    type: String,
    required: true,
    maxlength: [40, 'About me must be less than 40 characters'], // Validation for max length
  },
  whatAreYouLookingFor: {
    type: String,
    required: true,
    enum: ['Friendship', 'Dating', 'Networking', 'Something Casual', 'Long-Term Relationship', 'Marriage'],
  },
  favouriteLanguage: {
    type: String,
    required: true,
    enum: ['JavaScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Swift', 'Go', 'Kotlin','TypeScript','Rust','Other'],
  },
  images: {
    type: [String],
    required: true,
    validate: [arrayLimit, '{PATH} exceeds the limit of 4'],
  },
});

function arrayLimit(val) {
  return val.length <= 4;
}

const User = mongoose.model('User', userSchema);

module.exports = User;