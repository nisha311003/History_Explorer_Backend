const mongoose = require("mongoose");
const credentialsSchema = new mongoose.Schema(
    {
        Uname: {type: String, required: true},
        email: {type: String, required:true, unique: true},
        password: {type: String, required: true},
        resetToken: String,
        resetTokenExpiry: Date,

    },
{
    collection: "Credential"
}
);
module.exports = mongoose.model("Credential", credentialsSchema);