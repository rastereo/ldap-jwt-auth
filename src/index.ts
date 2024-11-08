import app from './app'; // https://blog.logrocket.com/how-to-set-up-node-typescript-express/
import env from './config/envalid';

const port: number = env.PORT;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
