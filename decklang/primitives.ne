@builtin "number.ne"
@builtin "string.ne"

# commonly used helper functions
@{% function nuller() { return null; } %}
@{% function emptystring() { return ''; } %}
@{% function joiner(d) { return d.join(''); } %}

# whitespace
_ ->
  [\s\n\t]:* {% nuller %}

# used by css
hexdigit ->
  [a-fA-F0-9]

# used by many text directives
TextDecoration ->
  null
| [BUI]:* {% joiner %}

# primitive types
String          -> dqstring {% id %}
PositiveInteger -> posint   {% id %}
Integer         -> int      {% id %}
Decimal         -> decimal  {% id %}

# primitive types that support a variable being in them, or being null
StringVariable ->
  null
| String

PositiveIntegerVariable ->
  null
| PositiveInteger

IntegerVariable ->
  null
| Integer

DecimalVariable ->
  null
| Decimal