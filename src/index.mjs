import {
  createProject,
  editImports,
  getClasses,
  getDecorators,
  getImports,
  getProperties,
  NgMorphTree,
  saveActiveProject,
  setActiveProject,
} from 'ng-morph';

const BOOLEAN_TRANSFORMER = 'booleanAttribute';
const NUMBER_TRANSFORMER = 'numberAttribute';
const BOOLEAN_DECORATOR_ARGUMENT = `transform: ${BOOLEAN_TRANSFORMER}`;
const NUMBER_DECORATOR_ARGUMENT = `transform: ${NUMBER_TRANSFORMER}`;

export function transform(booleanAttributes, numberAttributes) {
  setActiveProject(createProject(new NgMorphTree(), '/', ['**/*.ts']));

  const classes = getClasses('**/*.ts');

  classes.forEach((c) => {
    const props = getProperties(c);
    props.forEach((p) => {
      const propType = p.getType();
      const decorator = getDecorators(p)[0];
      const decoratorName = decorator?.getName();

      const sourceFilePath = p.getSourceFile().getFilePath();

      if (
        booleanAttributes &&
        propType.getText() === 'boolean' &&
        decoratorName === 'Input' &&
        !includesTransform(decorator)
      ) {
        const enrichedDecorators = enrichDecorator(
          decorator,
          BOOLEAN_DECORATOR_ARGUMENT
        );
        updateDecorators(decorator, enrichedDecorators);
        updateImports(sourceFilePath, BOOLEAN_TRANSFORMER);
      }

      if (
        numberAttributes &&
        propType.getText() === 'number' &&
        decoratorName === 'Input' &&
        !includesTransform(decorator)
      ) {
        const enrichedDecorators = enrichDecorator(
          decorator,
          NUMBER_DECORATOR_ARGUMENT
        );
        updateDecorators(decorator, enrichedDecorators);
        updateImports(sourceFilePath, NUMBER_TRANSFORMER);
      }
    });
  });

  function updateDecorators(decorator, enrichedDecorators) {
    if (decorator.getArguments().length !== 0) {
      decorator.removeArgument(0);
    }
    decorator.addArgument(enrichedDecorators);
  }

  function updateImports(sourceFile, namedImportToAdd) {
    const angularCoreImports = getImports(sourceFile, {
      moduleSpecifier: '@angular/core',
    })[0];

    const match = angularCoreImports.getText().match('\\{([^}]+)\\}')[1];
    const namedImports = match.split(',').map((s) => s.trim());

    if (!namedImports.includes(namedImportToAdd)) {
      editImports(angularCoreImports, () => ({
        namedImports: [...namedImports, namedImportToAdd],
      }));
    }
  }

  function includesTransform(decorator) {
    return decorator?.getArguments()[0]?.getText()?.includes('transform:');
  }

  function enrichDecorator(decorator, enrichment) {
    const decoratorArguments = decorator.getArguments();
    if (decoratorArguments.length === 0) {
      return `{${enrichment}}`;
    }
    return decoratorArguments[0]?.getText()?.replace('}', `, ${enrichment}}`);
  }

  saveActiveProject();
}
