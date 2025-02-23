// Check if Web NFC is supported
export const isNFCSupported = () => {
    return typeof window !== 'undefined' && 'NDEFReader' in window;
  };
  
  interface NFCData {
    balance: number;
    lastUpdated: string;
    id: string;
  }
  
  // Read NFC tag data
  export const readNFCTag = async (): Promise<NFCData> => {
    if (!isNFCSupported()) {
      throw new Error('NFC is not supported on this device');
    }
  
    try {
      const ndef = new (window as any).NDEFReader();
      
      console.log('Scanning for NFC tags...');
      await ndef.scan();
  
      return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('NFC read timeout - Please try again'));
        }, 5000); // 5 second timeout
  
        ndef.addEventListener("reading", ({ message }: any) => {
          clearTimeout(timeoutId);
          try {
            // Process the first record
            const record = message.records[0];
            if (!record) {
              throw new Error('No data found on NFC tag');
            }
  
            const textDecoder = new TextDecoder();
            const decodedData = textDecoder.decode(record.data);
            
            console.log('Raw NFC data:', decodedData);
            
            const data = JSON.parse(decodedData);
            
            // Validate the data structure
            if (!data || typeof data.balance !== 'number') {
              throw new Error('Invalid data format on NFC tag');
            }
  
            resolve(data as NFCData);
          } catch (error) {
            reject(new Error(`Error processing NFC data: ${error.message}`));
          }
        }, { once: true });
  
        ndef.addEventListener("error", (error: any) => {
          clearTimeout(timeoutId);
          reject(new Error(`NFC read error: ${error.message}`));
        });
      });
    } catch (error) {
      throw new Error(`Error reading NFC tag: ${error.message}`);
    }
  };
  
  // Write data to NFC tag
  export const writeNFCTag = async (data: NFCData): Promise<void> => {
    if (!isNFCSupported()) {
      throw new Error('NFC is not supported on this device');
    }
  
    try {
      const ndef = new (window as any).NDEFReader();
      
      console.log('Writing to NFC tag:', data);
      
      // Validate data before writing
      if (typeof data.balance !== 'number' || !data.lastUpdated || !data.id) {
        throw new Error('Invalid data format');
      }
  
      const jsonString = JSON.stringify(data);
      
      await ndef.write({
        records: [{
          recordType: "text",
          data: jsonString
        }]
      });
  
      console.log('Successfully wrote to NFC tag');
    } catch (error) {
      throw new Error(`Error writing to NFC tag: ${error.message}`);
    }
  };