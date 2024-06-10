import type { CodegenConfig } from '@graphql-codegen/cli'
import { ClientPresetConfig } from '@graphql-codegen/client-preset'
import { ReactQueryRawPluginConfig } from '@graphql-codegen/typescript-react-query/typings/config'

const config: CodegenConfig = {
  schema: 'http://localhost:3000/graphql',
  documents: ['./src/lib/**/*.(graphql|gql)'],
  ignoreNoDocuments: true,
  generates: {
    './generated-types.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],
      config: {
        withHooks: true,
        withMutationFn: true,
        exposeQueryKeys: true,
        enumsAsTypes: true,
      },
      presetConfig: {
        gqlTagName: 'gql',
      } as ClientPresetConfig,
    },
    // './gql/': {
    //   preset: 'client',
    //   config: {
    //     documentNode: 'string',
    //     enumsAsTypes: true,
    //   },
    // },
  },
}
export default config
