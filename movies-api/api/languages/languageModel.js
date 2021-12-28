import mongoose from 'mongoose';

  const Schema = mongoose.Schema;

  const LanguageSchema = new Schema({
    iso_639_1: { type: Number,  unique: true, required: true},
    name: {type: String, required: true }
  });

  export default mongoose.model('Language', LanguageSchema);