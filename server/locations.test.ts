import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

type Store = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
};

describe("localizações das unidades", () => {
  it("mantém somente as quatro unidades ativas no mapa", () => {
    const source = readFileSync(
      resolve(process.cwd(), "client/src/data/locations.json"),
      "utf8",
    );
    const { lojas } = JSON.parse(source) as { lojas: Store[] };

    expect(lojas).toHaveLength(4);
    expect(lojas.map((loja) => loja.id)).toEqual([
      "loja-moreninhas",
      "loja-aero-rancho",
      "loja-julio-castilho",
      "loja-cafezais",
    ]);
    expect(lojas.every((loja) => loja.address && loja.lat && loja.lng)).toBe(true);
    expect(lojas.map((loja) => loja.name).join(" ")).not.toMatch(/Nova Lima|União/);
  });
});
