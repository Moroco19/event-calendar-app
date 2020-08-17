const WeekPreview = require('../models/WeekPreview');
const Event = require('../models/Event');

const wpController = {
    show(req, res, next) {
        for (let i = 0; i < 7; i++) {
            WeekPreview.preview(moment().add(i, 'days').format("YYYY/MM/DD"),Event.getByDate(moment().add(i, 'days').format("YYYY/MM/DD")))
                .then((datePreview) => {
                    console.log(datePreview);
                    res.json(datePreview)
                });
        }
    }
}

module.exports = wpController;