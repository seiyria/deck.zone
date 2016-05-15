
font -> "font" _ "="
        _ String                  # font name
        _ "," _ PositiveInteger   # font size
        _ "," _ TextDecoration    # font decoration
        _ "," _ CssColor          # font color
{%
  function(d) {
    return {
      call: d[0],
      font: d[4],
      fontSize: d[8],
      fontDecoration: d[12] || '',
      fontColor: d[16]
    }
  }
%}