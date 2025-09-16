import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const levels = [
    { title: "Level 1", text: "The cat sits on the mat.", status: "unlocked" },
    { title: "Level 2", text: "A dog runs fast in the park.", status: "locked" },
    { title: "Level 3", text: "Birds are flying in the sky.", status: "locked" },
    { title: "Level 4", text: "She likes to read books every day.", status: "locked" },
    { title: "Level 5", text: "They play football after school.", status: "locked" },
  ];

  for (const level of levels) {
    await prisma.level.upsert({
      where: { title: level.title },
      update: {},
      create: level,
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
