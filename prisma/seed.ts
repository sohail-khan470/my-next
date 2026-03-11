import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL environment variable is not set");
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting seed...");

  // Clean up existing data
  await prisma.note.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const user1 = await prisma.user.create({
    data: {
      email: "john@example.com",
      name: "John Doe",
      password: "hashed_password_here",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "jane@example.com",
      name: "Jane Smith",
      password: "hashed_password_here",
    },
  });

  console.log("Created users:", { user1, user2 });

  // Create notes for user1
  await prisma.note.createMany({
    data: [
      {
        title: "Welcome to Notes App",
        content:
          "This is your first note! You can create, edit, and delete notes.",
        userId: user1.id,
        is_completed: false,
      },
      {
        title: "Shopping List",
        content: "Milk, Bread, Eggs, Butter, Cheese",
        userId: user1.id,
        is_completed: true,
      },
      {
        title: "Project Ideas",
        content: "1. Build a todo app\n2. Create a blog\n3. Learn React",
        userId: user1.id,
        is_completed: false,
      },
      {
        title: "Meeting Notes",
        content:
          "Discussed the roadmap for Q2. Key points: feature A, feature B, and bug fixes.",
        userId: user1.id,
        is_completed: false,
      },
    ],
  });

  // Create notes for user2
  await prisma.note.createMany({
    data: [
      {
        title: "Jane's Todo",
        content: "Learn TypeScript, Practice Next.js, Read a book",
        userId: user2.id,
        is_completed: false,
      },
      {
        title: "Recipes",
        content: "Pasta carbonara: eggs, bacon, parmesan, pasta",
        userId: user2.id,
        is_completed: true,
      },
    ],
  });

  console.log("Created notes successfully!");

  // Verify data
  const users = await prisma.user.findMany({ include: { notes: true } });
  console.log("All data:", JSON.stringify(users, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error during seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
