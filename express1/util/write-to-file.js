const fs = require("fs");
const path = require('path');
module.exports = (data) =>{
    console.log("The data to write in file: ",data);
    try{
        fs.writeFileSync(path.join(__dirname,"..","data","history.json"),
        JSON.stringify(data),"UTF-8");
    }
    catch(err){
        console.log(err);
    }
}