import http from 'http';
import bcrypt from 'bcryptjs';
import { createApp } from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';
import { UserModel } from './models/User.js';
import { initializeSocket } from './socket.js';

const start = async () => {
  await connectDatabase();

  const existingDemoUser = await UserModel.findOne({ email: env.demoUserEmail });
  if (!existingDemoUser) {
    const hashedPassword = await bcrypt.hash(env.demoUserPassword, 12);
    await UserModel.create({
      name: 'Admin User',
      email: env.demoUserEmail,
      password: hashedPassword,
      role: 'admin'
    });
  }

  const app = createApp();
  const server = http.createServer(app);

  initializeSocket(server);

  server.listen(env.port, () => {
    console.log(`Backend listening on port ${env.port}`);
  });
};

void start();
