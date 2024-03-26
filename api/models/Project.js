const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
      minLength: 1,
    },
    projectUrl: {
      type: String,
      required: true,
      minLength: 1,
    },
    projectDescription: {
      type: String,
      required: true,
      minLength: 1,
    },
    projectImageUrl: {
      type: String,
      required: true,
      minLength: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
