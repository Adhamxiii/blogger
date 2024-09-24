import { Schema, model, models } from "mongoose";

const EmailModelSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const EmailModel = models.EmailModel || model("EmailModel", EmailModelSchema);
export default EmailModel;
