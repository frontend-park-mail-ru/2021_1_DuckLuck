import RatingTempalte from "./Rating.hbs"

export class Rating {
    constructor({minRating = 0, maxRating = 5}) {
        this.objectType = 'rating';
        this.minRatingValue = minRating;
        this.maxRatingValue = maxRating;
    }

    getHtmlString = ({ratingObject, ratingValue}) => {
        return RatingTempalte({
            ratingObject: ratingObject,
            ratingValue: ratingValue,
            minRatingValue: this.minRatingValue,
            maxRatingValue: this.maxRatingValue,
        });
    };
}
