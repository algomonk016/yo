const fs = require('fs');

// Function to extract MongoDB IDs from the log file and check for repeated IDs
function extractAndCheckIds(filePath) {
  // Read the content of the log file
  const data = fs.readFileSync(filePath, 'utf8');
  
  // Split the data into lines
  const lines = data.split('\n');
  
  // Initialize an array to hold the IDs and an object to count occurrences
  const ids = [];
  const idCounts = {};
  
  // Regular expression to match MongoDB ID pattern
  const idRegex = /\b[0-9a-fA-F]{24}\b/;
  
  // Iterate over each line to find and extract the IDs
  for (const line of lines) {
    const match = line.match(idRegex);
    if (match) {
      const id = match[0];
      ids.push(id);
      idCounts[id] = (idCounts[id] || 0) + 1;
    }
  }
  
  // Extract repeated IDs
  const repeatedIds = Object.keys(idCounts).filter(id => idCounts[id] > 1);
  
  return { ids, repeatedIds, idCounts };
}

// Specify the path to the log file
const logFilePath = 'logs.txt';

// Call the function and get the array of IDs and repeated IDs
const { ids, repeatedIds, idCounts } = extractAndCheckIds(logFilePath);

// Log the array of IDs
console.log('All IDs:', Object.keys(idCounts).length);

// Log the array of repeated IDs
if (repeatedIds.length > 0) {
  console.log('Repeated IDs:', repeatedIds.length);
} else {
  console.log('No repeated IDs found.');
}
