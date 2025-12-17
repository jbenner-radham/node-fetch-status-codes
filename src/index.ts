import { JSDOM } from 'jsdom';

export type Reference = { name: string; url: string };

export type StatusCode = { value: number; description: string; references: Reference[] };

export type StatusCodeClass = { value: string; name: string; description: string };

async function fetchRegistryDom(): Promise<JSDOM> {
  const url = 'https://www.iana.org/assignments/http-status-codes';
  const response = await fetch(url);
  const html = await response.text();

  return new JSDOM(html);
}

export default async function fetchStatusCodes({ resolveRedirects = true }: {
  resolveRedirects?: boolean;
} = {}): Promise<StatusCode[]> {
  const dom = await fetchRegistryDom();
  const table = dom.window.document.getElementById('table-http-status-codes-1')!;
  const rows = Array.from(table.querySelectorAll<HTMLTableRowElement>('tbody > tr'));
  const getReferenceLink = async (anchor: HTMLAnchorElement): Promise<string> => {
    if (!resolveRedirects) {
      return anchor.href;
    }

    // The IANA links are redirects, but we want direct links with a section hash if applicable.
    const response = await fetch(anchor.href, { method: 'HEAD', redirect: 'manual' });
    const url = new URL(response.status === 301 ? response.headers.get('Location')! : anchor.href);
    const pattern = /RFC\d+(?:, Section )?((?:\d+)?(?:.\d+){0,2})/;
    const [, section] = pattern.exec(anchor.textContent) ?? [];

    if (section) {
      url.hash = `section-${section}`;
    }

    return url.toString();
  };

  return Promise.all(rows.map(row => Array.from(row.querySelectorAll('td')))
    .filter(cells => cells.at(1)!.textContent !== 'Unassigned')
    .map(async cells => ({
      value: Number.parseInt(cells.at(0)!.textContent),
      description: cells.at(1)!.textContent,
      references: await Promise.all(Array.from(cells.at(2)!.querySelectorAll('a'))
        .map(async anchor =>
          ({ name: anchor.textContent!, url: await getReferenceLink(anchor) })
        )
      )
    })));
}

export async function fetchStatusCodeClasses(): Promise<StatusCodeClass[]> {
  const dom = await fetchRegistryDom();
  const note = Array.from(dom.window.document.querySelectorAll('dt'))
    .find(element => element.textContent.trim() === 'Note')
    ?.nextElementSibling!.textContent.trim();
  const pattern = /^(?<value>\dxx): (?<name>[ A-Za-z]+) - (?<description>[ ,A-Za-z]+)$/;

  return note?.split('\n').map(line => {
    const { value = '', name = '', description = '' } = pattern.exec(line)?.groups ?? {};

    return { value, name, description };
  }) ?? [];
}
