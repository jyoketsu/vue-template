import { useDark } from "@vueuse/core";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export function useTechStack() {
  const { t } = useI18n();
  const isDark = useDark();

  const frontendTechStackList = ref([
    {
      title: "Vue",
      icon: "/logo.svg",
      describtion: t("dashboard.vueDesc"),
      link: "https://vuejs.org/",
    },
    {
      title: "TypeScript",
      icon: "/icons/typescript.svg",
      describtion: t("dashboard.tsDesc"),
      link: "https://www.typescriptlang.org/",
    },
    {
      title: "Vite",
      icon: "/icons/vite.svg",
      describtion: t("dashboard.viteDesc"),
      link: "https://vitejs.dev/",
    },
    {
      title: "Pinia",
      icon: "/icons/pinia.svg",
      describtion: t("dashboard.piniaDesc"),
      link: "https://pinia.vuejs.org/",
    },
    {
      title: "Element Plus",
      icon: "/icons/element.png",
      describtion: t("dashboard.elementDesc"),
      link: "https://element-plus.org/",
    },
    {
      title: "Tailwindcss",
      icon: "/icons/tailwind.svg",
      describtion: t("dashboard.tailwindDesc"),
      link: "https://tailwindcss.com/",
    },
    {
      title: "Lucide",
      icon: isDark.value ? "/icons/logo.dark.svg" : "/icons/logo.light.svg",
      describtion: t("dashboard.lucideDesc"),
      link: "https://lucide.dev/",
    },
    {
      title: "Vue I18n",
      icon: "/icons/vue-i18n-logo.png",
      describtion: t("dashboard.i18nDesc"),
      link: "https://kazupon.github.io/vue-i18n/",
    },
    {
      title: "Docker",
      icon: "/icons/docker.svg",
      describtion: t("dashboard.dockerDesc"),
      link: "https://www.docker.com/",
    },
  ]);

  const backendTechStackList = ref([
    {
      title: "Java",
      icon: "/icons/java.svg",
      describtion: t("dashboard.javaDesc"),
      link: "https://www.java.com/zh-CN/",
    },
    {
      title: "Spring Boot",
      icon: "/icons/spring.svg",
      describtion: t("dashboard.springDesc"),
      link: "https://spring.io/",
    },
    {
      title: "MySQL",
      icon: "/icons/mysql.svg",
      describtion: t("dashboard.mysqlDesc"),
      link: "https://www.mysql.com/",
    },
    {
      title: "Redis",
      icon: "/icons/redis.svg",
      describtion: t("dashboard.redisDesc"),
      link: "https://redis.io/",
    },
    {
      title: "Spring Security",
      icon: "/icons/spring.svg",
      describtion: t("dashboard.springSecurityDesc"),
      link: "https://spring.io/projects/spring-security",
    },
    {
      title: "JWT (JSON Web Token)",
      icon: "/icons/jwt.svg",
      describtion: t("dashboard.jwtDesc"),
      link: "https://jwt.io/",
    },
    {
      title: "Maven",
      icon: "/icons/maven.ico",
      describtion: t("dashboard.mavenDesc"),
      link: "https://maven.apache.org/",
    },
    {
      title: "Swagger",
      icon: "/icons/swagger.png",
      describtion: t("dashboard.swaggerDesc"),
      link: "https://swagger.io/",
    },
  ]);

  return { frontendTechStackList, backendTechStackList };
}
