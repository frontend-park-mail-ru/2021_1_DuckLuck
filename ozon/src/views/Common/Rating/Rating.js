import RatingTempalte from './Rating.hbs';

/**
 * @class Rating
 * @classdesc This class is using for construct html via templates. One of the common views
 */
export class Rating {
    /**
     *
     * @param {number} minRating minimum rating of somethibg or someone
     * @param {nubmer} maxRating maximum rating of somethibg or someone
     */
    constructor({minRating = 0, maxRating = 5} = {}) {
        this.objectType = 'rating';
        this.minRatingValue = minRating;
        this.maxRatingValue = maxRating;
    }

    /**
     *
     * @param {Object} ratingObject object which will templated
     * @param {Object} ratingValue value of a rating
     * @return {string} generated HTML after templating
     */
    getHtmlString = ({ratingObject, ratingValue}) => {
        return RatingTempalte({
            ratingObject: ratingObject,
            ratingValue: ratingValue,
            minRatingValue: this.minRatingValue,
            maxRatingValue: this.maxRatingValue,
        });
    };
}
