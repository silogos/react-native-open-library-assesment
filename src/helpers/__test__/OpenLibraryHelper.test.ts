import { Work } from '../../interfaces/OpenLibraryInterface';
import { getCoverBook } from '../OpenLibraryHelper'; // Replace with the actual path to your utility file

describe('getCoverBook', () => {
  it('should generate the correct cover URL for a work with cover_id', () => {
    const mockWork: Work = {
      key: '123',
      title: 'Sample Title',
      authors: [],
      edition_count: 1,
      first_publish_year: 2021,
      cover_id: 12312,
      cover_edition_key: '',
      subject: [],
      ia_collection: [],
      lendinglibrary: false,
      printdisabled: false,
      lending_edition: '',
      lending_identifier: '',
      ia: '',
      public_scan: false,
      has_fulltext: false,
      availability: {
        status: '',
        available_to_browse: false,
        available_to_borrow: false,
        available_to_waitlist: false,
        is_printdisabled: false,
        is_readable: false,
        is_lendable: false,
        is_previewable: false,
        identifier: '',
        openlibrary_work: '',
        openlibrary_edition: '',
        is_restricted: false,
        is_browseable: false,
        __src__: '',
      },
    };

    const size = 'L';

    const expectedURL = `https://covers.openlibrary.org/b/id/${mockWork.cover_id}-${size}.jpg`;

    const coverURL = getCoverBook(mockWork, size);

    expect(coverURL).toBe(expectedURL);
  });

  it('should generate a default cover URL for a work without cover_id', () => {
    const mockWork: Work = {
      key: '123',
      title: 'Sample Title',
      authors: [],
      edition_count: 1,
      first_publish_year: 2021,
      cover_id: undefined,
      cover_edition_key: '',
      subject: [],
      ia_collection: [],
      lendinglibrary: false,
      printdisabled: false,
      lending_edition: '',
      lending_identifier: '',
      ia: '',
      public_scan: false,
      has_fulltext: false,
      availability: {
        status: '',
        available_to_browse: false,
        available_to_borrow: false,
        available_to_waitlist: false,
        is_printdisabled: false,
        is_readable: false,
        is_lendable: false,
        is_previewable: false,
        identifier: '',
        openlibrary_work: '',
        openlibrary_edition: '',
        is_restricted: false,
        is_browseable: false,
        __src__: '',
      },
    };

    const size = 'L'; // Replace with the desired size

    const defaultURL =
      'data:image/png;base64,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';

    const coverURL = getCoverBook(mockWork, size);

    expect(coverURL).toBe(defaultURL);
  });
});
