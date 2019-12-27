const User = {
  bookmark: ({ id }, args, context) => {
    return context.prisma.user({ id }).bookmark();
  },
  comments: ({ id }, args, context) => {
    return context.prisma.user({ id }).comments({orderBy: "createdAt_DESC"});
  },
};

module.exports = {
  User,
};
