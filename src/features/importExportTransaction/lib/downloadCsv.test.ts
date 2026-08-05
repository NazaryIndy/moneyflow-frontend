import { describe, expect, it, vi, beforeEach } from 'vitest';

import { downloadCsv } from './downloadCsv';

describe('downloadCsv', () => {
  const createObjectURL = vi.fn(() => 'blob:test-url');
  const revokeObjectURL = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.stubGlobal('URL', {
      createObjectURL,
      revokeObjectURL,
    });
  });

  it('creates a Blob with UTF-8 BOM and CSV content', () => {
    const blobSpy = vi.spyOn(globalThis, 'Blob');

    downloadCsv('id,title\n1,Coffee', 'transactions.csv');

    expect(blobSpy).toHaveBeenCalledWith(['\uFEFF', 'id,title\n1,Coffee'], {
      type: 'text/csv;charset=utf-8',
    });
  });

  it('creates an object URL for the Blob', () => {
    downloadCsv('id,title\n1,Coffee', 'transactions.csv');

    expect(createObjectURL).toHaveBeenCalledOnce();
    expect(createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
  });

  it('creates a download link with the correct URL and filename', () => {
    const appendChildSpy = vi.spyOn(document.body, 'appendChild');
    const removeChildSpy = vi.spyOn(document.body, 'removeChild');

    downloadCsv('id,title\n1,Coffee', 'transactions.csv');

    const link = appendChildSpy.mock.calls[0]?.[0] as HTMLAnchorElement;

    expect(link).toBeInstanceOf(HTMLAnchorElement);
    expect(link.href).toBe('blob:test-url');
    expect(link.download).toBe('transactions.csv');

    expect(appendChildSpy).toHaveBeenCalledWith(link);
    expect(removeChildSpy).toHaveBeenCalledWith(link);
  });

  it('clicks the download link', () => {
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

    downloadCsv('id,title\n1,Coffee', 'transactions.csv');

    expect(clickSpy).toHaveBeenCalledOnce();
  });

  it('revokes the object URL after download', () => {
    downloadCsv('id,title\n1,Coffee', 'transactions.csv');

    expect(revokeObjectURL).toHaveBeenCalledOnce();
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:test-url');
  });

  it('handles an empty CSV', () => {
    downloadCsv('', 'transactions.csv');

    expect(createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:test-url');
  });
});
