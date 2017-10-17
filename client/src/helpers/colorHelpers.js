import Color from 'color';

const colors = [
  Color('rgba(242, 215, 238, 1)'),
  Color('rgba(211, 188, 192, 1)'),
  Color('rgba(165, 102, 139, 1)'),
  Color('rgba(105, 48, 109, 1)'),
  Color('rgba(14, 16, 61, 1)'),
];

export const gradients = {
  background: `linear-gradient(-45deg, ${colors[0]
    .rotate(60)
    .string()}, ${colors[0].rotate(90).string()})`,
  divider: `linear-gradient(90deg, ${colors[4].string()}, ${colors[2]
    .rotate(45)
    .string()})`,
  drawer: `linear-gradient(-45deg, ${colors[0]
    .rotate(60)
    .lighten(0.05)
    .string()}, ${colors[0].rotate(90).lighten(0.05).string()})`,
  button: `linear-gradient(140deg, ${colors[3].string()}, ${colors[3]
    .darken(0.25)
    .string()})`,
  navDrawer: `linear-gradient(-90deg, ${colors[4]
    .rotate(0)
    .string()}, ${colors[4].rotate(45).string()})`,

  navItem: `linear-gradient(90deg, ${colors[3]
    .fade(1)
    .string()}, ${colors[4].darken(0.1).string()})`,
  navItemRight: `linear-gradient(-90deg, ${colors[3]
    .fade(1)
    .string()}, ${colors[4].darken(0.1).string()})`,
  rightDrawer: `linear-gradient(90deg, ${colors[4]
    .rotate(0)
    .string()}, ${colors[4].rotate(45).string()})`,
  story: `linear-gradient(-90deg, ${colors[3]
    .rotate(0)
    .darken(0.2)
    .string()}, ${colors[3].rotate(25).darken(0.2).string()})`,
};

export default colors;
