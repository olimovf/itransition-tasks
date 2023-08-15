import { fakerPL, fakerRU, fakerTR } from "@faker-js/faker";

export const MAX_RANDOM_VALUE = 1e6;
export const alphabet = {
  ru: "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя",
  pl: "AaĄąBbCćDdEęĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż",
  tr: "AaBbCcÇçDdEeFfGgĞğHhIıİiJjKkLlMmNnOoÖöPpQqRrSsŞşTtUuÜüVvWwXxYyZz",
};

export const faker = {
  ru: fakerRU,
  pl: fakerPL,
  tr: fakerTR,
};
