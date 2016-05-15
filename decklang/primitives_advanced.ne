
# css
CssColor ->
  "#" hexdigit hexdigit hexdigit hexdigit hexdigit hexdigit {% joiner %}
| "#" hexdigit hexdigit hexdigit {% joiner %}

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