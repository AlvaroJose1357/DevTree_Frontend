export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function isValidURL(urlString: string) {
  try {
    new URL(urlString);
    return true;
  } catch (error) {
    console.error("Invalid URL:", error);
    return false;
  }
}
