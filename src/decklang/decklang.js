// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
 function nuller() { return null; } 
 function emptystring() { return ''; } 
 function joiner(d) { return d.join(''); } 
 function evalid(d) { return { eval: d[0] }; } 
 function evaljoiner(d) { return { eval: d.join('') }; } 
 var _ = require('lodash'); var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "border$string$1", "symbols": [{"literal":"b"}, {"literal":"o"}, {"literal":"r"}, {"literal":"d"}, {"literal":"e"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "border$ebnf$1$subexpression$1$ebnf$1$subexpression$1", "symbols": ["CssColor"]},
    {"name": "border$ebnf$1$subexpression$1$ebnf$1", "symbols": ["border$ebnf$1$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "border$ebnf$1$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "border$ebnf$1$subexpression$1", "symbols": ["_", {"literal":","}, "_", "border$ebnf$1$subexpression$1$ebnf$1"]},
    {"name": "border$ebnf$1", "symbols": ["border$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "border$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "border$ebnf$2$subexpression$1", "symbols": ["_", {"literal":","}, "_", "PositiveCssValue"]},
    {"name": "border$ebnf$2", "symbols": ["border$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "border$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "border", "symbols": ["border$string$1", "_", {"literal":"="}, "_", "BorderStyle", "border$ebnf$1", "border$ebnf$2"], "postprocess": 
        function(d) {
          return {
            call: d[0],
            style: d[4],
            color: d[5] && d[5][3] ? d[5][3][0] : '#000',
            width: d[6] ? d[6][3] : { val: 1, unit: 'px' }
          }
        }
        },
    {"name": "cardbackground$string$1", "symbols": [{"literal":"c"}, {"literal":"a"}, {"literal":"r"}, {"literal":"d"}, {"literal":"b"}, {"literal":"a"}, {"literal":"c"}, {"literal":"k"}, {"literal":"g"}, {"literal":"r"}, {"literal":"o"}, {"literal":"u"}, {"literal":"n"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "cardbackground", "symbols": ["cardbackground$string$1", "_", {"literal":"="}, "_", "CssColor"], "postprocess": 
        function(d) {
          return {
            call: d[0],
            color: d[4]
          }
        }
          },
    {"name": "cardbackground$string$2", "symbols": [{"literal":"c"}, {"literal":"a"}, {"literal":"r"}, {"literal":"d"}, {"literal":"b"}, {"literal":"a"}, {"literal":"c"}, {"literal":"k"}, {"literal":"g"}, {"literal":"r"}, {"literal":"o"}, {"literal":"u"}, {"literal":"n"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "cardbackground", "symbols": ["cardbackground$string$2", "_", {"literal":"="}, "_", "PositiveIntegerVariable", "_", {"literal":","}, "_", "CssColor"], "postprocess": 
        function(d) {
          return {
            call: d[0],
            index: d[4],
            color: d[8]
          }
        }
          },
    {"name": "cardmargins$string$1", "symbols": [{"literal":"c"}, {"literal":"a"}, {"literal":"r"}, {"literal":"d"}, {"literal":"m"}, {"literal":"a"}, {"literal":"r"}, {"literal":"g"}, {"literal":"i"}, {"literal":"n"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "cardmargins", "symbols": ["cardmargins$string$1", "_", {"literal":"="}, "_", "CssMargin"], "postprocess": 
        function(d) {
          return {
            call: d[0],
            top: d[4].top,
            left: d[4].left,
            right: d[4].right,
            bottom: d[4].bottom,
          }
        }
        },
    {"name": "cardrender$string$1", "symbols": [{"literal":"c"}, {"literal":"a"}, {"literal":"r"}, {"literal":"d"}, {"literal":"r"}, {"literal":"e"}, {"literal":"n"}, {"literal":"d"}, {"literal":"e"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "cardrender", "symbols": ["cardrender$string$1", "_", {"literal":"="}, "_", "CardRender"], "postprocess": 
        function(d) {
          return {
            call: d[0],
            render: d[4]
          }
        }
        },
    {"name": "cardside$string$1", "symbols": [{"literal":"c"}, {"literal":"a"}, {"literal":"r"}, {"literal":"d"}, {"literal":"s"}, {"literal":"i"}, {"literal":"d"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "cardside", "symbols": ["cardside$string$1", "_", {"literal":"="}, "_", "CardSide"], "postprocess": 
        function(d) {
          return {
            call: d[0],
            side: d[4]
          }
        }
        },
    {"name": "cardsize$string$1", "symbols": [{"literal":"c"}, {"literal":"a"}, {"literal":"r"}, {"literal":"d"}, {"literal":"s"}, {"literal":"i"}, {"literal":"z"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "cardsize", "symbols": ["cardsize$string$1", "_", {"literal":"="}, "_", "PositiveCssValue", "_", {"literal":","}, "_", "PositiveCssValue"], "postprocess": 
        function(d) {
          return {
            call: d[0],
            width: d[4],
            height: d[8]
          }
        }
        },
    {"name": "cardsize$string$2", "symbols": [{"literal":"c"}, {"literal":"a"}, {"literal":"r"}, {"literal":"d"}, {"literal":"s"}, {"literal":"i"}, {"literal":"z"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "cardsize", "symbols": ["cardsize$string$2", "_", {"literal":"="}, "_", "CardSize"], "postprocess": 
        function(d) {
          return {
            call: d[0],
            width: d[4].width,
            height: d[4].height
          }
        }
        },
    {"name": "cardsperpage$string$1", "symbols": [{"literal":"c"}, {"literal":"a"}, {"literal":"r"}, {"literal":"d"}, {"literal":"s"}, {"literal":"p"}, {"literal":"e"}, {"literal":"r"}, {"literal":"p"}, {"literal":"a"}, {"literal":"g"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "cardsperpage", "symbols": ["cardsperpage$string$1", "_", {"literal":"="}, "_", "PositiveInteger", "_", {"literal":","}, "_", "PositiveInteger"], "postprocess": 
        function(d) {
          return {
            call: d[0],
            cardsPerRow: d[4],
            rowsPerPage: d[8]
          }
        }
        },
    {"name": "ellipse$string$1", "symbols": [{"literal":"e"}, {"literal":"l"}, {"literal":"l"}, {"literal":"i"}, {"literal":"p"}, {"literal":"s"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ellipse$ebnf$1$subexpression$1$ebnf$1$subexpression$1", "symbols": ["PositiveCssValue"]},
    {"name": "ellipse$ebnf$1$subexpression$1$ebnf$1", "symbols": ["ellipse$ebnf$1$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "ellipse$ebnf$1$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ellipse$ebnf$1$subexpression$1", "symbols": ["_", {"literal":","}, "_", "ellipse$ebnf$1$subexpression$1$ebnf$1"]},
    {"name": "ellipse$ebnf$1", "symbols": ["ellipse$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "ellipse$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ellipse$ebnf$2$subexpression$1$ebnf$1$subexpression$1", "symbols": ["CssColor"]},
    {"name": "ellipse$ebnf$2$subexpression$1$ebnf$1", "symbols": ["ellipse$ebnf$2$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "ellipse$ebnf$2$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ellipse$ebnf$2$subexpression$1", "symbols": ["_", {"literal":","}, "_", "ellipse$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "ellipse$ebnf$2", "symbols": ["ellipse$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "ellipse$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ellipse$ebnf$3$subexpression$1$ebnf$1$subexpression$1", "symbols": ["CssColor"]},
    {"name": "ellipse$ebnf$3$subexpression$1$ebnf$1", "symbols": ["ellipse$ebnf$3$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "ellipse$ebnf$3$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ellipse$ebnf$3$subexpression$1", "symbols": ["_", {"literal":","}, "_", "ellipse$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "ellipse$ebnf$3", "symbols": ["ellipse$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "ellipse$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ellipse", "symbols": ["ellipse$string$1", "_", {"literal":"="}, "_", "PositiveIntegerVariable", "_", {"literal":","}, "_", "PositiveCssVariable", "_", {"literal":","}, "_", "PositiveCssVariable", "_", {"literal":","}, "_", "PositiveCssVariable", "_", {"literal":","}, "_", "PositiveCssVariable", "ellipse$ebnf$1", "ellipse$ebnf$2", "ellipse$ebnf$3"], "postprocess": 
        function(d) {
          return {
            call: d[0],
            index: d[4],
            x: d[8],
            y: d[12],
            w: d[16],
            h: d[20],
            thickness:  d[21] && d[21][3] ? d[21][3][0] : { val: 1, unit: 'px' },
            outerColor: d[22] && d[22][3] ? d[22][3][0] : '#000',
            innerColor: d[23] && d[23][3] ? d[23][3][0] : '#fff'
          }
        }
        },
    {"name": "font$string$1", "symbols": [{"literal":"f"}, {"literal":"o"}, {"literal":"n"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "font$ebnf$1$subexpression$1", "symbols": ["_", {"literal":","}, "_", "TextDecoration"]},
    {"name": "font$ebnf$1", "symbols": ["font$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "font$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "font$ebnf$2$subexpression$1", "symbols": ["_", {"literal":","}, "_", "CssColor"]},
    {"name": "font$ebnf$2", "symbols": ["font$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "font$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "font", "symbols": ["font$string$1", "_", {"literal":"="}, "_", "String", "_", {"literal":","}, "_", "PositiveCssValue", "font$ebnf$1", "font$ebnf$2"], "postprocess": 
        function(d) {
          return {
            call: d[0],
            family: d[4],
            css: d[8],
            decoration: d[9] ? d[9][3] : '',
            color: d[10] ? d[10][3] : '#000'
          }
        }
        },
    {"name": "image$string$1", "symbols": [{"literal":"i"}, {"literal":"m"}, {"literal":"a"}, {"literal":"g"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "image", "symbols": ["image$string$1", "_", {"literal":"="}, "_", "PositiveIntegerVariable", "_", {"literal":","}, "_", "String", "_", {"literal":","}, "_", "PositiveCssVariable", "_", {"literal":","}, "_", "PositiveCssVariable", "_", {"literal":","}, "_", "PositiveCssVariable", "_", {"literal":","}, "_", "PositiveCssVariable"], "postprocess": 
        function(d) {
          return {
            call: d[0],
            index: d[4],
            url: d[8],
            x: d[12],
            y: d[16],
            w: d[20],
            h: d[24]
          }
        }
        },
    {"name": "newcard$string$1", "symbols": [{"literal":"n"}, {"literal":"e"}, {"literal":"w"}, {"literal":"c"}, {"literal":"a"}, {"literal":"r"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "newcard", "symbols": ["newcard$string$1", "_", {"literal":"="}, "_", "String"], "postprocess": 
        function(d) {
          return {
            call: d[0],
            name: d[4]
          }
        }
        },
    {"name": "pagemargins$string$1", "symbols": [{"literal":"p"}, {"literal":"a"}, {"literal":"g"}, {"literal":"e"}, {"literal":"m"}, {"literal":"a"}, {"literal":"r"}, {"literal":"g"}, {"literal":"i"}, {"literal":"n"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "pagemargins", "symbols": ["pagemargins$string$1", "_", {"literal":"="}, "_", "CssMargin"], "postprocess": 
        function(d) {
          return {
            call: d[0],
            top: d[4].top,
            left: d[4].left,
            right: d[4].right,
            bottom: d[4].bottom,
          }
        }
        },
    {"name": "pagesize$string$1", "symbols": [{"literal":"p"}, {"literal":"a"}, {"literal":"g"}, {"literal":"e"}, {"literal":"s"}, {"literal":"i"}, {"literal":"z"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "pagesize", "symbols": ["pagesize$string$1", "_", {"literal":"="}, "_", "PositiveCssValue", "_", {"literal":","}, "_", "PositiveCssValue"], "postprocess": 
        function(d) {
          return {
            call: d[0],
            width: d[4],
            height: d[8]
          }
        }
        },
    {"name": "pagesize$string$2", "symbols": [{"literal":"p"}, {"literal":"a"}, {"literal":"g"}, {"literal":"e"}, {"literal":"s"}, {"literal":"i"}, {"literal":"z"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "pagesize", "symbols": ["pagesize$string$2", "_", {"literal":"="}, "_", "PaperSize"], "postprocess": 
        function(d) {
          return {
            call: d[0],
            width: d[4].width,
            height: d[4].height
          }
        }
        },
    {"name": "rect$string$1", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"c"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "rect$ebnf$1$subexpression$1$ebnf$1$subexpression$1", "symbols": ["PositiveCssValue"]},
    {"name": "rect$ebnf$1$subexpression$1$ebnf$1", "symbols": ["rect$ebnf$1$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "rect$ebnf$1$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "rect$ebnf$1$subexpression$1", "symbols": ["_", {"literal":","}, "_", "rect$ebnf$1$subexpression$1$ebnf$1"]},
    {"name": "rect$ebnf$1", "symbols": ["rect$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "rect$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "rect$ebnf$2$subexpression$1$ebnf$1$subexpression$1", "symbols": ["CssColor"]},
    {"name": "rect$ebnf$2$subexpression$1$ebnf$1", "symbols": ["rect$ebnf$2$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "rect$ebnf$2$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "rect$ebnf$2$subexpression$1", "symbols": ["_", {"literal":","}, "_", "rect$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "rect$ebnf$2", "symbols": ["rect$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "rect$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "rect$ebnf$3$subexpression$1$ebnf$1$subexpression$1", "symbols": ["CssColor"]},
    {"name": "rect$ebnf$3$subexpression$1$ebnf$1", "symbols": ["rect$ebnf$3$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "rect$ebnf$3$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "rect$ebnf$3$subexpression$1", "symbols": ["_", {"literal":","}, "_", "rect$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "rect$ebnf$3", "symbols": ["rect$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "rect$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "rect", "symbols": ["rect$string$1", "_", {"literal":"="}, "_", "PositiveIntegerVariable", "_", {"literal":","}, "_", "PositiveCssVariable", "_", {"literal":","}, "_", "PositiveCssVariable", "_", {"literal":","}, "_", "PositiveCssVariable", "_", {"literal":","}, "_", "PositiveCssVariable", "rect$ebnf$1", "rect$ebnf$2", "rect$ebnf$3"], "postprocess": 
        function(d) {
          return {
            call: d[0],
            index: d[4],
            x1: d[8],
            y1: d[12],
            x2: d[16],
            y2: d[20],
            thickness: d[21] && d[21][3] ? d[21][3][0] : { val: 1, unit: 'px' },
            lineColor: d[22] && d[22][3] ? d[22][3][0] : '#000',
            fillColor: d[23] && d[23][3] ? d[23][3][0] : '#000'
          }
        }
        },
    {"name": "text$string$1", "symbols": [{"literal":"t"}, {"literal":"e"}, {"literal":"x"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "text$ebnf$1$subexpression$1", "symbols": ["_", {"literal":","}, "_", "HorizontalAlignment"]},
    {"name": "text$ebnf$1", "symbols": ["text$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "text$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "text$ebnf$2$subexpression$1", "symbols": ["_", {"literal":","}, "_", "VerticalAlignment"]},
    {"name": "text$ebnf$2", "symbols": ["text$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "text$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "text", "symbols": ["text$string$1", "_", {"literal":"="}, "_", "PositiveIntegerVariable", "_", {"literal":","}, "_", "String", "_", {"literal":","}, "_", "PositiveCssVariable", "_", {"literal":","}, "_", "PositiveCssVariable", "_", {"literal":","}, "_", "PositiveCssVariable", "_", {"literal":","}, "_", "PositiveCssVariable", "text$ebnf$1", "text$ebnf$2"], "postprocess": 
        function(d) {
          return {
            call: d[0],
            index: d[4],
            string: d[8],
            x: d[12],
            y: d[16],
            w: d[20],
            h: d[24],
            horizAlign: d[25] ? d[25][3] : '',
            vertAlign:  d[26] ? d[26][3] : ''
          }
        }
        },
    {"name": "unit$string$1", "symbols": [{"literal":"u"}, {"literal":"n"}, {"literal":"i"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "unit", "symbols": ["unit$string$1", "_", {"literal":"="}, "_", "CssUnit"], "postprocess": 
        function(d) {
          return {
            call: d[0],
            unit: d[4]
          }
        }
        },
    {"name": "Directive", "symbols": ["border"]},
    {"name": "Directive", "symbols": ["cardbackground"]},
    {"name": "Directive", "symbols": ["cardmargins"]},
    {"name": "Directive", "symbols": ["cardrender"]},
    {"name": "Directive", "symbols": ["cardside"]},
    {"name": "Directive", "symbols": ["cardsize"]},
    {"name": "Directive", "symbols": ["cardsperpage"]},
    {"name": "Directive", "symbols": ["ellipse"]},
    {"name": "Directive", "symbols": ["font"]},
    {"name": "Directive", "symbols": ["image"]},
    {"name": "Directive", "symbols": ["newcard"]},
    {"name": "Directive", "symbols": ["pagemargins"]},
    {"name": "Directive", "symbols": ["pagesize"]},
    {"name": "Directive", "symbols": ["rect"]},
    {"name": "Directive", "symbols": ["text"]},
    {"name": "Directive", "symbols": ["unit"]},
    {"name": "Operand", "symbols": [{"literal":"*"}], "postprocess": id},
    {"name": "Operand", "symbols": [{"literal":"+"}], "postprocess": id},
    {"name": "Operand", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "Operand", "symbols": [{"literal":"/"}], "postprocess": id},
    {"name": "VariableIdentifier$ebnf$1", "symbols": []},
    {"name": "VariableIdentifier$ebnf$1", "symbols": ["VariableIdentifier$ebnf$1", /[\w]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "VariableIdentifier", "symbols": [/[a-zA-Z]/, "VariableIdentifier$ebnf$1"], "postprocess": 
        function(d) {
          return d[0] + (d[1].length ? d[1].join('') : '');
        }
        },
    {"name": "PVar", "symbols": [{"literal":"("}, "_", "VariableExpression", "_", {"literal":")"}]},
    {"name": "VariableAssignment", "symbols": ["VariableIdentifier", "_", {"literal":"="}, "_", "Integer"], "postprocess": 
        function(d) {
          return {
            varName: d[0],
            varStart: d[4]
          };
        }
        },
    {"name": "RecursiveVariableExpression$ebnf$1$subexpression$1", "symbols": [{"literal":")"}]},
    {"name": "RecursiveVariableExpression$ebnf$1", "symbols": ["RecursiveVariableExpression$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "RecursiveVariableExpression$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "RecursiveVariableExpression$ebnf$2$subexpression$1", "symbols": ["RecursiveVariableExpression"]},
    {"name": "RecursiveVariableExpression$ebnf$2", "symbols": ["RecursiveVariableExpression$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "RecursiveVariableExpression$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "RecursiveVariableExpression", "symbols": ["Operand", "_", "Integer", "_", "RecursiveVariableExpression$ebnf$1", "_", "RecursiveVariableExpression$ebnf$2", "_"], "postprocess": joiner},
    {"name": "RecursiveVariableExpression$ebnf$3$subexpression$1", "symbols": [{"literal":")"}]},
    {"name": "RecursiveVariableExpression$ebnf$3", "symbols": ["RecursiveVariableExpression$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "RecursiveVariableExpression$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "RecursiveVariableExpression$ebnf$4$subexpression$1", "symbols": ["RecursiveVariableExpression"]},
    {"name": "RecursiveVariableExpression$ebnf$4", "symbols": ["RecursiveVariableExpression$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "RecursiveVariableExpression$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "RecursiveVariableExpression", "symbols": ["Operand", "_", "VariableIdentifier", "_", "RecursiveVariableExpression$ebnf$3", "_", "RecursiveVariableExpression$ebnf$4", "_"], "postprocess": joiner},
    {"name": "RecursiveVariableExpression$ebnf$5$subexpression$1", "symbols": [{"literal":"("}]},
    {"name": "RecursiveVariableExpression$ebnf$5", "symbols": ["RecursiveVariableExpression$ebnf$5$subexpression$1"], "postprocess": id},
    {"name": "RecursiveVariableExpression$ebnf$5", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "RecursiveVariableExpression", "symbols": ["Operand", "_", "RecursiveVariableExpression$ebnf$5", "_", "Integer", "_", "RecursiveVariableExpression"], "postprocess": joiner},
    {"name": "RecursiveVariableExpression$ebnf$6$subexpression$1", "symbols": [{"literal":"("}]},
    {"name": "RecursiveVariableExpression$ebnf$6", "symbols": ["RecursiveVariableExpression$ebnf$6$subexpression$1"], "postprocess": id},
    {"name": "RecursiveVariableExpression$ebnf$6", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "RecursiveVariableExpression", "symbols": ["Operand", "_", "RecursiveVariableExpression$ebnf$6", "_", "VariableIdentifier", "_", "RecursiveVariableExpression"], "postprocess": joiner},
    {"name": "VariableExpression", "symbols": ["VariableIdentifier"], "postprocess": evalid},
    {"name": "VariableExpression", "symbols": ["VariableIdentifier", "_", "RecursiveVariableExpression"], "postprocess": evaljoiner},
    {"name": "VariableExpression", "symbols": ["Integer", "_", "RecursiveVariableExpression"], "postprocess": evaljoiner},
    {"name": "Variable", "symbols": [{"literal":"<"}, "_", "VariableExpression", "_", {"literal":">"}], "postprocess": function(d) { return d[2]; }},
    {"name": "NonExpressiveVariable", "symbols": ["String"], "postprocess": id},
    {"name": "NonExpressiveVariable", "symbols": [{"literal":"<"}, "_", "VariableIdentifier", "_", {"literal":">"}], "postprocess": function(d) { return { eval: d[2] }; }},
    {"name": "NonExpressiveResource$string$1", "symbols": [{"literal":"<"}, {"literal":"<"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "NonExpressiveResource$string$2", "symbols": [{"literal":">"}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "NonExpressiveResource", "symbols": ["NonExpressiveResource$string$1", "_", "VariableIdentifier", "_", "NonExpressiveResource$string$2"], "postprocess": function(d) { return d[2]; }},
    {"name": "CheckOperand", "symbols": ["Variable"], "postprocess": id},
    {"name": "CheckOperand", "symbols": ["Integer"], "postprocess": id},
    {"name": "CheckOperand", "symbols": ["String"], "postprocess": id},
    {"name": "CheckOperator", "symbols": [{"literal":">"}], "postprocess": id},
    {"name": "CheckOperator$string$1", "symbols": [{"literal":">"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CheckOperator", "symbols": ["CheckOperator$string$1"], "postprocess": id},
    {"name": "CheckOperator$string$2", "symbols": [{"literal":"="}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CheckOperator", "symbols": ["CheckOperator$string$2"], "postprocess": id},
    {"name": "CheckOperator$string$3", "symbols": [{"literal":"!"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CheckOperator", "symbols": ["CheckOperator$string$3"], "postprocess": id},
    {"name": "CheckOperator$string$4", "symbols": [{"literal":"<"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CheckOperator", "symbols": ["CheckOperator$string$4"], "postprocess": id},
    {"name": "CheckOperator", "symbols": [{"literal":"<"}], "postprocess": id},
    {"name": "Check", "symbols": ["CheckStart", "CheckBody"], "postprocess": function(d) { return { checkStart: d[0], ops: _.compact(_.flatten(d[1])) }; }},
    {"name": "CheckStart$string$1", "symbols": [{"literal":"c"}, {"literal":"h"}, {"literal":"e"}, {"literal":"c"}, {"literal":"k"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CheckStart", "symbols": ["CheckStart$string$1", "_", {"literal":"="}, "_", "CheckOperand", "__", "CheckOperator", "__", "CheckOperand", "_"], "postprocess": 
        function(d) {
          return {
            left: d[4],
            operator: d[6],
            right: d[8]
          };
        }
        },
    {"name": "CheckEnd$string$1", "symbols": [{"literal":"e"}, {"literal":"n"}, {"literal":"d"}, {"literal":"c"}, {"literal":"h"}, {"literal":"e"}, {"literal":"c"}, {"literal":"k"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CheckEnd", "symbols": ["CheckEnd$string$1"], "postprocess": nuller},
    {"name": "CheckBody", "symbols": ["CheckEnd"], "postprocess": joiner},
    {"name": "CheckBody", "symbols": ["LineOfCode", "_", "CheckBody"], "postprocess": function(d) { return d[0].concat(d[2]) }},
    {"name": "Loop", "symbols": ["LoopStart", "LoopBody"], "postprocess": function(d) { return { loopStart: d[0], ops: _.compact(_.flatten(d[1])) }; }},
    {"name": "LoopStart$string$1", "symbols": [{"literal":"l"}, {"literal":"o"}, {"literal":"o"}, {"literal":"p"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "LoopStart$string$2", "symbols": [{"literal":"t"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "LoopStart", "symbols": ["LoopStart$string$1", "_", {"literal":"="}, "_", {"literal":"<"}, "_", "VariableAssignment", "_", {"literal":">"}, "__", "LoopStart$string$2", "__", "LoopToGoal", "_"], "postprocess": 
        function(d) {
          return {
            start: d[6],
            end: d[12][0]
          };
        }
        },
    {"name": "LoopStart$string$3", "symbols": [{"literal":"l"}, {"literal":"o"}, {"literal":"o"}, {"literal":"p"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "LoopStart$string$4", "symbols": [{"literal":"i"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "LoopStart", "symbols": ["LoopStart$string$3", "_", {"literal":"="}, "_", {"literal":"<"}, "_", "VariableIdentifier", "_", {"literal":">"}, "__", "LoopStart$string$4", "__", "LoopInGoal", "_"], "postprocess": 
        function(d) {
          return {
            start: { varName: d[6] },
            iterations: d[12]
          };
        }
        },
    {"name": "LoopStart$string$5", "symbols": [{"literal":"l"}, {"literal":"o"}, {"literal":"o"}, {"literal":"p"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "LoopStart$string$6", "symbols": [{"literal":"i"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "LoopStart", "symbols": ["LoopStart$string$5", "_", {"literal":"="}, "_", {"literal":"<"}, "_", "VariableIdentifier", "_", {"literal":">"}, "__", "LoopStart$string$6", "__", "NonExpressiveResource", "_", {"literal":":"}, "_", "NonExpressiveVariable", "_"], "postprocess": 
        function(d) {
          return {
            start: { varName: d[6], resourceId: d[12], sheet: d[16] }
          };
        }
        },
    {"name": "LoopEnd$string$1", "symbols": [{"literal":"e"}, {"literal":"n"}, {"literal":"d"}, {"literal":"l"}, {"literal":"o"}, {"literal":"o"}, {"literal":"p"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "LoopEnd", "symbols": ["LoopEnd$string$1"], "postprocess": nuller},
    {"name": "LoopBody", "symbols": ["LoopEnd"], "postprocess": joiner},
    {"name": "LoopBody", "symbols": ["LineOfCode", "_", "LoopBody"], "postprocess": function(d) { return d[0].concat(d[2]) }},
    {"name": "LoopInGoalVariableSet", "symbols": ["LoopInGoalVariable"], "postprocess": function(d) { return _.flatten([d]); }},
    {"name": "LoopInGoalVariableSet", "symbols": ["LoopInGoalVariableSet", "_", {"literal":","}, "_", "LoopInGoalVariable"], "postprocess": function(d) { return _.compact(_.flatten([d[0], d[4]])); }},
    {"name": "LoopInGoalVariableHash", "symbols": ["Integer"], "postprocess": id},
    {"name": "LoopInGoalVariableHash", "symbols": ["String"], "postprocess": id},
    {"name": "LoopInGoalVariable$ebnf$1$subexpression$1", "symbols": ["_", {"literal":":"}, "_", "LoopInGoalVariableHash"]},
    {"name": "LoopInGoalVariable$ebnf$1", "symbols": ["LoopInGoalVariable$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "LoopInGoalVariable$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "LoopInGoalVariable", "symbols": ["Integer", "LoopInGoalVariable$ebnf$1"], "postprocess": function(d) { return { key: d[0], val: d[1] ? d[1][3] : null }; }},
    {"name": "LoopInGoalVariable$ebnf$2$subexpression$1", "symbols": ["_", {"literal":":"}, "_", "LoopInGoalVariableHash"]},
    {"name": "LoopInGoalVariable$ebnf$2", "symbols": ["LoopInGoalVariable$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "LoopInGoalVariable$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "LoopInGoalVariable", "symbols": ["String", "LoopInGoalVariable$ebnf$2"], "postprocess": function(d) { return { key: d[0], val: d[1] ? d[1][3] : null }; }},
    {"name": "LoopInGoal", "symbols": [{"literal":"{"}, "_", "LoopInGoalVariableSet", "_", {"literal":"}"}], "postprocess": function(d) { return d[2]; }},
    {"name": "LoopToGoal", "symbols": ["PositiveInteger"]},
    {"name": "LoopToGoal", "symbols": ["Variable"]},
    {"name": "CssColor", "symbols": [{"literal":"#"}, "hexdigit", "hexdigit", "hexdigit", "hexdigit", "hexdigit", "hexdigit"], "postprocess": joiner},
    {"name": "CssColor", "symbols": [{"literal":"#"}, "hexdigit", "hexdigit", "hexdigit"], "postprocess": joiner},
    {"name": "CssColor", "symbols": ["dqstring"], "postprocess": joiner},
    {"name": "CssColor", "symbols": ["rgbcolor"], "postprocess": joiner},
    {"name": "PositiveCssValue$ebnf$1$subexpression$1", "symbols": ["CssUnit"]},
    {"name": "PositiveCssValue$ebnf$1", "symbols": ["PositiveCssValue$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "PositiveCssValue$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "PositiveCssValue", "symbols": ["PositiveDecimal", "PositiveCssValue$ebnf$1"], "postprocess": function(d) { return { val: d[0], unit: d[1] ? d[1][0] : undefined }; }},
    {"name": "PositiveCssVariable$ebnf$1$subexpression$1", "symbols": ["CssUnit"]},
    {"name": "PositiveCssVariable$ebnf$1", "symbols": ["PositiveCssVariable$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "PositiveCssVariable$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "PositiveCssVariable", "symbols": ["PositiveDecimal", "PositiveCssVariable$ebnf$1"], "postprocess": function(d) { return { val: d[0], unit: d[1] ? d[1][0] : undefined }; }},
    {"name": "PositiveCssVariable$ebnf$2$subexpression$1", "symbols": ["CssUnit"]},
    {"name": "PositiveCssVariable$ebnf$2", "symbols": ["PositiveCssVariable$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "PositiveCssVariable$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "PositiveCssVariable", "symbols": ["Variable", "PositiveCssVariable$ebnf$2"], "postprocess": function(d) { return { val: d[0], unit: d[1] ? d[1][0] : undefined }; }},
    {"name": "CssMargin", "symbols": ["PositiveCssValue"], "postprocess": function(d) { return { left: d[0], right: d[0], top: d[0], bottom: d[0] }; }},
    {"name": "CssMargin", "symbols": ["PositiveCssValue", "_", {"literal":","}, "_", "PositiveCssValue", "_", {"literal":","}, "_", "PositiveCssValue", "_", {"literal":","}, "_", "PositiveCssValue"], "postprocess": function(d) { return { left: d[0], right: d[4], top: d[8], bottom: d[12] }; }},
    {"name": "PaperSize$string$1", "symbols": [{"literal":"a"}, {"literal":"4"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "PaperSize", "symbols": ["PaperSize$string$1"], "postprocess": function() { return { width: { val: 8.3, unit: 'in' }, height: { val: 11.7, unit: 'in' } } }},
    {"name": "PaperSize$string$2", "symbols": [{"literal":"l"}, {"literal":"e"}, {"literal":"g"}, {"literal":"a"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "PaperSize", "symbols": ["PaperSize$string$2"], "postprocess": function() { return { width: { val: 8.5, unit: 'in' }, height: { val: 14, unit: 'in' } } }},
    {"name": "PaperSize$string$3", "symbols": [{"literal":"l"}, {"literal":"e"}, {"literal":"t"}, {"literal":"t"}, {"literal":"e"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "PaperSize", "symbols": ["PaperSize$string$3"], "postprocess": function() { return { width: { val: 8.5, unit: 'in' }, height: { val: 11, unit: 'in' } } }},
    {"name": "CardSize$string$1", "symbols": [{"literal":"b"}, {"literal":"r"}, {"literal":"i"}, {"literal":"d"}, {"literal":"g"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CardSize", "symbols": ["CardSize$string$1"], "postprocess": function() { return { width: { val: 2.25, unit: 'in' },  height: { val: 3.5, unit: 'in' } } }},
    {"name": "CardSize$string$2", "symbols": [{"literal":"b"}, {"literal":"u"}, {"literal":"s"}, {"literal":"i"}, {"literal":"n"}, {"literal":"e"}, {"literal":"s"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CardSize", "symbols": ["CardSize$string$2"], "postprocess": function() { return { width: { val: 2.0, unit: 'in' },   height: { val: 3.5, unit: 'in' } } }},
    {"name": "CardSize$string$3", "symbols": [{"literal":"d"}, {"literal":"o"}, {"literal":"m"}, {"literal":"i"}, {"literal":"n"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CardSize", "symbols": ["CardSize$string$3"], "postprocess": function() { return { width: { val: 1.75, unit: 'in' },  height: { val: 3.5, unit: 'in' } } }},
    {"name": "CardSize$string$4", "symbols": [{"literal":"j"}, {"literal":"u"}, {"literal":"m"}, {"literal":"b"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CardSize", "symbols": ["CardSize$string$4"], "postprocess": function() { return { width: { val: 3.5, unit: 'in' },   height: { val: 5.5, unit: 'in' } } }},
    {"name": "CardSize$string$5", "symbols": [{"literal":"m"}, {"literal":"i"}, {"literal":"c"}, {"literal":"r"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CardSize", "symbols": ["CardSize$string$5"], "postprocess": function() { return { width: { val: 1.25, unit: 'in' },  height: { val: 1.75, unit: 'in' } } }},
    {"name": "CardSize$string$6", "symbols": [{"literal":"m"}, {"literal":"i"}, {"literal":"n"}, {"literal":"i"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CardSize", "symbols": ["CardSize$string$6"], "postprocess": function() { return { width: { val: 1.75, unit: 'in' },  height: { val: 2.5, unit: 'in' } } }},
    {"name": "CardSize$string$7", "symbols": [{"literal":"p"}, {"literal":"o"}, {"literal":"k"}, {"literal":"e"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CardSize", "symbols": ["CardSize$string$7"], "postprocess": function() { return { width: { val: 2.5, unit: 'in' },   height: { val: 3.5, unit: 'in' } } }},
    {"name": "CardSize$string$8", "symbols": [{"literal":"s"}, {"literal":"m"}, {"literal":"a"}, {"literal":"l"}, {"literal":"l"}, {"literal":"s"}, {"literal":"q"}, {"literal":"u"}, {"literal":"a"}, {"literal":"r"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CardSize", "symbols": ["CardSize$string$8"], "postprocess": function() { return { width: { val: 2.5, unit: 'in' },   height: { val: 2.5, unit: 'in' } } }},
    {"name": "CardSize$string$9", "symbols": [{"literal":"s"}, {"literal":"q"}, {"literal":"u"}, {"literal":"a"}, {"literal":"r"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CardSize", "symbols": ["CardSize$string$9"], "postprocess": function() { return { width: { val: 3.5, unit: 'in' },   height: { val: 3.5, unit: 'in' } } }},
    {"name": "CardSize$string$10", "symbols": [{"literal":"t"}, {"literal":"a"}, {"literal":"r"}, {"literal":"o"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CardSize", "symbols": ["CardSize$string$10"], "postprocess": function() { return { width: { val: 2.75, unit: 'in' },  height: { val: 4.75, unit: 'in' } } }},
    {"name": "CardRender$string$1", "symbols": [{"literal":"y"}, {"literal":"e"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CardRender", "symbols": ["CardRender$string$1"], "postprocess": function() { return true; }},
    {"name": "CardRender$string$2", "symbols": [{"literal":"n"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CardRender", "symbols": ["CardRender$string$2"], "postprocess": function() { return false; }},
    {"name": "CardSide$string$1", "symbols": [{"literal":"f"}, {"literal":"r"}, {"literal":"o"}, {"literal":"n"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CardSide", "symbols": ["CardSide$string$1"], "postprocess": id},
    {"name": "CardSide$string$2", "symbols": [{"literal":"b"}, {"literal":"a"}, {"literal":"c"}, {"literal":"k"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CardSide", "symbols": ["CardSide$string$2"], "postprocess": id},
    {"name": "CssUnit$string$1", "symbols": [{"literal":"e"}, {"literal":"m"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CssUnit", "symbols": ["CssUnit$string$1"], "postprocess": id},
    {"name": "CssUnit$string$2", "symbols": [{"literal":"e"}, {"literal":"x"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CssUnit", "symbols": ["CssUnit$string$2"], "postprocess": id},
    {"name": "CssUnit$string$3", "symbols": [{"literal":"c"}, {"literal":"h"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CssUnit", "symbols": ["CssUnit$string$3"], "postprocess": id},
    {"name": "CssUnit$string$4", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"m"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CssUnit", "symbols": ["CssUnit$string$4"], "postprocess": id},
    {"name": "CssUnit$string$5", "symbols": [{"literal":"v"}, {"literal":"h"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CssUnit", "symbols": ["CssUnit$string$5"], "postprocess": id},
    {"name": "CssUnit$string$6", "symbols": [{"literal":"v"}, {"literal":"w"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CssUnit", "symbols": ["CssUnit$string$6"], "postprocess": id},
    {"name": "CssUnit$string$7", "symbols": [{"literal":"v"}, {"literal":"m"}, {"literal":"i"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CssUnit", "symbols": ["CssUnit$string$7"], "postprocess": id},
    {"name": "CssUnit$string$8", "symbols": [{"literal":"v"}, {"literal":"m"}, {"literal":"a"}, {"literal":"x"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CssUnit", "symbols": ["CssUnit$string$8"], "postprocess": id},
    {"name": "CssUnit$string$9", "symbols": [{"literal":"p"}, {"literal":"x"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CssUnit", "symbols": ["CssUnit$string$9"], "postprocess": id},
    {"name": "CssUnit$string$10", "symbols": [{"literal":"m"}, {"literal":"m"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CssUnit", "symbols": ["CssUnit$string$10"], "postprocess": id},
    {"name": "CssUnit$string$11", "symbols": [{"literal":"c"}, {"literal":"m"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CssUnit", "symbols": ["CssUnit$string$11"], "postprocess": id},
    {"name": "CssUnit$string$12", "symbols": [{"literal":"i"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CssUnit", "symbols": ["CssUnit$string$12"], "postprocess": id},
    {"name": "CssUnit$string$13", "symbols": [{"literal":"p"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CssUnit", "symbols": ["CssUnit$string$13"], "postprocess": id},
    {"name": "CssUnit$string$14", "symbols": [{"literal":"p"}, {"literal":"c"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CssUnit", "symbols": ["CssUnit$string$14"], "postprocess": id},
    {"name": "BorderStyle$string$1", "symbols": [{"literal":"d"}, {"literal":"o"}, {"literal":"t"}, {"literal":"t"}, {"literal":"e"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BorderStyle", "symbols": ["BorderStyle$string$1"], "postprocess": id},
    {"name": "BorderStyle$string$2", "symbols": [{"literal":"d"}, {"literal":"a"}, {"literal":"s"}, {"literal":"h"}, {"literal":"e"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BorderStyle", "symbols": ["BorderStyle$string$2"], "postprocess": id},
    {"name": "BorderStyle$string$3", "symbols": [{"literal":"s"}, {"literal":"o"}, {"literal":"l"}, {"literal":"i"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BorderStyle", "symbols": ["BorderStyle$string$3"], "postprocess": id},
    {"name": "BorderStyle$string$4", "symbols": [{"literal":"d"}, {"literal":"o"}, {"literal":"u"}, {"literal":"b"}, {"literal":"l"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BorderStyle", "symbols": ["BorderStyle$string$4"], "postprocess": id},
    {"name": "BorderStyle$string$5", "symbols": [{"literal":"g"}, {"literal":"r"}, {"literal":"o"}, {"literal":"o"}, {"literal":"v"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BorderStyle", "symbols": ["BorderStyle$string$5"], "postprocess": id},
    {"name": "BorderStyle$string$6", "symbols": [{"literal":"r"}, {"literal":"i"}, {"literal":"d"}, {"literal":"g"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BorderStyle", "symbols": ["BorderStyle$string$6"], "postprocess": id},
    {"name": "BorderStyle$string$7", "symbols": [{"literal":"i"}, {"literal":"n"}, {"literal":"s"}, {"literal":"e"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BorderStyle", "symbols": ["BorderStyle$string$7"], "postprocess": id},
    {"name": "BorderStyle$string$8", "symbols": [{"literal":"o"}, {"literal":"u"}, {"literal":"t"}, {"literal":"s"}, {"literal":"e"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BorderStyle", "symbols": ["BorderStyle$string$8"], "postprocess": id},
    {"name": "HorizontalAlignment", "symbols": [], "postprocess": emptystring},
    {"name": "HorizontalAlignment$string$1", "symbols": [{"literal":"l"}, {"literal":"e"}, {"literal":"f"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "HorizontalAlignment", "symbols": ["HorizontalAlignment$string$1"], "postprocess": id},
    {"name": "HorizontalAlignment$string$2", "symbols": [{"literal":"r"}, {"literal":"i"}, {"literal":"g"}, {"literal":"h"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "HorizontalAlignment", "symbols": ["HorizontalAlignment$string$2"], "postprocess": id},
    {"name": "HorizontalAlignment$string$3", "symbols": [{"literal":"c"}, {"literal":"e"}, {"literal":"n"}, {"literal":"t"}, {"literal":"e"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "HorizontalAlignment", "symbols": ["HorizontalAlignment$string$3"], "postprocess": id},
    {"name": "VerticalAlignment", "symbols": [], "postprocess": emptystring},
    {"name": "VerticalAlignment$string$1", "symbols": [{"literal":"t"}, {"literal":"o"}, {"literal":"p"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "VerticalAlignment", "symbols": ["VerticalAlignment$string$1"], "postprocess": id},
    {"name": "VerticalAlignment$string$2", "symbols": [{"literal":"b"}, {"literal":"o"}, {"literal":"t"}, {"literal":"t"}, {"literal":"o"}, {"literal":"m"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "VerticalAlignment", "symbols": ["VerticalAlignment$string$2"], "postprocess": id},
    {"name": "VerticalAlignment$string$3", "symbols": [{"literal":"m"}, {"literal":"i"}, {"literal":"d"}, {"literal":"d"}, {"literal":"l"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "VerticalAlignment", "symbols": ["VerticalAlignment$string$3"], "postprocess": id},
    {"name": "TextDecoration$ebnf$1", "symbols": []},
    {"name": "TextDecoration$ebnf$1", "symbols": ["TextDecoration$ebnf$1", /[BUIS]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "TextDecoration", "symbols": ["TextDecoration$ebnf$1"], "postprocess": joiner},
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_int$ebnf$1", "symbols": ["unsigned_int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_int", "symbols": ["unsigned_int$ebnf$1"], "postprocess": 
        function(d) {
            return parseInt(d[0].join(""));
        }
        },
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "int$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$2", "symbols": ["int$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1", "int$ebnf$2"], "postprocess": 
        function(d) {
            if (d[0]) {
                return parseInt(d[0][0]+d[1].join(""));
            } else {
                return parseInt(d[1].join(""));
            }
        }
        },
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$1", "symbols": ["unsigned_decimal$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "unsigned_decimal$ebnf$2", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "unsigned_decimal$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "unsigned_decimal", "symbols": ["unsigned_decimal$ebnf$1", "unsigned_decimal$ebnf$2"], "postprocess": 
        function(d) {
            return parseFloat(
                d[0].join("") +
                (d[1] ? "."+d[1][1].join("") : "")
            );
        }
        },
    {"name": "decimal$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "decimal$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$2", "symbols": ["decimal$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": ["decimal$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "decimal$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "decimal$ebnf$3", "symbols": ["decimal$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "decimal$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal", "symbols": ["decimal$ebnf$1", "decimal$ebnf$2", "decimal$ebnf$3"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "")
            );
        }
        },
    {"name": "percentage", "symbols": ["decimal", {"literal":"%"}], "postprocess": 
        function(d) {
            return d[0]/100;
        }
        },
    {"name": "jsonfloat$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "jsonfloat$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$2", "symbols": ["jsonfloat$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": ["jsonfloat$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "jsonfloat$ebnf$3", "symbols": ["jsonfloat$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": ["jsonfloat$ebnf$4$subexpression$1$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$4$subexpression$1", "symbols": [/[eE]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "jsonfloat$ebnf$4$subexpression$1$ebnf$2"]},
    {"name": "jsonfloat$ebnf$4", "symbols": ["jsonfloat$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat", "symbols": ["jsonfloat$ebnf$1", "jsonfloat$ebnf$2", "jsonfloat$ebnf$3", "jsonfloat$ebnf$4"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "") +
                (d[3] ? "e" + (d[3][1] || "+") + d[3][2].join("") : "")
            );
        }
        },
    {"name": "dqstring$ebnf$1", "symbols": []},
    {"name": "dqstring$ebnf$1", "symbols": ["dqstring$ebnf$1", "dstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "dqstring", "symbols": [{"literal":"\""}, "dqstring$ebnf$1", {"literal":"\""}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "sqstring$ebnf$1", "symbols": []},
    {"name": "sqstring$ebnf$1", "symbols": ["sqstring$ebnf$1", "sstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "sqstring", "symbols": [{"literal":"'"}, "sqstring$ebnf$1", {"literal":"'"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "btstring$ebnf$1", "symbols": []},
    {"name": "btstring$ebnf$1", "symbols": ["btstring$ebnf$1", /[^`]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "btstring", "symbols": [{"literal":"`"}, "btstring$ebnf$1", {"literal":"`"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "dstrchar", "symbols": [/[^\\"\n]/], "postprocess": id},
    {"name": "dstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": 
        function(d) {
            return JSON.parse("\""+d.join("")+"\"");
        }
        },
    {"name": "sstrchar", "symbols": [/[^\\'\n]/], "postprocess": id},
    {"name": "sstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": function(d) { return JSON.parse("\""+d.join("")+"\""); }},
    {"name": "sstrchar$string$1", "symbols": [{"literal":"\\"}, {"literal":"'"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "sstrchar", "symbols": ["sstrchar$string$1"], "postprocess": function(d) {return "'"; }},
    {"name": "strescape", "symbols": [/["\\\/bfnrt]/], "postprocess": id},
    {"name": "strescape", "symbols": [{"literal":"u"}, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/], "postprocess": 
        function(d) {
            return d.join("");
        }
        },
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\s\n\t]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": nuller},
    {"name": "__$ebnf$1", "symbols": [/[\s\n\t]/]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", /[\s\n\t]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": nuller},
    {"name": "hexdigit", "symbols": [/[a-fA-F0-9]/]},
    {"name": "rgbcolor$string$1", "symbols": [{"literal":"r"}, {"literal":"g"}, {"literal":"b"}, {"literal":"("}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "rgbcolor", "symbols": ["rgbcolor$string$1", "_", "PositiveIntegerVariable", "_", {"literal":","}, "_", "PositiveIntegerVariable", "_", {"literal":","}, "_", "PositiveIntegerVariable", "_", {"literal":")"}], "postprocess": joiner},
    {"name": "rgbcolor$string$2", "symbols": [{"literal":"r"}, {"literal":"g"}, {"literal":"b"}, {"literal":"a"}, {"literal":"("}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "rgbcolor", "symbols": ["rgbcolor$string$2", "_", "PositiveIntegerVariable", "_", {"literal":","}, "_", "PositiveIntegerVariable", "_", {"literal":","}, "_", "PositiveIntegerVariable", "_", {"literal":","}, "_", "PositiveDecimalVariable", "_", {"literal":")"}], "postprocess": joiner},
    {"name": "String", "symbols": ["dqstring"], "postprocess": id},
    {"name": "PositiveInteger", "symbols": ["unsigned_int"], "postprocess": id},
    {"name": "Integer", "symbols": ["int"], "postprocess": id},
    {"name": "PositiveDecimal", "symbols": ["unsigned_decimal"], "postprocess": id},
    {"name": "Decimal", "symbols": ["decimal"], "postprocess": id},
    {"name": "PositiveIntegerVariable", "symbols": ["PositiveInteger"], "postprocess": id},
    {"name": "PositiveIntegerVariable", "symbols": ["Variable"], "postprocess": id},
    {"name": "IntegerVariable", "symbols": ["Integer"], "postprocess": id},
    {"name": "IntegerVariable", "symbols": ["Variable"], "postprocess": id},
    {"name": "PositiveDecimalVariable", "symbols": ["PositiveDecimal"], "postprocess": id},
    {"name": "PositiveDecimalVariable", "symbols": ["Variable"], "postprocess": id},
    {"name": "DecimalVariable", "symbols": ["Decimal"], "postprocess": id},
    {"name": "DecimalVariable", "symbols": ["Variable"], "postprocess": id},
    {"name": "main", "symbols": ["Program"]},
    {"name": "Program$ebnf$1", "symbols": []},
    {"name": "Program$ebnf$1$subexpression$1", "symbols": ["LineOfCode", "_"]},
    {"name": "Program$ebnf$1", "symbols": ["Program$ebnf$1", "Program$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Program", "symbols": ["_", "Program$ebnf$1"]},
    {"name": "LineOfCode", "symbols": ["Loop"]},
    {"name": "LineOfCode", "symbols": ["Check"]},
    {"name": "LineOfCode", "symbols": ["Directive"]}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
