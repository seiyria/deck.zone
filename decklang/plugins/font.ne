
font -> "font" _ "="
        _ String                  # font name
        _ "," _ PositiveCssValue  # font size
      ( _ "," _ TextDecoration):? # font decoration
      ( _ "," _ CssColor):?       # font color
{%
  function(d) {
    return {
      call: d[0],
      family: d[4],
      css: d[8],
      decoration: d[9] ? d[9][3] : '',
      color: d[10] ? d[10][3] : '#000'
    }
  }
%}