import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { Repository, Sequelize } from "sequelize-typescript";
import { User } from "../users/model/user.model";
import { Follows } from "../follows/model/follow.model";

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const sequelize = app.get(Sequelize);

  await sequelize.sync({ force: true });

   const userRepo = sequelize.getRepository(User);
  const followRepo = sequelize.getRepository(Follows);

  const [alice, bob, carol] = await Promise.all([
    userRepo.create({ username: 'alice', email: 'alice@example.com', password: 'password123' }),
    userRepo.create({ username: 'bob', email: 'bob@example.com', password: 'password123' }),
    userRepo.create({ username: 'carol', email: 'carol@example.com', password: 'password123' }),
  ]);

  await followRepo.bulkCreate([
    { followerId: alice.id, followedId: bob.id },   // ✅ corrected: followeeId → followedId
    { followerId: bob.id, followedId: carol.id },
  ]);

  console.log('✅ Seeded using NestJS context');
  await app.close();
}

seed();
