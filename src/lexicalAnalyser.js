const { OPTIONS } = require('./const');

module.exports = function (expression) {
  switch (expression) {
    case ' ':
      return lexicalStructorGenerator(OPTIONS.LOOKUP_POSTERITY);
    case '>':
      return lexicalStructorGenerator(OPTIONS.LOOKUP_POSTERITY);
    case '~':
      return lexicalStructorGenerator(OPTIONS.LOOKUP_BEFORE);
    case '+':
      return lexicalStructorGenerator(OPTIONS.LOOKUP_AFTER);
  }

  if (expression === '*') {
    return lexicalStructorGenerator(OPTIONS.MATCH_ELEMENT, expression)
  }

  if (/^\w+$/.test(expression)) {
    return lexicalStructorGenerator(OPTIONS.MATCH_ELEMENT, expression);
  } else {
    let m;
    if (m = /^#(\w+)$/.exec(expression)) {
      return lexicalStructorGenerator(OPTIONS.MATCH_ID, m[1]);
    } else if (m = /^\.(\w+)$/.exec(expression)) {
      return lexicalStructorGenerator(OPTIONS.MATCH_CLASS, m[1]);
    } else {
      console.error('none match');
    }
  }
}

function lexicalStructorGenerator(type, value, key) {
  const node = { type };

  if (value) {
    node.value = value;
    if (key) {
      node.key = key;
    } else {
      return node;
    }
  } else {
    return node;
  }
}