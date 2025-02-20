import ReactGA from "react-ga4";

const GA_ID = "G-WQ66DDC8BX";

export const initGA = () => {
  ReactGA.initialize(GA_ID);
};

export const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
