
@include "plugins/text.ne"
@include "plugins/font.ne"
@include "primitives_advanced.ne"
@include "primitives.ne"

main -> _ (line_of_code _):*

line_of_code ->
  text
| font