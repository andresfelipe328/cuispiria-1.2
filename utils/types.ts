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
  userId?: string;
  id?: number;
  recipeId: string;
  title: string;
  readyInMinutes?: number;
  recipeType?: string[];
  image?: string;
  date?: string;
  timeSlot?: number;
  pricePerServing?: number;
  aggregateLikes?: number;
  healthScore?: number;
  customed?: boolean;
  saved?: boolean;
};

export type CustomRecipe = {
  _id?: string;
  userId: string;
  recipeId: string;
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
  saved: boolean;
};

export type SavedRecipe = {
  userId: string;
  recipeId: string;
  title: string;
  readyInMinutes: number;
  image: string;
  customed?: boolean;
  aggregateLikes: number;
  healthScore: number;
};

export type FormValues = {
  title: string;
  readyInMinutes: string;
  recipeTypes: string;
  recipeIngredient: Ingredient[];
  recipeInstruction: Instruction[];
};
