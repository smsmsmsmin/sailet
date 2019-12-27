const { Query } = require("./Query");
const { auth } = require("./Mutation/auth");
const { place } = require("./Mutation/place");
const { placecomment } = require("./Mutation/placecomment");
const { placeimage } = require("./Mutation/placeimage");
const { placeaddrequest } = require("./Mutation/placeaddrequest");
const { placeeditrequest } = require("./Mutation/placeeditrequest");
const { User } = require("./User");
const { Place } = require("./Place");
const { PlaceComment } = require("./PlaceComment");

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...place,
    ...placecomment,
    ...placeimage,
    ...placeaddrequest,
    ...placeeditrequest,
  },
  User,
  Place,
  PlaceComment
};
