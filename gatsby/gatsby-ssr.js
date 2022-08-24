import { wrapRootElement as wrap } from './wrap-root-element'
import config from "./config";

export const wrapRootElement = wrap

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: config.siteLanguage });
};