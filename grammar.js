/**
 * @file syntax highlighting tree-sitter for calque
 * @author crow
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "calque",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => repeat($.toplevel),
    toplevel: $ => choice($.decl, $.expr),

    let_tok: $ => token('let'),
    decl: $ => seq($.let_tok, $.ident, '=', $.expr),

    expr: $ => seq($.apply, /.*\./),
    apply: $ => prec(1, choice(
      $.factor,
      $.concat,
      seq($.apply, /\ +/, $.factor),
    )),
    concat: $ => prec(2, choice(
      seq($.concat, ',', $.factor),
      $.factor,
    )),
    factor: $ => prec(3, choice($.number, $.ident, $.string)),

    number: $ => /\d+/,
    ident: $ => /\w/,
    string: $ => /\".*\"/,
  }
});
