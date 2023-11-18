import localFont from "next/font/local";
import { Poppins, Montserrat } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const gilroy = localFont({
  src: [
    {
      path: "../../public/fonts/Gilroy-Light.ttf",
      weight: "300",
    },
    {
      path: "../../public/fonts/Gilroy-Regular.ttf",
      weight: "400",
    },
    {
      path: "../../public/fonts/Gilroy-Medium.ttf",
      weight: "500",
    },
    {
      path: "../../public/fonts/Gilroy-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../../public/fonts/Gilroy-Bold.ttf",
      weight: "700",
    },
  ],
  display: "swap",
  variable: "--font-gilroy",
});
