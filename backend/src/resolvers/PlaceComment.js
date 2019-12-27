const PlaceComment = {
  place: ({ id }, args, context) => {
    return context.prisma.placeComment({ id }).place();
  },
  user: ({ id }, args, context) => {
    return context.prisma.placeComment({ id }).user();
  },
};

module.exports = { PlaceComment };
