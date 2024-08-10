import { z } from "zod";

const schema = z.object({
  pushToken: z.string().optional(),
});
export type Schema = z.infer<typeof schema>;

export const defaults: Schema = {
  pushToken: "",
};

export function tryParse(rawData: string): Schema | undefined {
  let objData;
  try {
    objData = JSON.parse(rawData);
  } catch (e) {
    console.error(e);
  }
  if (!objData) {
    return undefined;
  }
  const parsed = schema.safeParse(objData);
  if (parsed.success) {
    return objData;
  } else {
    const errors =
      parsed.error?.errors?.map((e) => ({
        code: e.code,
        // @ts-ignore exists on some types
        expected: e?.expected,
        path: e.path?.join("."),
      })) || [];
    console.error(errors);
    return undefined;
  }
}

export function tryStringify(value: Schema): string | undefined {
  try {
    schema.parse(value);
    return JSON.stringify(value);
  } catch (e) {
    return undefined;
  }
}
