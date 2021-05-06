'use strict';

const path = require('path');
const Ajv = require('ajv');

module.exports = {
  meta: {
    docs: {
      description: 'require a valid JSON Schema'
    },
    schema: [
      {
        'type': 'object',
        'properties': {
          'schema': {
            'type': 'string'
          }
        },
        'additionalProperties': false
      }
    ]
  },

  create(context) {
    let filename = context.getFilename();
    if (path.basename(filename) !== 'package.json') {
      return {};
    }

    let options = context.options[0];

    let sourceCode = context.getSourceCode();

    let ajv = new Ajv();

    let schema = JSON.parse(options.schema);

    let validate = ajv.compile(schema);

    return {
      AssignmentExpression(node) {
        let packageJsonNode = node.right;
        let packageJsonText = sourceCode.text.substring(...packageJsonNode.range);

        let packageJson = JSON.parse(packageJsonText);
        let isValid = validate(packageJson);

        if (!isValid) {
          context.report({
            node: packageJsonNode,
            message: validate.errors
              .map(error => `${error.schemaPath} ${error.message}`)
              .join(', ')
          });
        }
      }
    };
  }
};
