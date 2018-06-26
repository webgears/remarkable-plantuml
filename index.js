const fs = require('fs');
const plantumlEncoder = require('plantuml-encoder');

function uml(md, options) {

  const baseUrl = options.url + options.format + '/';
  
  return function (state) {
    state.tokens.forEach((token) => {
      replacePlantUmlFiles(token, baseUrl, options);
      replacePlantUmlSnippets(token, baseUrl, options);
    });
  }
}

function replacePlantUmlFiles(token, baseUrl, options) {
  if (token.type === 'inline' && token.content) {

    let match = null;
    do {
      match = token.content.match(/\!\[.*\]\((.*\.puml)\)/)
      if (match) {
        const file = options.base_path + match[1];
        const content = fs.readFileSync(file, { encoding: 'utf8' });
        const encoded = plantumlEncoder.encode(content);

        token.content = token.content.replace(match[1], baseUrl + encoded);
      }
    } while (match)
  }
}

function replacePlantUmlSnippets(token, baseUrl, options) {
  if (token.type === 'fence' && token.params === options.inline_type) {
    let encoded = plantumlEncoder.encode(token.content);

    token.type = 'inline';
    token.content = `![](${baseUrl + encoded})`;
    token.children = [];
  }
}

module.exports = function plantuml(md, options = {}) {
  options.url = options.url || 'http://www.plantuml.com/plantuml/';
  options.format = options.format || 'png';
  options.base_path = options.base_path || '';
  options.inline_type = options.inline_type || 'uml';

  md.core.ruler.after('block', 'uml', uml(md, options));
};
