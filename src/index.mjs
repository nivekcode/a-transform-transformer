// TODO: provide number transformation

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
} from "ng-morph";

export function transform(booleanAttributes) {
  setActiveProject(createProject(new NgMorphTree(), "/", ["**/*.ts"]));

  const DECORATOR_ARGUMENT = "transform: booleanAttribute";

  const classes = getClasses("**/*.ts");

  classes.forEach((c) => {
    const props = getProperties(c);
    props.forEach((p) => {
      const propType = p.getType();
      const decorator = getDecorators(p)[0];
      const decoratorName = decorator?.getName();

      if (
        propType.getText() === "boolean" &&
        decoratorName === "Input" &&
        !includesTransform(decorator)
      ) {
        const enrichedDecorators = enrichDecorator(decorator);
        if (decorator.getArguments().length !== 0) {
          decorator.removeArgument(0);
        }
        decorator.addArgument(enrichedDecorators);

        const angularCoreImports = getImports(p.getSourceFile().getFilePath(), {
          moduleSpecifier: "@angular/core",
        })[0];

        const match = angularCoreImports.getText().match("\\{([^}]+)\\}")[1];
        const namedImports = match.split(",").map((s) => s.trim());

        if (!namedImports.includes("booleanAttribute")) {
          editImports(angularCoreImports, () => ({
            namedImports: [...namedImports, "booleanAttribute"],
          }));
        }
      }
    });
  });

  function includesTransform(decorator) {
    return decorator?.getArguments()[0]?.getText()?.includes("transform:");
  }

  function enrichDecorator(decorator) {
    const decoratorArguments = decorator.getArguments();
    if (decoratorArguments.length === 0) {
      return `{${DECORATOR_ARGUMENT}}`;
    }
    return decoratorArguments[0]
      ?.getText()
      ?.replace("}", `, ${DECORATOR_ARGUMENT}}`);
  }

  saveActiveProject();
}
