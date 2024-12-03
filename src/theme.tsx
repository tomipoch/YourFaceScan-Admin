type Theme = {
  background: string;
  background2: string;
  text: string;
  textSecondary: string;
  border: string;
  hoverBackground: string;
  hoverText: string;
};

const lightTheme: Theme = {
  background: "bg-gray-50",
  background2: "bg-white",
  text: "text-gray-800",
  textSecondary: "text-gray-900",
  border: "border-gray-200",
  hoverBackground: "hover:bg-gray-100",
  hoverText: "hover:text-blue-500",
};

const darkTheme: Theme = {
  background: "bg-gray-800",
  background2: "bg-gray-900",
  text: "text-gray-100",
  textSecondary: "text-white",
  border: "border-gray-700",
  hoverBackground: "hover:bg-gray-700",
  hoverText: "hover:text-blue-400",
};

export const themes: Record<"light" | "dark", Theme> = {
  light: lightTheme,
  dark: darkTheme,
};
