import app from "./app.js";
import { port } from "./config/config.js"

app.listen(port, ()=>{
  console.log(`Server running on  http://localhost:${port}`);
})