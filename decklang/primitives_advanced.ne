
CssColor ->
  "#" hexdigit hexdigit hexdigit hexdigit hexdigit hexdigit {% joiner %}
| "#" hexdigit hexdigit hexdigit {% joiner %}

CssValue ->
  PositiveDecimal CssUnit

CssUnit ->
  null    {% function() { return 'pt'; } %}
| "em"    {% id %}
| "ex"    {% id %}
| "ch"    {% id %}
| "rem"   {% id %}
| "vh"    {% id %}
| "vw"    {% id %}
| "vmin"  {% id %}
| "vmax"  {% id %}
| "px"    {% id %}
| "mm"    {% id %}
| "cm"    {% id %}
| "in"    {% id %}
| "pt"    {% id %}
| "pc"    {% id %}

BorderStyle ->
  "dotted"  {% id %}
| "dashed"  {% id %}
| "solid"   {% id %}
| "double"  {% id %}
| "groove"  {% id %}
| "ridge"   {% id %}
| "inset"   {% id %}
| "outset"  {% id %}

HorizontalAlignment ->
  null     {% emptystring %}
| "left"   {% id %}
| "right"  {% id %}
| "center" {% id %}

VerticalAlignment ->
  null     {% emptystring %}
| "top"    {% id %}
| "bottom" {% id %}
| "middle" {% id %}