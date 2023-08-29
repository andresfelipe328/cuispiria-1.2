"use server";

import { revalidatePath } from "next/cache";

const refreshPage = () => {
  revalidatePath("/meal-planning");
};

export { refreshPage };
