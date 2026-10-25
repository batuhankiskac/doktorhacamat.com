import { describe, expect, it } from "vitest";
import { isActivePath } from "@/data/navigation";

describe("isActivePath", () => {
  it("ana sayfayı yalnızca tam eşleşmede etkin sayar", () => {
    expect(isActivePath("/", "/")).toBe(true);
    expect(isActivePath("/faydalar", "/")).toBe(false);
  });

  it("bölüm sayfasını ve alt sayfalarını etkin sayar", () => {
    expect(isActivePath("/faydalar", "/faydalar")).toBe(true);
    expect(isActivePath("/faydalar/detoks", "/faydalar")).toBe(true);
    expect(isActivePath("/faydalar/a/b", "/faydalar")).toBe(true);
  });

  it("benzer önekli yolları eşleştirmez", () => {
    expect(isActivePath("/faydalarx", "/faydalar")).toBe(false);
    expect(isActivePath("/makaleler", "/faydalar")).toBe(false);
  });
});
