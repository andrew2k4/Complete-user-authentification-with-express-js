import createServer from "./utils/server";

const app = createServer();

app.listen(3000, () => {
  console.log("server ready ");
});
