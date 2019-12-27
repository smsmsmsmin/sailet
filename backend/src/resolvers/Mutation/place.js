const { getUserId } = require("../../utils");

const place = {
  async createPlace(parent, args, context) {
    return context.prisma.createPlace({
      name: args.name,
      lat: args.lat,
      lng: args.lng,
      status: "unknown",
      contact: args.contact,
      hours: args.hours
    });
  },

  async newRating(parent, args, context) {
    const userId = getUserId(context);
    const statusSelector = () => {
      switch (args.status) {
        case 0:
          return "good";
          break;
        case 1:
          return "bad";
          break;
      }
    };
    return context.prisma.updatePlace({
      where: {
        id: args.placeId
      },
      data: {
        status: statusSelector(),
        comments: {
          create: {
            rating: args.rating,
            content: args.comment,
            user: {
              connect: {
                id: userId
              }
            }
          }
        },
        images: {
          create: args.images.map(image => {
            return {
              user: { connect: { id: userId } },
              uri: image
            };
          })
        }
      }
    });
  },

  async addBookmark(parent, args, context) {
    const userId = getUserId(context);
    return context.prisma.updatePlace({
      where: {
        id: args.placeId
      },
      data: {
        bookmark: {
          connect: {
            id: userId
          }
        }
      }
    });
  },

  async removeBookmark(parent, args, context) {
    const userId = getUserId(context);
    return context.prisma.updatePlace({
      where: {
        id: args.placeId
      },
      data: {
        bookmark: {
          disconnect: {
            id: userId
          }
        }
      }
    });
  }
};

module.exports = { place };
