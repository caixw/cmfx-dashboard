// SPDX-License-Identifier: MIT

import {
    NLocale, NDateLocale,
    deDE, dateDeDE,
    enGB, dateEnGB,
    enUS, dateEnUS,
    eo, dateEo,
    esAR, dateEsAR,
    frFR, dateFrFR,
    idID, dateIdID,
    itIT, dateItIT,
    jaJP, dateJaJP,
    koKR, dateKoKR,
    nbNO, dateNbNO,
    nlNL, dateNlNL,
    plPL, datePlPL,
    ptBR, datePtBR,
    ruRU, dateRuRU,
    skSK, dateSkSK,
    thTH, dateThTH,
    ukUA, dateUkUA,
    viVN, dateViVN,
    zhCN, dateZhCN,
    zhTW, dateZhTW,
} from 'naive-ui';

const locales = new Map<string, NaiveLocale>([
    [getCanonicalLocale('de-DE'), {locale: deDE, date: dateDeDE}],
    [getCanonicalLocale('en-GB'), {locale: enGB, date: dateEnGB}],
    [getCanonicalLocale('en-US'), {locale: enUS, date: dateEnUS}],
    [getCanonicalLocale('eo'), {locale: eo, date: dateEo}],
    [getCanonicalLocale('es-AR'), {locale: esAR, date: dateEsAR}],
    [getCanonicalLocale('fr-FR'), {locale: frFR, date: dateFrFR}],
    [getCanonicalLocale('id-ID'), {locale: idID, date: dateIdID}],
    [getCanonicalLocale('it-IT'), {locale: itIT, date: dateItIT}],
    [getCanonicalLocale('ja-JP'), {locale: jaJP, date: dateJaJP}],
    [getCanonicalLocale('ko-KR'), {locale: koKR, date: dateKoKR}],
    [getCanonicalLocale('nb-NO'), {locale: nbNO, date: dateNbNO}],
    [getCanonicalLocale('nl-NL'), {locale: nlNL, date: dateNlNL}],
    [getCanonicalLocale('pl-PL'), {locale: plPL, date: datePlPL}],
    [getCanonicalLocale('pt-BR'), {locale: ptBR, date: datePtBR}],
    [getCanonicalLocale('ru-RU'), {locale: ruRU, date: dateRuRU}],
    [getCanonicalLocale('sk-SK'), {locale: skSK, date: dateSkSK}],
    [getCanonicalLocale('th-TH'), {locale: thTH, date: dateThTH}],
    [getCanonicalLocale('uk-UA'), {locale: ukUA, date: dateUkUA}],
    [getCanonicalLocale('vi-VN'), {locale: viVN, date: dateViVN}],
    [getCanonicalLocale('zh-CN'), {locale: zhCN, date: dateZhCN}],
    [getCanonicalLocale('zh-TW'), {locale: zhTW, date: dateZhTW}],
]);

export interface NaiveLocale {
    locale: NLocale,
    date: NDateLocale,
}

export function getNaiveLocale(id: string): NaiveLocale {
    return locales.get(id) || {locale: zhCN, date: dateZhCN};
}

/**
 * 获取标准的语言 ID
 * @param id 语言 ID
 * @returns 语言 ID
 */
export function getCanonicalLocale(id: string): string {
    return Intl.getCanonicalLocales(id)[0];
}

export const presetLocale = getCanonicalLocale(window.navigator.language ||
        window.navigator.languages && window.navigator.languages[0]);
