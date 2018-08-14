import StyleUtils from '../Style';
import StyleConstants from '../../constants/Style';

describe('StyleUtils', () => {
  describe('mergeTheme', () => {
    let theme;

    beforeEach(() => {
      theme = {
        Colors: { PRIMARY: '#F00' }
      };
    });

    it('should give precedence to the theme prop over StyleConstants', () => {
      expect(StyleUtils.mergeTheme(theme).Colors.PRIMARY).toEqual(theme.Colors.PRIMARY);
      expect(StyleUtils.mergeTheme({}).Colors.PRIMARY).toBeDefined();
      expect(StyleUtils.mergeTheme({}).Colors.PRIMARY).toEqual(StyleConstants.Colors.PRIMARY);
    });
  });
});