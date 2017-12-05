// eslint-disable react/jsx-indent rule added for proper <Markdown /> formatting
/* eslint-disable react/jsx-indent */
const PropTypes = require("prop-types");
const React = require("react");

const { Styles } = require("mx-react-components");

const Code = require("components/Code");
const Markdown = require("components/Markdown");
const StyleUtils = require("utils/Style");

const ColorInfo = ({ colorName }) => (
  <div
    key={Styles.Colors[colorName]}
    style={{
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      margin: 20,
      textAlign: "center"
    }}
  >
    <div
      key={colorName}
      style={{
        width: 80,
        height: 80,
        borderRadius: "100%",
        backgroundColor: Styles.Colors[colorName]
      }}
    />
    <div style={{ color: Styles.Colors.GRAY_700, marginTop: 5 }}>
      {colorName}
    </div>
    <div
      style={{
        color: Styles.Colors.GRAY_500,
        marginTop: 5,
        fontSize: Styles.FontSizes.SMALL
      }}
    >
      ({Styles.Colors[colorName]})
    </div>
  </div>
);

ColorInfo.propTypes = {
  colorName: PropTypes.string
};

const ColorsList = ({ colors }) => (
  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
    {colors.map(colorName => (
      <ColorInfo colorName={colorName} key={colorName} />
    ))}
  </div>
);

ColorsList.propTypes = {
  colors: PropTypes.array
};

class StylesDocs extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Styles
          <label>
            Contains values that are used throughout mx-react-components.
            Exposing it makes it easy to use the same colors, font sizes, fonts,
            etc throughout any application.
          </label>
        </h1>

        <h3>Constants</h3>

        <h5>Neutral Colors</h5>
        <ColorsList
          colors={[
            "WHITE",
            "GRAY_100",
            "GRAY_300",
            "GRAY_500",
            "GRAY_700",
            "GRAY_900"
          ]}
        />

        <h5>Accent Colors</h5>
        <ColorsList
          colors={["PRIMARY", "SUCCESS", "WARNING", "DANGER", "ATTENTION"]}
        />

        <h5>Light Accent Colors</h5>
        <ColorsList
          colors={["LIGHT_SUCCESS", "LIGHT_WARNING", "LIGHT_DANGER"]}
        />

        <h5>Scrim Color</h5>
        <ColorsList colors={["SCRIM"]} />

        <h5>FontSizes</h5>
        <Markdown lang="js">
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
        <p>
          In order to leverage the ProximaNova fonts, you will need to include
          those fonts in your application using <Code>@font_face</Code> and make
          sure the names match.
        </p>

        <Markdown lang="js">
          {`
            Styles.Fonts.THIN // ProximaNovaThin, Helvetica, Arial, sans-serif
            Styles.Fonts.LIGHT // ProximaNovaLight, Helvetica, Arial, sans-serif
            Styles.Fonts.REGULAR // ProximaNovaRegular, Helvetica, Arial, sans-serif
            Styles.Fonts.ITALIC // ProximaNovaRegularItalic, Helvetica, Arial, sans-serif
            Styles.Fonts.SEMIBOLD // ProximaNovaSemibold, Helvetica, Arial, sans-serif
          `}
        </Markdown>

        <h5>Box Shadows</h5>
        <Markdown lang="js">
          {`
            Styles.ShadowLow: '0 1px 2px rgba(0,0,0,0.1)',
            Styles.ShadowMed: '0 2px 6px rgba(0,0,0,0.1)',
            Styles.ShadowHigh: '0 10px 30px 5px rgba(0,0,0,0.1)',
          `}
        </Markdown>

        <h5>Spacing</h5>
        <Markdown lang="js">
          {`
            Styles.Spacing.XLARGE: 30,
            Styles.Spacing.LARGE: 20,
            Styles.Spacing.MEDIUM: 15,
            Styles.Spacing.SMALL: 10,
            Styles.Spacing.XSMALL: 5
          `}
        </Markdown>

        <h5>BreakPoints</h5>
        <Markdown lang="js">
          {`
            Styles.BreakPoints.large: 1200,
            Styles.BreakPoints.medium: 768,
            Styles.BreakPoints.small: 320
          `}
        </Markdown>

        <h3>Utilities</h3>

        <h5>Adjust Color</h5>
        <p>
          Takes a HEX color and adjust amount and returns a HEX value of the new
          color. Negative numbers darken whereas positive numbers lighten the
          color.
        </p>

        <Markdown lang="js">
          {`
            color: StyleUtils.adjustColor(Styles.Colors.PRIMARY, -15); //#359BCF is adjusted and returned as #268CC0
          `}
        </Markdown>

        <h5>Adjust HEX Opacity</h5>
        <p>
          Takes a HEX color and opacity amount and returns a rgba value of the
          new color.
        </p>

        <Markdown lang="js">
          {`
            color: StyleUtils.adjustHexOpacity(Styles.Colors.PRIMARY, 0.5); //#359BCF, 0.5 is returned as rgba(53, 155, 207, 0.5)
          `}
        </Markdown>

        <h5>Linear Gradient</h5>
        <p>
          Takes two HEX colors and optional opacity amounts and returns a linear
          gradient string. The first color is requried, the other color and
          opacities are optional. If only the first color is provided, the
          gradient will be a single color from 0.8 to 1.
        </p>
        <div
          style={{
            background: StyleUtils.linearGradient(Styles.Colors.PRIMARY),
            height: 100,
            width: "100%"
          }}
        />

        <Markdown lang="js">
          {`
            background: StyleUtils.linearGradient(Styles.Colors.PRIMARY);
          `}
        </Markdown>

        <div
          style={{
            background: StyleUtils.linearGradient(Styles.Colors.PRIMARY, 0.2),
            height: 100,
            width: "100%"
          }}
        />

        <Markdown lang="js">
          {`
            background: StyleUtils.linearGradient(Styles.Colors.PRIMARY, 0.2);
          `}
        </Markdown>

        <div
          style={{
            background: StyleUtils.linearGradient(
              Styles.Colors.DANGER,
              1,
              Styles.Colors.SUCCESS,
              1
            ),
            height: 100,
            width: "100%"
          }}
        />

        <Markdown lang="js">
          {`
            background: StyleUtils.linearGradient(Styles.Colors.DANGER, 1, Styles.Colors.SUCCESS, 1);
          `}
        </Markdown>

        <h5>Get Window Size</h5>
        <p>
          Returns the <Code>Styles.BreakPoints</Code> key for the current window
          width.
        </p>
        <Markdown lang="js">
          {`
            StyleUtils.getWindowSize(Styles.BreakPoints) // e.g. returns 'large'
          `}
        </Markdown>

        <h3>Example</h3>
        <Markdown lang="js">
          {`
            const { Styles } = require('mx-react-components');

            const styles = {
              color: Styles.Colors.DANGER
            };
          `}
        </Markdown>
      </div>
    );
  }
}

module.exports = StylesDocs;
