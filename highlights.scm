[
  "let"
  "in"
  "if"
  "then"
  "else"
  "new"
  "method"
  "requires"
] @keyword

["=" "+" "-" "*" "/" "$"] @operator
["\\" "," ";" ":" "->"] @punctuation.delimiter

["{" "}" "(" ")"] @punctuation.bracket

(comment) @comment
(number) @constant.numeric
(string) @string
(ident) @variable
(function) @function
(type) @type
