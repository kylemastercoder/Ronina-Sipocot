import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseAddress(address: string) {

  const addressParts = address.split(", ").map((part) => part.trim());

  // Check if we have at least four parts
  if (addressParts.length < 4) {
    return {
      houseNumber: "",
      region: "",
      province: "",
      municipality: "",
      barangay: "",
    };
  }

  const [barangay, municipality, province, region] = addressParts.slice(-4);
  const houseNumber = addressParts.slice(0, -4).join(" ");

  return {
    houseNumber,
    region,
    province,
    municipality,
    barangay,
  };
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "BDT";
    useCompact?: boolean;
  } = {}
) {
  const { currency = "PHP", useCompact = false } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: useCompact ? "compact" : "standard",
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

export function getInitials(name: string) {
  return name
    .split(" ") // Split the name by spaces
    .map((word) => word[0]) // Take the first letter of each word
    .join("") // Join them to form the initials
    .toUpperCase(); // Convert to uppercase
}

export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}

export const maskEmail = (email: string) => {
  const [localPart, domain] = email.split("@");
  const maskedLocalPart =
    localPart.length > 3
      ? `${"*".repeat(localPart.length - 3)}${localPart.slice(-3)}`
      : localPart;
  return `${maskedLocalPart}@${domain}`;
};
