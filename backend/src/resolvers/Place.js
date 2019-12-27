const Place = {
  bookmark: ({ id }, args, context) => {
    return context.prisma.place({ id }).bookmark();
  },
  comments: ({ id }, args, context) => {
    return context.prisma.place({ id }).comments({
      orderBy: args.orderBy,
      first: args.first,
      after: args.after,
    });
  },
  images: ({ id }, args, context) => {
    return context.prisma.place({ id }).images();
  },
};

module.exports = { Place };
