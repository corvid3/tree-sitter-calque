/**
 * @file syntax highlighting tree-sitter for calque
 * @author crow
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "calque",
  extras: ($) => [$.comment, /\s/, $.operators],

  rules: {
    source_file: $ => repeat($.toplevel),
    toplevel: $ => choice($.requires, $.method, $.decl, $.statement),

    requires: $ => seq('requires', $.string),

    method: $ => seq('method', $.ident, repeat1($.method_param), '->', $.statement, 'in'),
    method_param: $ => seq('(', $.ident, alias($.ident, $.type), ')'),
    decl: $ => prec(0, seq('let', $.ident, '=', $.statement, 'in')),

    statement: $ => prec.right(1, choice($.let, $.if, $.expression)),
    let: $ => seq('let', $.ident, '=', $.expression, 'in', $.statement),
    if: $ => seq('if', $.expression, 'then', $.statement, 'else', $.statement),

    expression: $ =>  choice($.tuple, $.application, $.concatenation, $.lambda, $.new,
      $.ident, $.number, $.string),

    lambda: $ => seq('\\', optional(repeat($.ident)), '->', $.statement),

    tuple: $ => seq('{', optional($.statement), '}'),

    application: $ => prec.right(3, choice(
      seq($.expression, alias($.ident, $.function)),
      seq($.expression, $.expression),
    )),

    concatenation: $ => prec.right(4, 
      seq($.expression, ',', $.expression),
    ),

    new_pair: $ => seq($.ident, ':', $.expression),
    new: $ => seq('new', $.ident, '(', repeat($.new_pair), ')'),

    number: ($) => seq(/[+-]?[0-9]+/, token.immediate(optional(/\.[0-9]+/))),
    ident: ($) => /[a-zA-Z][-\w]*/,
    string: ($) => /\".*\"/,

    comment: ($) => token(/#.*/),
    operators: ($) => choice(';', '+', '-', '*', '/', '$'),
  }
});
