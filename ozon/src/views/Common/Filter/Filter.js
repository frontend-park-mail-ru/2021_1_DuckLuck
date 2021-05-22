import filterTemplate from './Filter.hbs';
import filterStyles from './Filter.scss';
import textStyles from '../TextArea/TextArea.scss';
import buttonStyles from '../Button/Button.scss';

/**
 * @description Filter form template
 */
export class Filter {
    /**
     *
     * @return {string} generated HTML after templating
     */
    static getHtmlString = () => {
        return filterTemplate({
            filterStyles: filterStyles,
            textStyles: textStyles,
            buttonStyles: buttonStyles,
        });
    }
}
