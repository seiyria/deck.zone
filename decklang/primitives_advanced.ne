
CssColor ->
  "#" hexdigit hexdigit hexdigit hexdigit hexdigit hexdigit {% joiner %}
| "#" hexdigit hexdigit hexdigit {% joiner %}

FontSize ->
  PositiveInteger CssUnit

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