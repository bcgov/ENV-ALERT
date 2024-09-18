import mongoose from 'mongoose';

const AdvisorySchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  submissionTime: {
    type: Date,
    required: true,
  },
  expirationTime: {
    type: Date,
    required: false,
  },
  eventType: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 32,
    trim: true,
    match: /^(Animal Sighting|Swimming Advisory|Drinking Water Advisory|Miscellaneous|APITest)$/i,
  },
  details: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 256,
    trim: true,
  },
});

AdvisorySchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: () => {
  },
});

export default mongoose.model('advisory', AdvisorySchema);
