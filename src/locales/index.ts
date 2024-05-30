import { createI18n } from "vue-i18n";
import zhCn from "./zh-cn";
import zhTw from "./zh-tw";
import { getDefaultLanguage } from "../utils/util";

const defaultLocale = getDefaultLanguage();

// 实例化I18n
const i18n = createI18n({
  locale: defaultLocale, // 初始化配置语言
  legacy: false,
  messages: {
    "zh-CN": zhCn,
    "zh-TW": zhTw,
    zh: zhTw,
  },
});

export default i18n;
