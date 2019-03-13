const mongoose = require('mongoose');
const { send } = require('micro');

// Database config & schema

mongoose.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBURI}`, { useNewUrlParser: true });

const apiStatusSchema = mongoose.Schema({
  wdc: String,
  action: String,
  responseCode: Number,
  error: String,
}, { timestamps: { createdAt: 'createdAt' } });

const ApiStatus = mongoose.model('ApiStatus', apiStatusSchema);

// End Database config & schema

// API Routes

module.exports = async (req, res) => {
  ApiStatus.aggregate([
    { $group: { _id: { wdc: '$wdc',
                       action: '$action',
                       responseCode: '$responseCode',
                       year: { $year: "$createdAt" },
                       month: { $month: "$createdAt" },
                       day: { $dayOfMonth: "$createdAt" },
                       hour: { $hour: "$createdAt" },
                     }, count: { $sum: 1 } } },
  ]).exec((err, stats) => {
    if (err) {
      send(res, 401, {
        result: 'error',
        error: err,
      });
    } else {
      const retArr = [];
      for (let i = 0; i < stats.length; i += 1) {
        const stat = stats[i]['_id'];
        const action = stat.action.split('-');
        delete stat.action;
        stat.method = action[0];
        stat.level1 = action[1];
        if (action[2]) {
          stat.level2 = action[2];
        }
        stat.datetime = `${stat.year}-${stat.month}-${stat.day} ${stat.hour}:00:00`;
        delete stat.year;
        delete stat.month;
        delete stat.day;
        delete stat.hour;
        stat.count = stats[i].count;
        retArr.push(stat);
      }
      send(res, 200, retArr);
    }
  });
};
