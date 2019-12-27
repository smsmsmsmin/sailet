const placeimage = {
  deletePlaceImage(parent, { id }, context) {
    return context.prisma.deletePlaceImage({ id });
  }
};

module.exports = { placeimage };
