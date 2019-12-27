const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { getUserId } = require("../../utils");

const auth = {
  async naverAuth(parent, args, context) {
    const naver = await axios.get("https://openapi.naver.com/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${args.token}`
      }
    });

    const {
      email,
      name,
      profile_image: profileImage,
      id: uniqId,
      age,
      gender
    } = naver.data.response;

    let user = await context.prisma.user({ uniqId });

    if (!user) {
      await context.prisma.createUser({
        email,
        uniqId,
        name,
        gender,
        age,
        profileImage
      });
      user = await context.prisma.user({ uniqId });
    }

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET, {}),
      user
    };
  },

  async editName(parent, { name }, context) {
    const userId = getUserId(context);
    return context.prisma.updateUser({
      where: { id: userId },
      data: { name }
    });
  },

  async editEmail(parent, { email }, context) {
    const userId = getUserId(context);
    return context.prisma.updateUser({
      where: { id: userId },
      data: { email }
    });
  },

  async editProfileImage(parent, { uri }, context) {
    const userId = getUserId(context);
    return context.prisma.updateUser({
      where: { id: userId },
      data: { profileImage: uri }
    });
  }
};

module.exports = { auth };
