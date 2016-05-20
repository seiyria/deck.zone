
text -> "text" _ "="
        _ PositiveInteger               # index
        _ "," _ String                  # display text
        _ "," _ PositiveDecimal         # x position
        _ "," _ PositiveDecimal         # y position
        _ "," _ PositiveDecimal         # width
        _ "," _ PositiveDecimal         # height
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