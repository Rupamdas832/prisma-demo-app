const { prisma } = require("@/app/db/db");
const { hash } = require("@/utils/hash");

export const createAdminUser = async () => {
  const adminPassword = "12345678";

  const passwordHash = await hash(adminPassword);

  const admin = await prisma.admin.findFirst({
    where: {
      email: {
        equals: "admin@test.com",
      },
    },
  });

  if (admin) {
    return "Admin already exists";
  }

  const newAdmin = await prisma.admin.create({
    data: {
      email: "admin@test.com",
      password: passwordHash,
    },
  });

  if (newAdmin) return "Created admin user";
};
