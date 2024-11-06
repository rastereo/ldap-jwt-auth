import app from './app'; // https://blog.logrocket.com/how-to-set-up-node-typescript-express/

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
