import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  // eslint-disable-next-line no-console
  console.log(`Listening: on port ${5000}`);
});
