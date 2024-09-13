import { createI18n } from "vue-i18n";
import zhCn from "./zh-cn";
import zhTw from "./zh-tw";
import { getDefaultLanguage } from "../utils/util";
// element plus 自带国际化
import zhcnLocale from "element-plus/es/locale/lang/zh-cn";
import zhtwLocale from "element-plus/es/locale/lang/zh-tw";

const defaultLocale = getDefaultLanguage();

// 实例化I18n
const i18n = createI18n({
  locale: defaultLocale, // 初始化配置语言
  legacy: false,
  messages: {
    "zh-CN": { ...zhCn, ...zhcnLocale },
    "zh-TW": { ...zhTw, ...zhtwLocale },
    zh: { ...zhTw, ...zhtwLocale },
  },
});

export default i18n;
