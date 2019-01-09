
CssColor ->
  "#" hexdigit hexdigit hexdigit hexdigit hexdigit hexdigit {% joiner %}
| "#" hexdigit hexdigit hexdigit {% joiner %}

PositiveCssValue ->
  PositiveDecimal (CssUnit):? {% function(d) { return { val: d[0], unit: d[1] ? d[1][0] : undefined }; } %}

PositiveCssVariable ->
  PositiveDecimal (CssUnit):? {% function(d) { return { val: d[0], unit: d[1] ? d[1][0] : undefined }; } %}
| Variable (CssUnit):?        {% function(d) { return { val: d[0], unit: d[1] ? d[1][0] : undefined }; } %}

CssMargin ->
  PositiveCssValue
  {% function(d) { return { left: d[0], right: d[0], top: d[0], bottom: d[0] }; } %}
| PositiveCssValue _ "," _ PositiveCssValue _ "," _ PositiveCssValue _ "," _ PositiveCssValue
  {% function(d) { return { left: d[0], right: d[4], top: d[8], bottom: d[12] }; } %}

PaperSize ->
  "a4"      {% function() { return { width: { val: 8.3, unit: 'in' }, height: { val: 11.7, unit: 'in' } } } %}
| "legal"   {% function() { return { width: { val: 8.5, unit: 'in' }, height: { val: 14, unit: 'in' } } } %}
| "letter"  {% function() { return { width: { val: 8.5, unit: 'in' }, height: { val: 11, unit: 'in' } } } %}

CardSize ->
  "bridge"      {% function() { return { width: { val: 2.25, unit: 'in' },  height: { val: 3.5, unit: 'in' } } } %}
| "business"    {% function() { return { width: { val: 2.0, unit: 'in' },   height: { val: 3.5, unit: 'in' } } } %}
| "domino"      {% function() { return { width: { val: 1.75, unit: 'in' },  height: { val: 3.5, unit: 'in' } } } %}
| "jumbo"       {% function() { return { width: { val: 3.5, unit: 'in' },   height: { val: 5.5, unit: 'in' } } } %}
| "micro"       {% function() { return { width: { val: 1.25, unit: 'in' },  height: { val: 1.75, unit: 'in' } } } %}
| "mini"        {% function() { return { width: { val: 1.75, unit: 'in' },  height: { val: 2.5, unit: 'in' } } } %}
| "poker"       {% function() { return { width: { val: 2.5, unit: 'in' },   height: { val: 3.5, unit: 'in' } } } %}
| "smallsquare" {% function() { return { width: { val: 2.5, unit: 'in' },   height: { val: 2.5, unit: 'in' } } } %}
| "square"      {% function() { return { width: { val: 3.5, unit: 'in' },   height: { val: 3.5, unit: 'in' } } } %}
| "tarot"       {% function() { return { width: { val: 2.75, unit: 'in' },  height: { val: 4.75, unit: 'in' } } } %}

CardRender ->
  "yes"   {% function() { return true; } %}
| "no"    {% function() { return false; } %}

CardSide ->
  "front" {% id %}
| "back"  {% id %}

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
  [BUIS]:* {% joiner %}