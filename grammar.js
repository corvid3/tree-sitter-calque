/**
 * @file syntax highlighting tree-sitter for calque
 * @author crow
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "calque",
  extras: ($) => [$.comment, /\s/],

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => repeat($.toplevel),
    toplevel: $ => choice($.decl, $.expression),

    let_tok: $ => token('let'),
    decl: $ => seq($.let_tok, $.ident, '=', $.expression),

    expression: $ => seq($.application, /.*\./),

    application: $ => prec(1, choice(
      $.factor,
      $.concatenation,
      seq($.application, /\ +/, $.factor),
    )),

    concatenation: $ => prec(2, choice(
      seq($.concatenation, alias(',', $.operator), $.factor),
      $.factor,
    )),
    factor: $ => prec(3, choice($.number, $.ident, $.string)),

    number: $ => /\d+/,
    ident: $ => /\w/,
    string: $ => /\".*\"/,

    comment: ($) => token(/#.*/),
  }
});
