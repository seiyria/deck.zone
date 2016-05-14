@include "primitives.ne"
@include "plugins/text.ne"
@include "plugins/font.ne"

main -> _ (line_of_code _):*

line_of_code ->
  text
| font