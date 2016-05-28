
text -> "text" _ "="
        _ PositiveIntegerVariable       # index
        _ "," _ String                  # display text
        _ "," _ PositiveCssVariable     # x position
        _ "," _ PositiveCssVariable     # y position
        _ "," _ PositiveCssVariable     # width
        _ "," _ PositiveCssVariable     # height
      ( _ "," _ HorizontalAlignment):?  # horizontal alignment (optional)
      ( _ "," _ VerticalAlignment):?    # vertical alignment (optional)
{%
  function(d) {
    return {
      call: d[0],
      index: d[4],
      string: d[8],
      x: d[12],
      y: d[16],
      w: d[20],
      h: d[24],
      horizAlign: d[25] ? d[25][3] : '',
      vertAlign:  d[26] ? d[26][3] : ''
    }
  }
%}