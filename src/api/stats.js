const mongoose = require('mongoose');
const { send } = require('micro');

// Database config & schema

mongoose.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBURI}`, { useNewUrlParser: true });

const statSchema = mongoose.Schema({
  wdc: String,
  action: String,
}, { timestamps: { createdAt: 'createdAt' } });

const Stat = mongoose.model('Statistic', statSchema);

// End Database config & schema

// API Routes

module.exports = async (req, res) => {
  Stat.aggregate([
    { $group: { _id: { wdc: '$wdc', action: '$action' }, count: { $sum: 1 } } },
  ]).exec((err, stats) => {
    if (err) {
      send(res, 401, {
        result: 'error',
        error: err,
      });
    } else {
      const retObj = {};
      for (let i = 0; i < stats.length; i += 1) {
        const { action } = stats[i]['_id'];
        if (retObj[stats[i]['_id'].wdc]) {
          retObj[stats[i]['_id'].wdc][action] = stats[i].count;
        } else {
          retObj[stats[i]['_id'].wdc] = {
            [action]: stats[i].count,
          };
        }
      }
      send(res, 200, retObj);
    }
  });
};
