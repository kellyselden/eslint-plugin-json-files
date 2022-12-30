'use strict';

const Ajv = require('ajv');
const { default: betterAjvErrors } = require('better-ajv-errors');

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
          },
          'prettyErrors': {
            'type': 'boolean',
            'default': true
          }
        },
        'additionalProperties': false
      }
    ]
  },

  create(context) {
    let options = context.options[0];

    let sourceCode = context.getSourceCode();

    let ajv = new Ajv();

    let schema = JSON.parse(options.schema);

    return {
      AssignmentExpression(node) {
        let packageJsonNode = node.right;
        let packageJsonText = sourceCode.text.substring(...packageJsonNode.range);

        // Calling `validate()` mutates the `validate` function/object,
        // so we have to make a new instance every time.
        let validate = ajv.compile(schema);

        let packageJson = JSON.parse(packageJsonText);
        let isValid = validate(packageJson);

        if (!isValid) {
          let message;

          if (options.prettyErrors) {
            message = betterAjvErrors(schema, packageJson, validate.errors, {
              json: packageJsonText
            });
          } else {
            message = validate.errors
              .map(error => `${error.schemaPath} ${error.message}`)
              .join(', ');
          }

          context.report({
            node: packageJsonNode,
            message
          });
        }
      }
    };
  }
};
