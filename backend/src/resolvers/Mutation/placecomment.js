const { getUserId } = require("../../utils");

const placecomment = {
  async createPlaceComment(parent, { content, rating, placeId }, context) {
    const userId = getUserId(context);
    return context.prisma.createPlaceComment({
      content,
      rating,
      place: { connect: { id: placeId } },
      user: { connect: { id: userId } }
    });
  },
  deletePlaceComment(parent, { id }, context) {
    return context.prisma.deletePlaceComment({id});
  }
};

module.exports = { placecomment };
