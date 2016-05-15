
font -> "font" _ "="
        _ String                  # font name
        _ "," _ FontSize          # font size
        _ "," _ TextDecoration    # font decoration
        _ "," _ CssColor          # font color
{%
  function(d) {
    return {
      call: d[0],
      font: d[4],
      fontSize: { size: d[8][0], unit: d[8][1] },
      fontDecoration: d[12] || '',
      fontColor: d[16]
    }
  }
%}