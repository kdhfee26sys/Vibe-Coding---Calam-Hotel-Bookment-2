const fs = require('fs');
const path = require('path');

function removeEmptyDirs(directory) {
  let isDirEmpty = true;
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      const isSubDirEmpty = removeEmptyDirs(fullPath);
      if (isSubDirEmpty) {
        fs.rmdirSync(fullPath);
        console.log(`Removed empty directory: ${fullPath}`);
      } else {
        isDirEmpty = false;
      }
    } else {
      isDirEmpty = false;
    }
  }
  
  return isDirEmpty;
}

removeEmptyDirs(path.join(__dirname, 'src'));
