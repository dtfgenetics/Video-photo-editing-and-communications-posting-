export function checkRecipeReferences(recipes, toolById) {
  const errors = [];

  for (const recipe of recipes) {
    const recipeId = recipe?.data?.id ?? recipe?.file ?? 'unknown recipe';
    const steps = recipe?.data?.steps;

    if (!Array.isArray(steps)) {
      errors.push(`Recipe missing steps array: ${recipe?.file ?? recipeId}`);
      continue;
    }

    for (const step of steps) {
      if (!step.tool) {
        errors.push(`Recipe step missing tool id: ${recipe?.file ?? recipeId}`);
        continue;
      }

      if (!toolById.has(step.tool)) {
        errors.push(`Missing tool manifest for recipe step: ${recipeId} -> ${step.tool}`);
      }
    }
  }

  return errors;
}

export function buildRecipePlan(recipe, toolById) {
  const steps = recipe?.data?.steps ?? [];

  return steps.map((step, index) => ({
    index,
    toolId: step.tool,
    settings: step.settings ?? {},
    optional: Boolean(step.optional),
    tool: toolById.get(step.tool) ?? null
  }));
}
