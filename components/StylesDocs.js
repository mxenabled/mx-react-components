const React = require('react');

const Markdown = require('components/Markdown');

const StylesDocs = React.createClass({
  render () {
    return (
      <div>
        <h1>
          Styles
          <label>Contains values that are used throughout mx-react-components. Exposing it makes it easy to use the same colors, font sizes, fonts, etc throughout any application.</label>
        </h1>

        <h3>Usage</h3>

        <h5>Colors</h5>
        <Markdown lang='js'>
  {`
    Styles.Colors.ASH // #ACB0B3
    Styles.Colors.CHARCOAL // #56595A
    Styles.Colors.FOG // #E3E6E7
    Styles.Colors.PORCELAIN // #F7F8F8
    Styles.Colors.WHITE // #FFFFFF
    Styles.Colors.PRIMARY // #359BCF
    Styles.Colors.BANANA // #FBB600
    Styles.Colors.ORANGE // #EF7625
    Styles.Colors.LIME // #2EBE51
    Styles.Colors.STRAWBERRY // #E22727
  `}
        </Markdown>

        <h5>Chart Colors</h5>
        <Markdown lang='js'>
  {`
    Styles.Colors.BASE_ARC // #F5F5F5
    Styles.Colors.YELLOW // #F6A01E
    Styles.Colors.GREEN // #00A89C
    Styles.Colors.BLUE // #359BCF
    Styles.Colors.RED // #EE4235
  `}
        </Markdown>

        <h5>FontSizes</h5>
        <Markdown lang='js'>
  {`
    Styles.FontSizes.JUMBO // 30px
    Styles.FontSizes.XXLARGE // 20px
    Styles.FontSizes.XLARGE // 17px
    Styles.FontSizes.LARGE // 15px
    Styles.FontSizes.MEDIUM // 13px
    Styles.FontSizes.SMALL // 11px
    Styles.FontSizes.TINY // 10px
  `}
        </Markdown>

        <h5>Fonts</h5>
        <p>In order to leverage the ProximaNova fonts, you will need to include those fonts in your application using @font_face and make sure the names match.</p>

        <Markdown lang='js'>
  {`
    Styles.Fonts.THIN // ProximaNovaThin, Helvetica, Arial, sans-serif
    Styles.Fonts.LIGHT // ProximaNovaLight, Helvetica, Arial, sans-serif
    Styles.Fonts.REGULAR // ProximaNovaRegular, Helvetica, Arial, sans-serif
    Styles.Fonts.ITALIC // ProximaNovaRegularItalic, Helvetica, Arial, sans-serif
    Styles.Fonts.SEMIBOLD // ProximaNovaSemibold, Helvetica, Arial, sans-serif
  `}
        </Markdown>

        <h3>Example</h3>
        <Markdown lang='js'>
  {`
    const { Styles } = require('mx-react-components');

    const styles = {
      color: Styles.Colors.STRAWBERRY
    };
  `}
        </Markdown>
      </div>
    );
  }
});

module.exports = StylesDocs;