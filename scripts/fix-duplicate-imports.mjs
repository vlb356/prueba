import fs from 'node:fs'
import path from 'node:path'

const target = path.resolve(process.cwd(), 'src/App.jsx')

if (!fs.existsSync(target)) {
  console.error('src/App.jsx not found')
  process.exit(1)
}

const content = fs.readFileSync(target, 'utf8')
const lines = content.split('\n')

const importRegex = /^import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]([^'"]+)['"]\s*;?\s*$/
const grouped = new Map()
const nonImportLines = []

for (const line of lines) {
  const match = line.match(importRegex)
  if (!match) {
    nonImportLines.push(line)
    continue
  }

  const names = match[1]
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean)

  const source = match[2]
  if (!grouped.has(source)) grouped.set(source, new Set())
  names.forEach((name) => grouped.get(source).add(name))
}

const mergedImportLines = [...grouped.entries()]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([source, names]) => `import { ${[...names].sort().join(', ')} } from '${source}'`)

const firstNonImportIndex = lines.findIndex((line) => !line.startsWith('import '))
const bodyLines = firstNonImportIndex >= 0 ? lines.slice(firstNonImportIndex) : []
const merged = [...mergedImportLines, ...bodyLines].join('\n')

fs.writeFileSync(target, merged)
console.log('✅ Fixed duplicated named imports in src/App.jsx')
