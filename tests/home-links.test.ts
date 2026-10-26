import { describe, expect, it } from "vitest";
import { resolveContentHref } from "../src/lib/home-links";

describe("resolveContentHref", () => {
  const ids = new Set(["detoks"]);

  it("var olan makale bağlantısını korur", () => {
    expect(resolveContentHref("/faydalar/detoks", "/faydalar", ids)).toBe("/faydalar/detoks");
  });

  it("olmayan makaleyi liste sayfasına düşürür", () => {
    expect(resolveContentHref("/faydalar/silindi", "/faydalar", ids)).toBe("/faydalar");
  });

  it("başka bağlantılara dokunmaz", () => {
    expect(resolveContentHref("/#iletisim", "/faydalar", ids)).toBe("/#iletisim");
    expect(resolveContentHref(undefined, "/faydalar", ids)).toBeUndefined();
  });
});
