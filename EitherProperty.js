/* eslint-disable func-names */

/**
 * Allen Joslin
 * June 5th, 2020
 *
 * Usage Example:
 *

import { EitherOptional, EitherRequired } from 'react-either-property';

EmptyListCard.propTypes = {
  what: PropTypes.string,
  whatPlural: PropTypes.string,
  notBoth: EitherOptional('what', 'whatPlural'),
};

 */

function EitherOptional(a, b) {
  return function (p) {
    return Object.prototype.hasOwnProperty.call(p, a) &&
      Object.prototype.hasOwnProperty.call(p, b)
      ? new Error(`Either '${a}' or '${b}' may be specified in props, not both`)
      : null;
  };
};

function EitherRequired(a, b) {
  return function (p) {
    return (Object.prototype.hasOwnProperty.call(p, a) &&
      Object.prototype.hasOwnProperty.call(p, b)) ||
      (!Object.prototype.hasOwnProperty.call(p, a) &&
        !Object.prototype.hasOwnProperty.call(p, b))
      ? new Error(
        `Either '${a}' or '${b}' must be specified in props, and not both`,
      )
      : null;
  };
};

function EitherTest() {
  const none = {};
  const one = { a: 20 };
  const both = { a: 10, b: 20 };
  function runTest(fn, opts, test, fail) {
    const first = fail ? 'pass' : 'fail';
    const second = fail ? 'fail' : 'pass';
    const desc = fail ? 'Error' : 'Suceed';
    const errored = fn('a', 'b')(opts) instanceof Error;
    console.log(`expect ${test} to ${desc}: ${errored ? first : second}`);
  };
  const YES_ERROR = true;
  const NO_ERROR = false;
  const expctError = (fn, opts, desc) => runTest(fn, opts, desc, YES_ERROR);
  const expctNoError = (fn, opts, desc) => runTest(fn, opts, desc, NO_ERROR);
  expctError(this.optional, both, 'optional(both)');
  expctNoError(this.optional, one, 'optional(one)');
  expctNoError(this.optional, none, 'optional(none)');
  expctError(this.required, both, 'required(both)');
  expctNoError(this.required, one, 'required(one)');
  expctError(this.required, none, 'required(none)');
};

module.exports = {
  EitherOptional,
  EitherRequired,
  EitherTest,
}
