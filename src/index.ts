import { JSDOM } from 'jsdom';

// JSDOM.defaultDocumentFeatures = { QuerySelector: true };

export type Reference = { title: string; link: string };

export type StatusCode = { value: number; description: string; references: Reference[] };

export default async function fetchStatusCodes(): Promise<StatusCode[]> {
  const url = 'https://www.iana.org/assignments/http-status-codes';
  const response = await fetch(url);
  const html = await response.text();
  const dom = new JSDOM(html);
  const table = dom.window.document.getElementById('table-http-status-codes-1')!;
  const rows = Array.from(table.querySelectorAll('tbody > tr'));
  const getReferenceLink = (anchor: HTMLAnchorElement): string => {
    if (!anchor.textContent.startsWith('RFC')) {
      return anchor.href;
    }

    // The IANA links are redirects, but we want direct links with the section if present.
    const url = new URL('https://www.rfc-editor.org/rfc/');
    const pattern = /RFC(\d+)(?:, Section )?((\d+)?(.?\d+?)?(.?\d+)?)/;
    const [, rfc, section] = pattern.exec(anchor.textContent) ?? [];

    url.pathname += `rfc${rfc}.html`;

    if (section) {
      url.hash = `section-${section}`;
    }

    return url.toString();
  };

  return rows.map(row => Array.from(row.querySelectorAll('td')))
    .filter(cells => cells.at(1)!.textContent !== 'Unassigned')
    .map(cells => ({
      value: Number.parseInt(cells.at(0)!.textContent),
      description: cells.at(1)!.textContent,
      references: Array.from(cells.at(2)!.querySelectorAll('a'))
        .map(anchor => ({ title: anchor.textContent!, link: getReferenceLink(anchor) }))
    }));
}

// console.dir(await fetchStatusCodes(), { depth: null });
