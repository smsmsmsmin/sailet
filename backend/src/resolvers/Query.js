const { getUserId } = require("../utils");
const map = require("lodash/map");
const sum = require("lodash/sum");
const slice = require("lodash/slice");

const Query = {
  me(parent, args, context) {
    const id = getUserId(context);
    return context.prisma.user({ id });
  },
  place(parent, { id }, context) {
    return context.prisma.place({ id });
  },
  loadPlaces(parent, args, context) {
    return context.prisma.places({
      where: {
        lat_gt: args.swlat,
        lat_lt: args.nelat,
        lng_gt: args.swlng,
        lng_lt: args.nelng
      }
    });
  },
  async loadPlace(parent, args, context) {
    const userId = getUserId(context);
    const bookmark = await context.prisma.$exists.place({
      id: args.placeId,
      bookmark_some: { id_in: userId }
    });
    const preLoad = await context.prisma.$graphql(
      `  query($id: ID!) {
    place(where: {id: $id}) {
      id
      lat
      lng
      name
      status
      images {
        id
        uri
      }
      comments(orderBy: updatedAt_DESC) {
        id
        rating
        content
        user {
          id
          name
          profileImage
        }
        updatedAt
      }
      updatedAt
    }
  }`,
      { id: args.placeId }
    );
    const {
      id,
      lat,
      lng,
      name,
      status,
      images,
      comments,
      updatedAt
    } = preLoad.place;
    const temp = sum(map(comments, "rating")) / comments.length;
    const rating = isNaN(temp) ? 0 : temp;
    const place = {
      id,
      lat,
      lng,
      name,
      status,
      rating,
      images,
      comments: slice(comments, 0, 2),
      updatedAt,
      bookmark
    };
    return place;
  },
  async loadBookmark(parent, args, context) {
    const userId = getUserId(context);
    return context.prisma.user({ id: userId }).bookmark();
  },
  async placeEditRequest(parent, args, context) {
    return context.prisma.placeEditRequests();
  }
};

module.exports = { Query };
