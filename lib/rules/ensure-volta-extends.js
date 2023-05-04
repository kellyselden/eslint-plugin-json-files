'use strict';

const path = require('path');
const fs = require('fs');

module.exports = {
  meta: {
    docs: {
      description: 'ensure volta/extends in package.json'
    },
    schema: [
    ]
  },

  create(context) {
    let filename = context.getFilename();
    if (path.basename(filename) !== 'package.json') {
      return {};
    }

    return {
      AssignmentExpression(node) {
        let json = node.right;
        let property = json.properties.find(p => p.key.value === 'volta');
        if (!property) {
          return;
        }
        let repository = property.value;
        if (repository.type !== 'ObjectExpression') {
          return;
        }
        property = repository.properties.find(p => p.key.value === 'extends');
        if (!property) {
          return;
        }
        let _extends = property.value;
        if (_extends.type !== 'Literal') {
          return;
        }
        let value = _extends.value;
        let dirname = path.dirname(filename);
        let filePath = path.resolve(dirname, value);

        let text;

        try {
          text = fs.readFileSync(filePath);
        } catch (err) {
          if (err.code === 'ENOENT') {
            context.report({
              node: _extends,
              message: `volta/extends '${value}' does not exist.`
            });

            return;
          }

          throw err;
        }

        json;

        try {
          json = JSON.parse(text);
        } catch (err) {
          if (err.message === 'Unexpected end of JSON input') {
            context.report({
              node: _extends,
              message: `volta/extends '${value}' is not JSON.`
            });

            return;
          }

          throw err;
        }

        if (!('volta' in json)) {
          context.report({
            node: _extends,
            message: `volta/extends '${value}' does not have a volta config.`
          });
        }
      }
    };
  }
};
