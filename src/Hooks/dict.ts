import { getDictTypesByType } from "@/api/biz/dictionary";
import { ref, toRefs } from "vue";

/**
 * 获取字典数据
 */
export function useDict(...args: any): any {
  const res = ref({});
  return (() => {
    args.forEach(async (dictType: string) => {
      // @ts-ignore
      res.value[dictType] = [];
      const result: any = await getDictTypesByType(dictType);
      if (result.code === 200) {
        // @ts-ignore
        res.value[dictType] = result.data.map((p: any) => ({
          label: p.name,
          value: p.id,
        }));
      }
    });
    return toRefs(res.value);
  })();
}
