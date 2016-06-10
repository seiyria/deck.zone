@builtin "number.ne"
@builtin "string.ne"

# commonly used helper functions
@{% function nuller() { return null; } %}
@{% function emptystring() { return ''; } %}
@{% function joiner(d) { return d.join(''); } %}

@{% function evalid(d) { return { eval: d[0] }; } %}
@{% function evaljoiner(d) { return { eval: d.join('') }; } %}

@{% var _ = require('lodash'); %}

# whitespace
_ ->
  [\s\n\t]:* {% nuller %}

# required whitespace
__ ->
  [\s\n\t]:+ {% nuller %}

# used by css
hexdigit ->
  [a-fA-F0-9]

# primitive types
String          -> dqstring         {% id %}
PositiveInteger -> unsigned_int     {% id %}
Integer         -> int              {% id %}
PositiveDecimal -> unsigned_decimal {% id %}
Decimal         -> decimal          {% id %}

# primitive types that support a variable being in them, or being null
PositiveIntegerVariable ->
  PositiveInteger   {% id %}
| Variable          {% id %}

IntegerVariable ->
  Integer       {% id %}
| Variable      {% id %}

PositiveDecimalVariable ->
  PositiveDecimal   {% id %}
| Variable          {% id %}

DecimalVariable ->
  Decimal       {% id %}
| Variable      {% id %}