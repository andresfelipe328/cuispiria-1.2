export type Filter = {
  group: string;
  title: string;
};

export type Slot = {
  day: string;
  timeSlot: number;
};

export type Ingredient = {
  ingredientId: string;
  ingredient: string;
};

export type Instruction = {
  instructionId: string;
  instruction: string;
};

export type RecipeOverview = {
  userId: string;
  recipeId: string | number;
  title: string;
  readyInMinutes: number;
  mealType: string[];
  image?: string;
  date?: string;
  timeSlot?: number;
  pricePerServing?: number;
  metaScore?: number;
  healthScore?: number;
  customed: boolean;
};

export type CustomRecipe = {
  _id?: string;
  userId: string;
  recipeId: string | number;
  title: string;
  readyInMinutes: number;
  recipeTypes: string[];
  image?: string;
  date: string;
  timeSlot: number;
  pricePerServing?: number;
  recipeIngredient: Ingredient[];
  recipeInstruction: Instruction[];
  customed: boolean;
};

export type FormValues = {
  title: string;
  readyInMinutes: string;
  recipeTypes: string;
  recipeIngredient: Ingredient[];
  recipeInstruction: Instruction[];
};
