
font -> "font" _ "="
        _ String                  # font name
        _ "," _ CssValue          # font size
      ( _ "," _ TextDecoration):? # font decoration
      ( _ "," _ CssColor):?       # font color
{%
  function(d) {
    return {
      call: d[0],
      family: d[4],
      size: d[8][0],
      unit: d[8][1],
      decoration: d[9] ? d[9][3] : '',
      color: d[10] ? d[10][3] : '#000'
    }
  }
%}