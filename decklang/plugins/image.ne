
image -> "image" _ "="
        _ PositiveIntegerVariable       # index
        _ "," _ String                  # url
        _ "," _ PositiveCssVariable     # x position
        _ "," _ PositiveCssVariable     # y position
        _ "," _ PositiveCssVariable     # width
        _ "," _ PositiveCssVariable     # height
{%
  function(d) {
    return {
      call: d[0],
      index: d[4],
      url: d[8],
      x: d[12],
      y: d[16],
      w: d[20],
      h: d[24]
    }
  }
%}