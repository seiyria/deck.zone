
CssColor ->
  "#" hexdigit hexdigit hexdigit hexdigit hexdigit hexdigit {% joiner %}
| "#" hexdigit hexdigit hexdigit {% joiner %}

PositiveCssValue ->
  PositiveDecimal (CssUnit):? {% function(d) { return { val: d[0], unit: d[1] ? d[1][0] : undefined }; } %}

PositiveCssVariable ->
  PositiveDecimal (CssUnit):? {% function(d) { return { val: d[0], unit: d[1] ? d[1][0] : undefined }; } %}
| LoopVariable (CssUnit):?    {% function(d) { return { val: d[0], unit: d[1] ? d[1][0] : undefined }; } %}

CssUnit ->
  "em"    {% id %}
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