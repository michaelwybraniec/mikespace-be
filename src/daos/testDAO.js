var mongoose = require("mongoose");
var Phones = require("../persisters/phones.js");


const demoLookup = function (query) {
  return query.concat([
    {
      $lookup: {
        from: "phones",
        localField: "desired_model",
        foreignField: "model",
        as: "searched_phones"
      }
    },
    {
      $lookup: {
        from: "phones",
        localField: "desired_color",
        foreignField: "color",
        as: "phone_by_fav_color"
      }
    },
    {
      $lookup: {
        from: "accesories",
        localField: "desired_body_type",
        foreignField: "body_type",
        as: "desired_accesories"
      }
    },
    {
      $lookup: {
        from: "network_offers",
        localField: "chosen_network",
        foreignField: "network",
        as: "network_offers"
      }
    }
  ]);
};

const getAllAdvanced = function (filters, successCbk, errorCbk) {
  var {
    phone_type,
    desired_color,
    desired_body_type,
    chosen_network
  } = filters;

  var matchQuery = {
    $match: {
      sales_start_date: { $gte: new Date(sales_start_date) },
      sales_end_date: { $lte: new Date(sales_end_date) },
    }
  };

  if (phone_type !== "null" && phone_type !== "undefined")
    matchQuery.$match["phone_type"] = phone_type;

  if (desired_color !== "null" && desired_color !== "undefined")
    matchQuery.$match["desired_color"] = desired_color;

  if (desired_body_type !== "null" && desired_body_type !== "undefined")
    matchQuery.$match["desired_body_type"] = desired_body_type;

  if (chosen_network !== "null" && chosen_network !== "undefined")
    matchQuery.$match["chosen_network"] = chosen_network;

  Replacement.aggregate(
    [{
      $lookup: {
        from: "phones",
        localField: "_id",
        foreignField: "user_id",
        as: "phones"
      }
    },
    { $match: { "phones._id": { $exists: true } } }]
      .concat(doctorLookup([]).concat([
        matchQuery,
        { $sort: { start_date: 1 } }
      ])),
    function (err, phones) {
      if (err) return errorCbk(err);
      return successCbk(phones);
    }
  );
};




// Test.aggregate([
  // {
    // $match: matchQuery,
  // },
  // {
    // $group: {
      // _id: { $dateToString: { format: formatDate, date: "$createdAt" } },
      // countError: { "$sum": { "$cond": [{ "$eq": ["$level", "error"] }, 1, 0] } },
      // countWarn: { "$sum": { "$cond": [{ "$eq": ["$level", "warn"] }, 1, 0] } },
      // countInfo: { "$sum": { "$cond": [{ "$eq": ["$level", "info"] }, 1, 0] } },
      // countDebug: { "$sum": { "$cond": [{ "$eq": ["$level", "debug"] }, 1, 0] } }
    // }
  // },
  // {
    // $addFields: { date: "$_id" }
  // },
  // {
    // $sort: { date: 1, }
  // },
  // {
    // $project: { _id: 0 }
  // }
// ],



//* Neasted aggr: [{a:"a",b:{...},c:{...},d:"d"]
// $lookup: {
//   from: “address”,
//   localField: “_id”,
//   foreignField: “party_id”,
//   as: “address”
// }
// }, {
// $unwind: { // Unwind [] if expect only one object
//     path: “$address”,
//     preserveNullAndEmptyArrays: true
//   }
// }, {
//   $lookup: {
//     from: “addressComment”,
//     localField: “address._id”,
//     foreignField: “address_id”,
//     as: “address.addressComment”,
//   }
// }


module.exports = {
  getAllAdvanced: getAllAdvanced
}