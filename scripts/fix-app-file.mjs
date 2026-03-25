import fs from 'node:fs'
import path from 'node:path'

const filePath = path.resolve(process.cwd(), 'src/App.jsx')
const source = fs.readFileSync(filePath, 'utf8')
const lines = source.split('\n')

const cleaned = []
let seenNonImport = false
let removed = 0

for (const line of lines) {
  const isImportLine = line.trimStart().startsWith('import ')

  if (isImportLine && seenNonImport) {
    removed += 1
    continue
  }

  if (!isImportLine && line.trim() !== '') {
    seenNonImport = true
  }

  cleaned.push(line)
}

if (removed > 0) {
  fs.writeFileSync(filePath, cleaned.join('\n'))
  console.log(`✅ Removed ${removed} misplaced import line(s) from src/App.jsx`)
} else {
  console.log('✅ src/App.jsx has no misplaced import lines')
}
