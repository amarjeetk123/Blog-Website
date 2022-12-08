const app = require("./App")
const PORT = process.env.PORT || 3600
app.listen(PORT,()=>{
    console.log("APP is running at port number:-" , PORT)
})