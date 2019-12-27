const { getUserId } = require("../../utils");

const placeeditrequest = {
  async createPlaceEditRequest(parent, { placeId, comment }, context) {
    const userId = getUserId(context);
    return context.prisma.createPlaceEditRequest({
      comment,
      place: { connect: { id: placeId } },
      user: { connect: { id: userId } }
    });
  }
};

module.exports = { placeeditrequest };
