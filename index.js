require("dotenv").config();

const server = require("./server");

const port = process.env.PORT || 4000;


server.get('/', (req, res) => {
  res.status(200).json({"Message": "Server is up!"})
})

server.listen(port, () => {
  console.log(`\n** Running on port ${port} **\n`);
});
