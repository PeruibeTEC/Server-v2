interface TemplateVariables {
  [key: string]: string | number;
}

export default interface ParseMailTemplateDTO {
  file: string;
  variables: TemplateVariables;
}
