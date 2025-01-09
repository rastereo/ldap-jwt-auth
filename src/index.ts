import app from './app';
import env from './utils/envalid';

const port: number = env.NODE_ENV === 'development' ? env.DEV_PORT : env.PORT;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
