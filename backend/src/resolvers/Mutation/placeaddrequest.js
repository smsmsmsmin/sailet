const { getUserId } = require("../../utils");

const placeaddrequest = {
  async createPlaceAddRequest(parent, { name, address, images }, context) {
    const userId = getUserId(context);
    return context.prisma.createPlaceAddRequest({
      name,
      address,
      images,
      user: { connect: { id: userId } }
    });
  }
};

module.exports = { placeaddrequest };
