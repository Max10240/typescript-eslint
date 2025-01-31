import * as parser from '../../src';
import type { TSESTreeOptions } from '../../src/parser-options';
import { createAndPrepareParseConfig } from '../../tools/test-utils';

console.log(
  'Start of file: parse.moduleResolver.default-program-error.test.ts',
);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('parseAndGenerateServices', () => {
  console.log(
    'Start of describe: parse.moduleResolver.default-program-error.test.ts',
  );

  describe('moduleResolver', () => {
    const { code, config } = createAndPrepareParseConfig();

    const withDefaultProgramConfig: TSESTreeOptions = {
      ...config,
      project: './tsconfig.defaultProgram.json',
      createDefaultProgram: true,
    };

    describe('when file is not in the project and createDefaultProgram=true', () => {
      it('returns error because __PLACEHOLDER__ can not be resolved', () => {
        expect(
          parser
            .parseAndGenerateServices(code, withDefaultProgramConfig)
            .services.program.getSemanticDiagnostics(),
        ).toHaveProperty(
          [0, 'messageText'],
          "Cannot find module '__PLACEHOLDER__' or its corresponding type declarations.",
        );
      });
    });
  });
});
