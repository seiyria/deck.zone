
font -> "font" _ "="
        _ String                  # font name
        _ "," _ CssValue          # font size
        _ "," _ TextDecoration    # font decoration
      ( _ "," _ CssColor):?       # font color
{%
  function(d) {
    return {
      call: d[0],
      family: d[4],
      size: d[8][0],
      unit: d[8][1],
      decoration: d[12] || '',
      color: d[16] || '#000'
    }
  }
%}