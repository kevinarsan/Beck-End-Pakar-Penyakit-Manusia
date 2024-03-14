const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  user: prisma.user,
  profile: prisma.profile,
  review: prisma.review,
  rating: prisma.rating,
  notification: prisma.notification,
  profileDoctor: prisma.profileDoctor,
  practice: prisma.practice,
  hospital: prisma.hospital,
  practiceOnDoctor: prisma.practiceOnDoctor,
  hospitalOnDoctor: prisma.hospitalOnDoctor,
  transaction: prisma.transaction,
  paymentMethod: prisma.paymentMethod,
  detailTransaction: prisma.detailTransaction,
  address: prisma.address,
  visiMisi: prisma.visiMisi,
  team: prisma.team,
  aboutUs: prisma.aboutUs,
  tutorial: prisma.tutorial,
  faq: prisma.faq,
  contact: prisma.contact,
};
