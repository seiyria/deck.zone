@include "primitives.ne"
@include "plugins/text.ne"
@include "plugins/font.ne"

line_of_code ->
  text
| font

main -> _ (line_of_code _):*