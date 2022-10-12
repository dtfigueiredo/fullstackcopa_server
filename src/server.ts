import { app } from './setup';
import 'dotenv/config';

//listeners
app.listen(process.env.PORT, () =>
  console.log(`KOA running on port ${process.env.PORT}`)
);
