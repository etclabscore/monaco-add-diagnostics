import * as monaco from "monaco-editor";

interface IDiagnosticSchemaMap {
  [k: string]: any;
}

const diagnosticSchemaMap: IDiagnosticSchemaMap = {};

export function addDiagnostics(uri: string, schema: any): void {
  diagnosticSchemaMap[uri] = schema;
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    enableSchemaRequest: true,
    schemas: Object.values(diagnosticSchemaMap).map(([u, s]: [string, any]) => {
      return {
        fileMatch: [u],
        schema: s,
        uri: u,
      };
    }),
    validate: true,
  });
}
