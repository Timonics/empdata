export const debugFormData = (formData: FormData) => {
  console.log("=== FormData Contents ===");
  for (const pair of formData.entries()) {
    const [key, value] = pair;
    if (value instanceof File) {
      console.log(`${key}: File - ${value.name}, ${value.type}, ${value.size} bytes`);
    } else {
      console.log(`${key}: ${value}`);
    }
  }
  console.log("========================");
};
