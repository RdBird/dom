// @flow

type ProgressEvent<T> = {
  target: T,
};

export interface FileReaderType {
  onerror?: (error: ProgressEvent<FileReaderType>) => void;
  onload?: (event: ProgressEvent<FileReaderType>) => void;
  readAsDataURL(blob: Blob): void;
  readAsText(blob: Blob): void;
  result: string | ArrayBuffer;
}

export function extractBase64Data(dataURL: string) {
  const commaIndex = dataURL.indexOf(',');
  if (commaIndex !== -1) {
    return dataURL.substring(commaIndex + 1);
  }
  return '';
}

export function DOMFile(
  createFileReader: () => FileReaderType = () => new FileReader()
) {
  function toPromise(filereader: FileReaderType): Promise<*> {
    return new Promise((resolve, reject) => {
      filereader.onload = resolve;
      filereader.onerror = reject;
    }).then(
      e => String(e.target.result),
      e => {
        throw new Error(`Error while reading blob`);
      }
    );
  }

  /**
   * Return an URL encoded content of blob
   *
   * @param  blob - The blob to read
   * @returns      the blob content
   */
  function readAsDataURL(blob: Blob): Promise<string> {
    const reader = createFileReader();
    const returnValue = toPromise(reader);
    reader.readAsDataURL(blob);
    return returnValue;
  }

  /**
   * Return the textual content of a blob
   *
   * @param  blob - The blob to read
   * @returns      the blob content
   */
  function readAsText(blob: Blob): Promise<string> {
    const reader = createFileReader();
    const returnValue = toPromise(reader);
    reader.readAsText(blob);
    return returnValue;
  }

  /**
   * Return the base64 encoded of a blob
   *
   * @param  blob - The blob to read
   * @returns      the blob content
   */
  function readAsBase64(blob: Blob): Promise<string> {
    return readAsDataURL(blob).then(extractBase64Data);
  }

  return {
    readAsBase64,
    readAsDataURL,
    readAsText,
  };
}
