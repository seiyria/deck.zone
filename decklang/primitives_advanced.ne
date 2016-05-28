
CssColor ->
  "#" hexdigit hexdigit hexdigit hexdigit hexdigit hexdigit {% joiner %}
| "#" hexdigit hexdigit hexdigit {% joiner %}

CssValue ->
  Decimal CssUnit

PositiveCssValue ->
  PositiveDecimal CssUnit {% function(d) { return { val: d[0], unit: d[1] }; } %}

PositiveCssVariable ->
  PositiveDecimal CssUnit {% function(d) { return { val: d[0], unit: d[1] }; } %}
| LoopVariable CssUnit    {% function(d) { return { val: d[0], unit: d[1] }; } %}

CssUnit ->
  null    {% id %}
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

# used by many text directives
TextDecoration ->
  [BUI]:* {% joiner %}