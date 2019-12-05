interface IDiagnosticSchemaMap {
  [k: string]: any;
}

const diagnosticSchemaMap: IDiagnosticSchemaMap = {};

export function addDiagnostics(uri: string, schema: any, monaco: any): void {
  diagnosticSchemaMap[uri] = schema;
  const diagnosticOptions = {
    enableSchemaRequest: true,
    schemas: Object.entries(diagnosticSchemaMap).map(([u, s]: [string, any]) => {
      return {
        fileMatch: [u],
        schema: s,
        uri: u,
      };
    }),
    validate: true,
  };
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions(diagnosticOptions);
}
