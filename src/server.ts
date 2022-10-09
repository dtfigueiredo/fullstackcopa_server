import { app } from './setup';

//listeners
app.listen(process.env.PORT, () =>
  console.log(`KOA running on port ${process.env.PORT}`)
);
