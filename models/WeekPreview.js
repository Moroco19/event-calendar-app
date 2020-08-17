class WeekPreview {
    constructor({ wpDate, wpEvents }) {
        this.wpDate = wpDate;
        this.wpEvents = wpEvents;
    };

    preview(date, eventItems) {
        return new this(date, eventItems);
    }
}

module.exports = WeekPreview;