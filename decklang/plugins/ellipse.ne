
ellipse -> "ellipse" _ "="
        _ PositiveIntegerVariable         # index
        _ "," _ PositiveCssVariable       # x position
        _ "," _ PositiveCssVariable       # y position
        _ "," _ PositiveCssVariable       # width
        _ "," _ PositiveCssVariable       # height
      ( _ "," _ (PositiveCssValue):? ):?  # thickness
      ( _ "," _ (CssColor):? ):?          # outer color
      ( _ "," _ (CssColor):? ):?          # inner color
{%
  function(d) {
    return {
      call: d[0],
      index: d[4],
      x: d[8],
      y: d[12],
      w: d[16],
      h: d[20],
      thickness:  d[21] && d[21][3] ? d[21][3][0] : '1px',
      outerColor: d[22] && d[22][3] ? d[22][3][0] : '#000',
      innerColor: d[23] && d[23][3] ? d[23][3][0] : '#fff'
    }
  }
%}