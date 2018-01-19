// @flow

import { DOMFile, extractBase64Data, type FileReaderType } from './provider';

describe('dom-file', () => {
  function createFileReaderStub(
    params?: {|
      throwError?: boolean,
    |} = { throwError: false }
  ) {
    let lastInstance: ?FileReaderType = null;

    function createFileReader(): FileReaderType {
      lastInstance = {
        result: ('': string | ArrayBuffer),
        readAsText: jest.fn().mockImplementation(function(blob: Blob) {
          this._assertBlobConstant(blob);
          this._returnValue(createFileReader.DATA_TEXT);
        }),
        readAsDataURL: jest.fn().mockImplementation(function(blob: Blob) {
          this._assertBlobConstant(blob);
          this._returnValue(createFileReader.DATA_URL);
        }),
        _returnValue(result) {
          if (!params.throwError) {
            this.result = result;
            this.onload({ target: (this: FileReaderType) });
          } else {
            this.onerror({ target: (this: FileReaderType) });
          }
        },
        _assertBlobConstant(blob: *) {
          if (blob !== createFileReader.BLOB) {
            throw new Error('NotImplemented');
          }
        },
      };
      return lastInstance;
    }
    createFileReader.getLastInstance = function(): FileReaderType {
      if (lastInstance) {
        return lastInstance;
      }
      throw new Error('createFileReader() was never called');
    };
    createFileReader.MIMETYPE = 'image/svg+xml';
    createFileReader.DATA = Object.freeze({ hello: 'world' });
    createFileReader.DATA_TEXT = JSON.stringify(createFileReader.DATA, null, 2);
    createFileReader.DATA_BASE64 = btoa(createFileReader.DATA_TEXT);
    createFileReader.DATA_URL = `data:${createFileReader.MIMETYPE};base64,${
      createFileReader.DATA_BASE64
    }`;
    createFileReader.BLOB = new Blob([createFileReader.DATA_TEXT], {
      type: createFileReader.MIMETYPE,
    });
    return createFileReader;
  }

  describe('.extractBase64Data(file)', () => {
    test('should extract base64 data', () => {
      expect(extractBase64Data('imagedata')).toBe('');
    });

    test('should extract small picture', () => {
      const smallString = 'a'.repeat(8);
      expect(extractBase64Data(`data:image/png;base64,${smallString}`)).toBe(
        'aaaaaaaa'
      );
    });

    test('should extract a big picture', () => {
      const largeString = 'a'.repeat(9000000);
      expect(extractBase64Data(`data:image/png;base64,${largeString}`)).toBe(
        largeString
      );
    });
  });

  describe('.readAsDataURL(file)', () => {
    test('should create a new FileReader()', async () => {
      const createFileReader = createFileReaderStub();
      await DOMFile(createFileReader).readAsDataURL(createFileReader.BLOB);

      expect(() => createFileReader.getLastInstance()).not.toThrow();
    });

    test('should call underlying FileReader#readAsDataURL(blob)', async () => {
      const createFileReader = createFileReaderStub();
      await DOMFile(createFileReader).readAsDataURL(createFileReader.BLOB);

      expect(
        createFileReader.getLastInstance().readAsDataURL
      ).toHaveBeenCalledWith(createFileReader.BLOB);
    });

    test('should return a result on load event', async () => {
      const createFileReader = createFileReaderStub();
      const actualData = await DOMFile(createFileReader).readAsDataURL(
        createFileReader.BLOB
      );
      expect(actualData).toBe(createFileReader.DATA_URL);
    });

    test('should reject promise on error event', async () => {
      const createFileReader = createFileReaderStub({ throwError: true });

      await expect(
        DOMFile(createFileReader).readAsDataURL(createFileReader.BLOB)
      ).rejects.toThrow('Error while reading blob');
    });
  });

  describe('.readAsText(file)', () => {
    test('should create a new FileReader()', async () => {
      const createFileReader = createFileReaderStub();
      await DOMFile(createFileReader).readAsText(createFileReader.BLOB);
      expect(() => createFileReader.getLastInstance()).not.toThrow();
    });

    test('should call underlying FileReader#readAsText(blob)', async () => {
      const createFileReader = createFileReaderStub();
      await DOMFile(createFileReader).readAsText(createFileReader.BLOB);
      expect(
        createFileReader.getLastInstance().readAsText
      ).toHaveBeenCalledWith(createFileReader.BLOB);
    });

    test('should return a result on load event', async () => {
      const createFileReader = createFileReaderStub();
      const actualData = await DOMFile(createFileReader).readAsText(
        createFileReader.BLOB
      );
      expect(actualData).toBe(createFileReader.DATA_TEXT);
    });

    test('should reject promise on error event', async () => {
      const createFileReader = createFileReaderStub({ throwError: true });

      await expect(
        DOMFile(createFileReader).readAsText(createFileReader.BLOB)
      ).rejects.toThrow('Error while reading blob');
    });
  });

  describe('.readAsBase64(file)', () => {
    test('should return a result on load event', async () => {
      const createFileReader = createFileReaderStub();
      const actualData = await DOMFile(createFileReader).readAsBase64(
        createFileReader.BLOB
      );
      expect(actualData).toBe(createFileReader.DATA_BASE64);
    });

    test('should reject promise on error event', async () => {
      const createFileReader = createFileReaderStub({ throwError: true });
      await expect(
        DOMFile(createFileReader).readAsBase64(createFileReader.BLOB)
      ).rejects.toThrow('Error while reading blob');
    });
  });
});
