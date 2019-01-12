
rect -> "rect" _ "="
        _ PositiveIntegerVariable         # index
        _ "," _ PositiveCssVariable       # x1 position
        _ "," _ PositiveCssVariable       # y1 position
        _ "," _ PositiveCssVariable       # x2 position
        _ "," _ PositiveCssVariable       # y2 position
      ( _ "," _ (PositiveCssValue):? ):?  # thickness
      ( _ "," _ (CssColor):? ):?          # line color (optional, defaults to #000)
      ( _ "," _ (CssColor):? ):?          # fill color (optional, defaults to #000)
{%
  function(d) {
    return {
      call: d[0],
      index: d[4],
      x1: d[8],
      y1: d[12],
      x2: d[16],
      y2: d[20],
      thickness: d[21] && d[21][3] ? d[21][3][0] : { val: 1, unit: 'px' },
      lineColor: d[22] && d[22][3] ? d[22][3][0] : '#000',
      fillColor: d[23] && d[23][3] ? d[23][3][0] : '#000'
    }
  }
%}